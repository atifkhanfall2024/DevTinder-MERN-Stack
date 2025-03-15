const express = require('express')
const Dbconnect =  require('./config/database')
const User = require('./models/Userdata')
const app = express()

// we we run it so we see in console that it first listening the requests then make the connection but if the connection is not success then it listening the api but cannot connect with database we need to handle it when the connection is success then listening from the server other wise not 

// so i make an request of of post that when the user enter data from frontend then create an instance of user and check it with model then push data to database

app.post('/signin' , (req , res)=>{

    // here we need to add an instance of new user 
    const user = new User({
        firstName:"Muhammad Atif ",
        email:"abc@gmail.com",
        age:"10"
    })
    // this will also return a promise 
 try{
    user.save()
    res.send('Data is successfully added to db')
 }
 catch(err){
    res.status(400).send("not connect successfully")
 }
})
Dbconnect().then(()=>{
  //  throw console.error('error');
    
    console.log('Connect with database');
    app.listen(5000,()=>{
        console.log('Server is listening........');
    })
}).catch((err)=>{
    console.log('Cannot connect with database');
})

