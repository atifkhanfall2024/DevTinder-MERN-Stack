const mongoose = require('mongoose')

// mongoose.connect return a promise we need to handle it if connection is success or not 

const Dbconnect = async()=>{
  await mongoose.connect('mongodb+srv://muhammadatifkhan:ukjJEVg58zUN3roM@atifnodejs.zjo3x.mongodb.net/DevTinder')
}

module.exports = Dbconnect
// here we handle the connection of database
// we we run it so we see in console that it first listening the requests then make the connection but if the connection is not success then it listening the api but cannot connect with database we need to handle it when the connection is success then listening from the server other wise not 
/* Dbconnect()
.then(()=>{
    console.log('connection is success')
}).catch((err)=>{

    console.log('Error......');
}) */
