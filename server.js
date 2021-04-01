import { createServer } from 'http';
import { parse } from 'url';

function start(route, handle) {
	
	function onRequest(request, response) {
	  let postData = '';
	  const pathname = parse(request.url).pathname;
	  console.log('request for ' + pathname + ' received');

	  request.setEncoding('utf8');

	  request.addListener('data', (postDataChunk) => {
	  	postData += postDataChunk;
	  	console.log('received POST data chunk: ' + postDataChunk);
	  });

	  request.addListener('end', () => {
	  	route(handle, pathname, response, postData);
	  });
	}

	createServer(onRequest).listen(8888);
	console.log('server started...');
}

const _start = start;
export { _start as start };