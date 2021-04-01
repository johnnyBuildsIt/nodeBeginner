import { parse } from 'querystring';
import { createReadStream } from 'fs';

function start(response, postData) {
	console.log('request handler "start" was called');

	const body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<div><input type="submit" value="Submit text" /></div>'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log('request handler "upload" was called');
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('received text: ' + parse(postData).text);
	response.end();
}

function show(response) {
	console.log('request handler "show" was called')
	response.writeHead(200, {'Content-Type': 'image/png'});
	createReadStream('./tmp/test.png').pipe(response);
}

const _start = start;
export { _start as start };
const _upload = upload;
export { _upload as upload };
const _show = show;
export { _show as show };