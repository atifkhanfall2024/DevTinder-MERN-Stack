// this express module is come from node module

const express = require('express')


const server = express()

// when we run this code and check the route '/' this will work fine but when we check the route '/xyz' this will also give the same code  also if i goes to directly '/contact' route then this will show /contact but after that when we give '/' then it not working because code are checking the url in order order will metter alot  also when we give to url '/contact/hello ' this will also show the contact this problem occur ..... 

server.get('/user/:userid/:name/:passward' , (req ,res)=>{

    // this req.query come from the post man or the url i read the query of url
   // console.log(req.query);

   // for dynamic routing we use 
     console.log(req.params);
    res.send({name:"Muhammad Atif khan" , email:"abc@gmail.com"})
    res.send('Data successfully fetched')
})

server.post('/user' ,async (req,res)=>{
    res.send("Data push to databaseo or to server")
})

server.delete("/user" , (req , res)=>{
    res.send({name:"Muhammad Atif khan"})
})
// this server.use method will use for all http methods
server.use('/contact' , (req , res)=>{
    res.send('this is your contact page')
})

server.listen(5000 , ()=>{
    console.log("Server is Listening...........");
})
