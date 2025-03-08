// Why to use middleware ? 
const express = require('express')

const app = express()

// suppose i have an admin user data and admin delete data  and we need to authorized that is really the this api request is coming from admin 
/*
app.get("/admin/userdata" , (req , res)=>{

    // if i checking the is the admin hitting the api is authorized or not 

    const token  = 'abc123'
    const authorized = token==='abc23'
    if(authorized){
      res.send('You are authorized')
    }
    else{
        res.status(401).send('unauthorized access')
    }

})

app.get('/admin/delete' , (req , res)=>{
    const token  = 'abc123'
    const authorized = token
    if(authorized){
      res.send('You are authorized delete the datra')
    }
    else{
        res.status(401).send('unauthorized access')
    }
})
*/
// so think about it if i have admin update profile and writing the same code for every one is making the code difficut 
// so here the concept of middle ware is come  basically it have a good practice to wwrite app.use for middle ware 
// this middleware will only called when the route will start from /admin  if i write a route /user then  this will not depend on /admin on admin we have depend /admin/userdata and /admin/deletedata  
app.use('/admin' , (req , res , next)=>{
    const token  = 'abc123'
    const authorized = token==='abc123'
    if(authorized){
        console.log('you are auth');
      next()
    }
    else{
        res.status(401).send('unauthorized access')
    }
})
app.get('/admin/userdata' , (req,res)=>{
    res.send("Data fetch successfully from database ")
})
app.get('/admin/deletedata' , (req,res)=>{
    res.send("Data delete successfully from database ")
})

// this user is seprate route bcz this is not start with /admin

app.get('/user' , (req,  res)=>{
    res.send('your user route')
})

app.listen(7777 , ()=>{
    console.log('Listening from the server......');
})