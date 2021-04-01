import { createServer } from 'http';
import { parse } from 'url';

function start(route, handle) {
	
	function onRequest(request, response) {
	  const pathname = parse(request.url).pathname;
	  console.log('request for ' + pathname + ' received');
	  route(handle, pathname, response, request);
	}

	createServer(onRequest).listen(8888);
	console.log('server started...');
}

const _start = start;
export { _start as start };