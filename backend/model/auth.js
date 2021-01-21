const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rule:{
        type:String,
        default:'user'
    }
})

module.exports = mongoose.model('auth',authSchema);