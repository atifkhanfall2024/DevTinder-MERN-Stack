// this express module is come from node module

const express = require('express')


const server = express()

server.use('/',(req,res)=>{
    res.send("Hello from the server")
})

server.use('/contact' , (req , res)=>{
    res.send('this is your contact page')
})

server.listen(5000 , ()=>{
    console.log("Server is Listening...........");
})
