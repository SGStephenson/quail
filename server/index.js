const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');
const path = require('node:path');

console.log(`Total number of CPUs: ${numCPUs}`);
console.log(`Primary pid = ${process.pid}`);

cluster.setupPrimary({
    exec: path.resolve(__dirname, 'server.js'),
});

for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Starting a new worker");
    cluster.fork();
});
