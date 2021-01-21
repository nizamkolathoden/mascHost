const mongoose = require('mongoose');

const DB = ()=>{
    try{
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},console.log('connected to DB'))
        

    }
    catch(e){
        console.log('error in connection DB',e);
    }
}

module.exports = DB