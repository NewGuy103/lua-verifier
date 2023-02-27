const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');

const targetUrl = 'https://private-codespace-url.com';

const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  secure: false
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyReq.setHeader('Authorization', 'Bearer your-auth-key-here');
});

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api')) {
    proxy.web(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log(`Proxy server listening on port 3000, forwarding requests to ${targetUrl}`);
});
