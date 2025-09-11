const fs = require('fs');
const path = require('path');

function getAllFiles(dir, ext = []) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath, ext));
    } else if (!ext.length || ext.some(e => item.endsWith(e))) {
      files.push(fullPath);
    }
  }
  return files;
}

const publicAssets = getAllFiles('public').map(f => f.replace('public/', ''));
const sourceFiles = getAllFiles('src', ['.tsx', '.ts', '.css', '.js']);

const usedAssets = new Set();
const sourceContent = sourceFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

for (const asset of publicAssets) {
  if (sourceContent.includes(asset) || sourceContent.includes('/' + asset)) {
    usedAssets.add(asset);
  }
}

console.log('Unused public assets:');
const unused = publicAssets.filter(a => !usedAssets.has(a));
unused.forEach(asset => console.log(`  public/${asset}`));

console.log(`\nUsed: ${usedAssets.size}, Unused: ${unused.length}`);
