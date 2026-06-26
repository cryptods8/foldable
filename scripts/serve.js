const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3040;
const DIST_PATH = path.join(__dirname, '../dist');

// Middleware for custom headers (Cache-Control)
app.use((req, res, next) => {
  const url = req.url;
  
  // Service Worker and Index.html must NOT be cached to avoid getting stuck with stale versions
  if (url === '/sw.js' || url === '/index.html' || url === '/') {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  } else if (url.includes('/assets/')) {
    // Compiled assets (Vite hashes these, e.g. index-CS82jsD.js) can be cached aggressively
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // Default fallback cache control
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
  next();
});

// Serve static assets from Vite's build directory
app.use(express.static(DIST_PATH, {
  etag: true,
  lastModified: true
}));

// SPA Routing: Redirect any unmatched clean URLs back to index.html
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Foldable Server] Running on http://localhost:${PORT}`);
  console.log(`[Foldable Server] Serving static files from: ${DIST_PATH}`);
});
