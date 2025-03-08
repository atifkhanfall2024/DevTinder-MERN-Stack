// this express module is come from node module

const express = require('express')


const server = express()

// when we run this code and check the route '/' this will work fine but when we check the route '/xyz' this will also give the same code  also if i goes to directly '/contact' route then this will not show /contact but after that when we give '/' then it  working because code are checking the url in order order will metter alot  also when we give to url '/contact/hello ' this will also show the contact this problem occur ..... 


// server.get('/user/:userid/:name/:passward' , (req ,res)=>{ => this will used for dynamic routing =>http://localhost:5000/user/777/code/12345 => req.params


    // server.get('/user' , (req ,res)=>{  => this will used for query  => http://localhost:5000/user?uid = 500&name=Atif&pass=1234554321  => req.query 

   /*
server.get('/user' , (req ,res)=>{

    // this req.query come from the post man or the url i read the query of url
   // console.log(req.query);

   // for dynamic routing we use 
   //  console.log(req.params);
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
}) */

    server.get('/user' , (req , res ,next)=>{
   
        // if there is no response then the request is come and check in /user that if there any response to send him back if not present any response then it goes to infinite loop
      //  res.send('Dashboard...')

      // by using next it will move to the second response but suppose if first one is already present and we also use next() then only first response will be execute not the second one  but if the next() come before the res.send() then it will execute the second response not the first one 
      next()
    } , (req ,res)=>{
       // res.send('User dashboard')
        // by using this will throw an error if not any response is present becuase using next will expected the next function but there us no next function will be there 
        next()
    })

server.listen(5000 , ()=>{
    console.log("Server is Listening...........");
})
