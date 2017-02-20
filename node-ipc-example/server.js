const http = require('http');
var ipc = require('node-ipc');
var fork = require('child_process').fork;


ipc.config.id = 'demoserver';
ipc.config.silent = true;
ipc.config.retry = 1500;

       
fork('client.js'); 
   
ipc.serve(() =>{
	ipc.server.on('client.started', (messagedata, socket) =>{
		console.log('finished comparing data ...');
		ipc.server.emit(socket, 'operation.start', {                    
			data: 'this can be any json object'
		})
	});
	
	ipc.server.on('operation.done', (data, socket) =>{                
		console.log('finished operation, got result:', data);
		console.log('sending shutdown');
		ipc.server.emit(socket, 'client.shutdown', {});
		ipc.server.stop();			
	});
});
ipc.server.start();    
