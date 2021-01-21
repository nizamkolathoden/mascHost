const router = require('express').Router();
const {adminUser} = require('../middleware/index')
//jwt
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

//bcryptjs for hashing password
const bcrypt = require('bcryptjs')

//auth model
const auth = require('../model/auth')


//@desc login
//@route post /auth/login

router.post("/login", (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) return res.json({ error: "please enter username and password" });
    auth.findOne({ userName: userName }).then(data => {
        if (data) {
            bcrypt.compare(password, data.password).then(doMatch => {
                if (doMatch) {
                    //its a simple jsonweb token if you want know more read jwt docs
                    const token = jwt.sign({_id:data._id},JWT_SECRET)
                    
                    res.json({token:token,rule:data.rule})
                } else {
                    return res.json({ error: "wrong userName or Password" });
                }
            })
                .catch(e => {
                    console.log(e);
                })
        }
        else {
            return res.json({ error: "wrong userName or Password" })
        }
    })
        .catch(e => {
            console.log(e);
        })
})


//@route post /auth/signup 
//@desc its for testing and changing username and password

router.post("/signup",adminUser, (req, res) => {
    const { userName, password,rule } = req.body;
    if (!userName || !password) return res.status(401).json({ error: "you asshole why didn't enter the password and username" });
    bcrypt.hash(password, 9).then(hashedPassword => {
        new auth({
            userName,
            password: hashedPassword,
            rule
        }).save().then(data => res.json(data))
            .catch(e => {
                console.log('error in adding user name and password', e);
            })
    })
        .catch(e => {
            console.log('error in hashing password', e);
        })


})


module.exports = router