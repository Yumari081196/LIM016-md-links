// creamos server http
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(300, { 'Content-Type': 'text/html' });
  res.end('Hello World!');
}).listen(8080);
