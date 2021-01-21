const router = require('express').Router();
const Student = require('../model/Student')

//@desc for adding subjects
//@route put subject/addsubjects
router.put("/addsubjects", (req, res) => {
    const { name, currentSem, sem, course } = req.body
    if (!name || !sem || !course || !currentSem) return res.json({ error: 'fill all required fields' })
    const subjects = {
        name,
        sem
    }
    Student.find({
        $and: [{ course: course }, { sem: currentSem }]
    }).then(allStudent => {

        allStudent.map(singleStudent => {
            Student.findByIdAndUpdate(singleStudent._id, {
                $push: { subjects: subjects }
            }, {
                new: true
            }).then(data => {
                console.log(data)
            
            }).catch(e => {
                console.log('fucking error at subject adding auto sub', e)
            })
            // now I'm comment this if you want this plz un comment not recomment
            // res.json('add all student fields')
        })

    }).catch(e => {
        console.log('fire on ass error at finding all student in auto sub', e);
    })

})


//@desc for adding specifig subject pass or fail
//@route put subject/pass
router.put("/pass", (req, res) => {

    Student.findOneAndUpdate({ "subjects._id": req.body.id }, {
        $set: { "subjects.$.pass": req.body.boo }
    }, {
        new: true
    }).exec((e, data) => {
        if (e) console.log('\u{1F525} on Ass error in adding subjects', e);
        res.json(data);
    })
})


module.exports = router




/* Student.findByIdAndUpdate(req.body.id, {
    $push: { subjects: subjects }
}, {
    new: true
}).exec((e, data) => {
    if (e) console.log('\u{1F525} on Ass error in adding subjects', e);
    res.json(data);
}) */