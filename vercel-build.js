const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

// Install client dependencies and build
console.log('Building client...');
execSync('cd client && npm install && npm run build', { stdio: 'inherit' });

// Build server
console.log('Building server...');
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy necessary files
fs.copyFileSync('server/index.ts', 'dist/index.js');
fs.copyFileSync('package.json', 'dist/package.json');
fs.copyFileSync('package-lock.json', 'dist/package-lock.json');

console.log('Vercel build completed!');
