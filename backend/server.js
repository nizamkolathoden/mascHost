const express = require('express');
const app = express();
const cors = require('cors')
const DB = require('./config/DB')
const f = require('../masc-sdb-1.0/build')
//env
const dot = require('dotenv');
dot.config({ path: './config/key.env' })

const Port = process.env.PORT

//start DB
DB()

//use json format in server
app.use(express.json())

//adding routers
app.use(cors())
//for auth
app.use('/auth', require('./routes/auth'));
//for studets
app.use('/student', require('./routes/addStudent'));
//for subjects
app.use('/subject', require('./routes/subjects'));
//for profile
app.use('/profile', require('./routes/profileStudent'));
//for remarks
app.use('/remark', require('./routes/remark'))

if(process.env.NODE_ENV=='Production'){
    app.use(express.static('../masc-sdb-1.0/build'))
    const path = require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//listening the server
app.listen(Port, () => console.log(`\u{1F525}\u{1F680} server running on ${process.env.NODE_ENV} in Port ${Port} \u{1F525}\u{1F680}\u{1F525} `))
