// creamos server http
var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(300, {'Content-Type': 'text/html'});
	res.end('Hello World!');
}).listen(8080);