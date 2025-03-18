const express = require('express')
const Dbconnect =  require('./config/database')
const User = require('./models/Userdata')
const app = express()

// expree.json is used to hanlde or read  json data comes from frontend 
app.use(express.json())

// we we run it so we see in console that it first listening the requests then make the connection but if the connection is not success then it listening the api but cannot connect with database we need to handle it when the connection is success then listening from the server other wise not 

// so i make an request of of post that when the user enter data from frontend then create an instance of user and check it with model then push data to database


// here i write async await why ? this is bcz every model of mongoose return a promise so we need to hanlde it suppose if i donot write async await here and i write age in alphabtes instead of numeric so this is working but if there is any error it always execute try does not go to catch but when we use async await and i enter wrong data in user instance against schema then it will throw an error

/*app.post('/signin' ,async (req , res)=>{


    // here we need to add an instance of new user
   // User is a Mongoose model (likely defined using mongoose.model('User', userSchema)).
  // To create a new document (record) in MongoDB, you must instantiate an object of the model.
// The new keyword tells JavaScript to create a new object based on the User schema. 
    const user = new User({
        firstName:"Muhammad Atif khan ",
        email:"abc@gmail.com",
        age:"100"
    })
    // this will also return a promise 
 try{

    // this save function return a promise so thats why its must to handle with async await
    // the await will wait for it that either it will accept the request or reject
  await  user.save()
    res.send('Data is successfully added to db')
 }
 catch(err){
    res.status(400).send("not connect successfully")
 }
}) */


 // suppose if the request come from user side mean from front end or from post man then what happen ?
 // i sending the data from post man to hitting signup api then its check schema validation and if data in json format is correct then it will goes to DB 

app.post('/signup' , async (req , res)=>{

// we handle the frontend request from req.body but data is in json format this will give un defined 
// undefined: this is because our server cannot read the json data
//console.log(req.body)

   const user = new User(req.body)
   
   try{

    await user.save()
    res.send('Data is Added to Database')
   }
   catch(err){
    console.log(err.message);
    res.status(400).send('Something went wrong'+ err.message)
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

