// here we need to design the database 

const mongoose  = require('mongoose')

const userschema = new mongoose.Schema({
    firstName:{
      type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    } ,
    passward:{
        type:String
    },
    age:{
        type:Number,
        required:true 
    },
    
})


// now we create model of this schema . model is used to interacting with schema and also we create new instances for user
// so when need to make an api call when the user make or send the data we need to check with schema and add to data base using post

module.exports =  mongoose.model('User' , userschema)