const http = require('http');
const url = require('url');

function start(route, handle) {
	http.createServer((request, response) => {
	  const pathname = url.parse(request.url).pathname;
	  console.log('request for ' + pathname + ' received');

	  route(handle, pathname);

	  response.writeHead(200, {'Content-Type': 'text/plain'});
	  response.write('Hello World');
	  response.end();
	}).listen(8888);

console.log('server started...');
}

exports.start = start;