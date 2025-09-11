#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory() && item !== 'node_modules' && item !== '.next') {
      files.push(...getAllFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

console.log('Starting import path migration...');

// Phase 1: utils → lib
const sourceFiles = getAllFiles('src');
let totalFiles = 0;
let totalChanges = 0;

for (const file of sourceFiles) {
  let content = readFileSync(file, 'utf8');
  let changed = false;
  
  // Replace import paths from utils to lib
  const patterns = [
    { from: /from ['"]\.\.\/\.\.\/utils\//g, to: 'from "../../lib/' },
    { from: /from ['"]\.\.\/utils\//g, to: 'from "../lib/' },
    { from: /from ['"]\.\/utils\//g, to: 'from "./lib/' },
    { from: /from ['"]utils\//g, to: 'from "lib/' },
    { from: /import.*from ['"]@\/utils\//g, to: match => match.replace('@/utils/', '@/lib/') },
    { from: /from ['"]src\/utils\//g, to: 'from "src/lib/' }
  ];
  
  for (const pattern of patterns) {
    if (pattern.from.test(content)) {
      content = content.replace(pattern.from, pattern.to);
      changed = true;
    }
  }
  
  if (changed) {
    writeFileSync(file, content, 'utf8');
    totalChanges++;
    console.log(`Updated: ${file}`);
  }
  totalFiles++;
}

console.log(`Migration complete. Updated ${totalChanges} files out of ${totalFiles} total files.`);
