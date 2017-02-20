var fork = require('child_process').fork;
const http = require('http');
http.createServer((req, res) => {	
	console.log('process ' + process.pid + ' processing request');
    res.writeHead(200);
	let child = fork('client.js',['foo','bar']);
	child.on('message', (msg) => {		
		res.end('child process:' + child.pid + ' responded:' + msg );
	});	
    
}).listen(8000);
	
