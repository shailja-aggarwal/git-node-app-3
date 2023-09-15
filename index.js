const express = require('express');
const {Worker} = require("worker_threads")

const app = express();

app.get('/no-block', (req, res) => {
   res.status(200).send('This is non blocking')
})

app.get('/block', (req, res) => {
    const worker = new Worker("./worker.js");
    worker.on("message", (c) => {
        res.status(200).send(`This is  blocking with result ${c}`)
    })

    worker.on("error", (e) => {
        res.status(404).send(`An error occured ${e}`)
    })
 })

 
app.listen(3000, () => {
    console.log('Server is Listening')
})