import { createReadStream, rename, unlink } from 'fs';
import pkg from 'formidable';
const { IncomingForm, parse } = pkg;

function start(response, request) {
	console.log('request handler "start" was called');

	const body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post" enctype="multipart/form-data">'+
		'<div><input type="file" name="upload" multiple="multiple"></div>'+
		'<div><input type="submit" value="Upload File" /></div>'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(body);
	response.end();
}

function upload(response, request) {
	console.log('request handler "upload" was called');

	const form = new IncomingForm();
	console.log('about to parse');
	form.parse(request, (error, fields, files) => {
		console.log('parsing done');
		console.log('file path: ' + files.upload.path);

		rename(files.upload.path, './tmp/test.png', (error) => {
			if(error) {
				unlink('./tmp/test.png');
				rename(files.upload.path, './tmp/test/png');
			}
		});

		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('received image <br/>: ')
		response.write('<img src="show" />');
		response.end();
	});
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