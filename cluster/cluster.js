const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {	
	console.log('process ' + process.pid + ' processing request');
    res.writeHead(200);
	for (i = 0; i < 900000000; i++) {
		var z = i*i;
	}
	res.end('hello world\n' + process.pid);		
    
	}).listen(8000);
  console.log(`Worker ${process.pid} started`);
}