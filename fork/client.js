let firstparam = process.argv[2];
let secondparam = process.argv[3];
let result = firstparam + secondparam;

console.log('doing complex stuff at process id', process.pid, 'got params:', firstparam, secondparam);

for (i = 0; i < 900000000; i++) {
	let z = i*i;
}

if (process.argv[3]) {
	process.send('result:' + result)
}

