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

console.log('Starting comprehensive import path migration...');

const sourceFiles = getAllFiles('src');
let totalChanges = 0;

// Migration mappings
const migrations = [
  // UI Components
  { from: '@/components/Container', to: '@ui/Container' },
  { from: '@/components/ImageButton', to: '@ui/ImageButton' },
  { from: '@/components/ThemeToggle', to: '@ui/ThemeToggle' },
  { from: '@/components/Sentinel', to: '@ui/Sentinel' },
  { from: '@/components/ExtensionErrorBoundary', to: '@ui/ExtensionErrorBoundary' },
  { from: '@/components/ExtensionProtection', to: '@ui/ExtensionProtection' },
  
  // Section Components
  { from: '@/components/ProfileHeader', to: '@sections/ProfileHeader' },
  { from: '@/components/Footer', to: '@sections/Footer' },
  { from: '@/components/HeroMotionClient', to: '@sections/HeroMotionClient' },
  { from: '@/components/HeroWrapper', to: '@sections/HeroWrapper' },
  
  // Composite Components
  { from: '@/components/AdvancedTechCarousel', to: '@composite/AdvancedTechCarousel' },
  { from: '@/components/CookieConsent', to: '@composite/CookieConsent' },
  { from: '@/components/EdgePills', to: '@composite/EdgePills' },
  { from: '@/components/ThemeProvider', to: '@composite/ThemeProvider' },
  
  // Feature Components
  { from: '@/components/blog/', to: '@features/blog/' },
  { from: '@/components/habits/', to: '@features/habits/' },
  
  // Relative path mappings for components
  { from: '../Container', to: '../ui/Container' },
  { from: '../ImageButton', to: '../ui/ImageButton' },
  { from: '../ThemeToggle', to: '../ui/ThemeToggle' },
  { from: '../Sentinel', to: '../ui/Sentinel' },
  { from: '../ExtensionErrorBoundary', to: '../ui/ExtensionErrorBoundary' },
  { from: '../ExtensionProtection', to: '../ui/ExtensionProtection' },
  { from: '../ProfileHeader', to: '../sections/ProfileHeader' },
  { from: '../Footer', to: '../sections/Footer' },
  { from: '../HeroMotionClient', to: '../sections/HeroMotionClient' },
  { from: '../HeroWrapper', to: '../sections/HeroWrapper' },
  { from: '../AdvancedTechCarousel', to: '../composite/AdvancedTechCarousel' },
  { from: '../CookieConsent', to: '../composite/CookieConsent' },
  { from: '../EdgePills', to: '../composite/EdgePills' },
  { from: '../ThemeProvider', to: '../composite/ThemeProvider' },
  
  // More relative mappings
  { from: './Container', to: './ui/Container' },
  { from: './ImageButton', to: './ui/ImageButton' },
  { from: './ThemeToggle', to: './ui/ThemeToggle' },
  { from: './Sentinel', to: './ui/Sentinel' },
  { from: './ExtensionErrorBoundary', to: './ui/ExtensionErrorBoundary' },
  { from: './ExtensionProtection', to: './ui/ExtensionProtection' },
  { from: './ProfileHeader', to: './sections/ProfileHeader' },
  { from: './Footer', to: './sections/Footer' },
  { from: './HeroMotionClient', to: './sections/HeroMotionClient' },
  { from: './HeroWrapper', to: './sections/HeroWrapper' },
  { from: './AdvancedTechCarousel', to: './composite/AdvancedTechCarousel' },
  { from: './CookieConsent', to: './composite/CookieConsent' },
  { from: './EdgePills', to: './composite/EdgePills' },
  { from: './ThemeProvider', to: './composite/ThemeProvider' }
];

for (const file of sourceFiles) {
  let content = readFileSync(file, 'utf8');
  let changed = false;
  
  for (const migration of migrations) {
    const regex = new RegExp(`(['"])${migration.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${migration.to}$1`);
      changed = true;
    }
  }
  
  if (changed) {
    writeFileSync(file, content, 'utf8');
    totalChanges++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`Migration complete. Updated ${totalChanges} files.`);
