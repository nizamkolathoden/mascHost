//require
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

//database
const auth = require("../model/auth")
const Student = require('../model/Student')


//middleware
const user = (req, res, next) => {

    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(422).json({ error: "you didnot get token" })

    }
    //bearer is confussing                                                                     
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (e, payload) => {
        if (e) return res.status(422).json({ error: `invalid:${e}` })
        // get id from jwt payload
        const { _id } = payload;
        auth.findById({ _id: _id }).then(userdata => {
            // send user data from  collection of user to when it call 
            if (userdata) {
                req.user = userdata._id;
                next()

            } else {
                res.json({ error: 'un Authrized User nrmal' });
            }

        })
            .catch(e => {
                console.log(e)
            })

    })
}

const adminUser = (req, res, next) => {

    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(422).json({ error: "you didnot get token" })

    }
    //bearer is confussing                                                                     
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (e, payload) => {
        if (e) return res.status(422).json({ error: `invalid:${e}` })
        // get id from jwt payload
        const { _id } = payload
        auth.findById({ _id: _id }).then(userdata => {
            // send user data from  collection of user to when it call 
            if (userdata.rule === 'admin') {
                req.user = userdata._id;

                next()

            } else {
                res.status(401).json({ error: 'un Authrized User' })
            }

        })
            .catch(e => {
                console.log(e)
            })

    })
}

//this for checking wheter is guy is same guy is posted post
const Posted = (req, res, next) => {

    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(422).json({ error: "you didnot get token" })

    }
    //bearer is confussing                                                                     
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (e, payload) => {
        if (e) return res.status(422).json({ error: `invalid:${e}` })
        // get id from jwt payload
        const { _id } = payload
        auth.findById({ _id: _id }).then(userdata => {
            // send user data from  collection of user to when it call
            Student.findOne({ postedBy: userdata._id }).then(whoPosted => {
                if (userdata.rule === 'admin' || whoPosted) {
                    req.user = userdata._id;

                    next()

                } else {
                    res.status(401).json({ error: 'un Authrized User' })
                }
            })


        }).catch(e=>{
            console.log('error at checking userPost in middleware',e);
        })
            .catch(e => {
                console.log(e)
            })

    })
}

module.exports = {
    user,
    adminUser,
    Posted
}