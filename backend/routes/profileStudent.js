const router = require('express').Router();

//student DB
const Student = require('../model/Student');

//@desc for get single sudent profile
//@route get /pofile/:id
router.get("/:id",(req,res)=>{
    Student.findById(req.params.id).then(data=>{
        res.json(data)
    })
    .catch(e=>{
        console.log('error in find profile',e);
    })
})

module.exports = router