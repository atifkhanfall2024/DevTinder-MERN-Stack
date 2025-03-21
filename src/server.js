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

// Now we get the data from database
// this is for getting only one user from data base 
// Difference bw findone() and find method suppose two person with same email and we use find() then this will call the both user and findone() call only one user
 app.get('/getuser' , async (req,res)=>{

    const userid = req.body.email 

   

    try{
    //  const data  = await User.find({email:userid}) //it will call more user with same emailid

      // this will give only one user email if we have multiple only give one 
      const data  = await User.findOne({email:userid})


      // this data will give an empty when email not found 
     // console.log(data)
      if(data.length===0){
       res.status(404).send('User not found')
      } else{
        res.send(data)
      }
   
    }
    catch(err){
      res.status(500).send('Sorry Data not found')
    }

 })


 // getting all users from database 

 app.get('/getAllUsers' , async(req ,res)=>{

     try{

      // find({}) this will use for getting all users from db
      // User=> this user is model of mongoose and this user model represne t collection in our database
      const Allusers = await User.find({})
      if(Allusers.length===0){
        res.status(400).send('No Data found in database')
      }
      else{
        res.send(Allusers)
      }
     }
     catch(err){
      res.status(400).send('Something went wrong')
     }
 })

 // delete api 
 // we notice here that we donot create an instance for delete api because we donot need

 app.delete('/deleteuser' , async(req ,res)=>{
    const name = req.body.firstName
    const userid = req.body.id
  
  const user = await User.findByIdAndDelete(userid)
 // console.log(userid);
try{

    if(!user){
      res.status(400).send('User Not found')
    }
    res.send(`${name} Data Delete successfully`)
  
}
     catch(err){
        res.status(400).send('Something went wrong')
     }
 })


 // now working on update api
// patch is used when we want to update only specific field
 // put is used to update the whole document

 app.patch('/updateuser' , async(req,res)=>{

     const uid = req.body.id
     const data = req.body
       
     try{

      // writing new:flase => it works to return an old document in console but in db it will updated
      // new:true => it will work to retun update document on console as well as db
    const update =   await User.findByIdAndUpdate(uid , data , {new:true})
    console.log(update);

      res.send('Data successfully updated')
     }
     catch(err){
      res.status(400).send('Something went wrong')
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

