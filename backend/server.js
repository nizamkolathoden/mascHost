const express = require('express');
const app = express();
const cors = require('cors')
const DB = require('./config/DB')

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

//listening the server
app.listen(Port, () => console.log(`\u{1F525}\u{1F680} server running on ${process.env.NODE_ENV} in Port ${Port} \u{1F525}\u{1F680}\u{1F525} `))