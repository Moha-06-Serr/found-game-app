#!/usr/bin/env node

const Mocha = require('mocha');
const path = require('path');
const fs = require('fs');

const mocha = new Mocha({
  ui: 'bdd',
  reporter: 'spec',
  timeout: 5000
});

// Recursively find test files
function findTestFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findTestFiles(fullPath));
    } else if (item.endsWith('.test.js')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

// Add test files
const testDir = path.join(__dirname, 'found-game-app', 'tests');
const testFiles = findTestFiles(testDir);

console.log(`Found ${testFiles.length} test files:`);
testFiles.forEach(file => {
  console.log(`  - ${path.relative(__dirname, file)}`);
  mocha.addFile(file);
});

console.log('\nRunning tests...\n');

// Run the tests
mocha.run(failures => {
  process.exitCode = failures ? 1 : 0;
});
