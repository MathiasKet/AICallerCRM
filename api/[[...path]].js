// This file handles all routes for Vercel serverless functions
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');

const app = require('../server');
const port = process.env.PORT || 3000;

// Create HTTP server
const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;
  
  // Handle API routes
  if (pathname.startsWith('/api/')) {
    return app.handle(req, res);
  }
  
  // For all other routes, serve the client
  return handle(req, res, parsedUrl);
});

// Start the server
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

// For Vercel serverless functions
module.exports = (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;
  
  // Handle API routes
  if (pathname.startsWith('/api/')) {
    return app.handle(req, res);
  }
  
  // For all other routes, serve the client
  return handle(req, res, parsedUrl);
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
