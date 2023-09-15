const express = require('express');
const {Worker} = require("worker_threads")

const app = express();
const THREAD_COUNT = 2;

app.get('/no-block', (req, res) => {
   res.status(200).send('This is non blocking')
})

function createWorker(){
    return new Promise((resolve, reject) => {
        const worker = new Worker("./four-workers.js", {
            workerData: {thread_count: THREAD_COUNT}
        })
        worker.on("message", (c) => {
           resolve(data)
        })
    
        worker.on("error", (e) => {
            reject(data)
        })
    })
}

app.get('/block', async (req, res) => {
   const workerPromise = [];
   for(let i=0; i<THREAD_COUNT; i++){
    workerPromise.push(createWorker())
   }
   const thread_result = await Promise.all(workerPromise);
   const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3]
   res.status(404).send(`This is  blocking with result ${c}`)
  
 })



 
app.listen(3000, () => {
    console.log('Server is Listening')
})