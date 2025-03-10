const Admindata = (req ,res , next)=>{


const token  = 'abc123'
const authorized = token==='abc123'
if(authorized){
    console.log('you are auth');
  next()
}
else{
    res.status(401).send('unauthorized access')
}
}

// for user 

const Userdata = (req ,res , next)=>{


    const token  = 'abc123'
    const authorized = token==='abc123'
    if(authorized){
        console.log('you are auth');
      next()
    }
    else{
        res.status(401).send('unauthorized access')
    }
    }

module.exports = {Admindata , Userdata}