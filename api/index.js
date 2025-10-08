// This file acts as the entry point for Vercel serverless functions
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = require('../server/index');
const port = process.env.PORT || 3000;

// Create HTTP server
const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    return app.handle(req, res);
  }

  // Handle Next.js pages
  return handle(req, res, parsedUrl);
});

// Start the server
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

// For Vercel serverless functions
module.exports = (req, res) => {
  return app.handle(req, res);
};
