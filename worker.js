const {parent, parentPort} = require('worker_threads');

let c = 0;
for(let i =0; i<20_000_000_000; i++){
    c++
}

parentPort.postMessage(c) 