function route(handle, pathname, response, request) {
	console.log('routing request for ' + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log('no request handler for ' + pathname);
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write('404 not found :(');
		response.end();
	}
}

const _route = route;
export { _route as route };