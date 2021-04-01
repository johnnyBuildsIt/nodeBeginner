function route(handle, pathname, response, postData) {
	console.log('routing request for ' + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else {
		console.log('no request handler for ' + pathname);
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write('404 not found :(')
	}
}

exports.route = route;