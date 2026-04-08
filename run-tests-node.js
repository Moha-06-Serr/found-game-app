#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

// Get the directory where this script is located
const projectRoot = path.dirname(__filename);

// Run mocha with explicit paths
const mocha = require.resolve('mocha/bin/_mocha');
const testPattern = 'found-game-app/tests/**/*.test.js';

const command = `"${mocha}" "${testPattern}"`;

console.log('Running tests...\n');

exec(command, { cwd: projectRoot, stdio: 'inherit' }, (error, stdout, stderr) => {
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
  
  process.exit(error ? 1 : 0);
});
