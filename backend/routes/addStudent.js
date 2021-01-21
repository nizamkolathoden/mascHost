const router = require('express').Router();
const { user } = require('../middleware/index');
const { Posted } = require('../middleware/index')
//student DB||model
const Student = require('../model/Student')

//@desc to post new student data
//@route post /student/newstudent
router.post("/newstudent", user, (req, res) => {
    const { fName, lName, mob1, mob2, dob, sex, bloodGroup,
        nameOfGuardian, homeName, post, pincode,
        city, relationGuardin,
        occupationOfGuardian, religion, prevShool, residence,
        course, sem, batch, sslc, hss, specialProblem,
        recommanted, responsibleGuardianName, responsibleGuardianAge,
        responsibleGuardianMob, responsibleGuardianRelation, cast, email,
        ageOfGuardian,responsibleGuardianOccupation,etcActivity,specialAchiev,
        maritalStatus,prevCourse,admissionSecured,pic,admno } = req.body;
/* 
    if (!fName || !lName || !mob1 || !dob || !sex || !bloodGroup ||
        !nameOfGuardian || !relationGuardin ||
        !occupationOfGuardian || !prevShool ||
        !residence || !course || !batch || !responsibleGuardianName
        || !responsibleGuardianAge || !responsibleGuardianMob
        || !responsibleGuardianRelation || !homeName
        || !post || !pincode || !city || !email || !ageOfGuardian)

        return res.json({ error: 'enter required fields' });
 */
        if (!fName)  return res.json({ error: 'enter name' });

        if (!lName) return res.json({ error: 'enter lnames' });

        if (!mob1 )
            return res.json({ error: 'enter required mob1' });

            if ( !dob)
                return res.json({ error: 'enter required dob' });

                if (!sex )
                    return res.json({ error: 'enter required fields sex' });

                    if ( !bloodGroup)
                        return res.json({ error: 'enter required fields blood' });

                        if (!nameOfGuardian)
                            return res.json({ error: 'enter required fields nameofGuardian' });
                           
                            if (!relationGuardin)
                        
                                return res.json({ error: 'enter required fields relation' });
                                if (
                                    !occupationOfGuardian || !prevShool ||
                                    !residence || !course || !batch || !responsibleGuardianName
                                    || !responsibleGuardianAge || !responsibleGuardianMob
                                    || !responsibleGuardianRelation || !homeName
                                    || !post || !pincode || !city || !email)
                            
                                    return res.json({ error: 'enter required fields other' });

    const responsibleGuardian = {
        name: responsibleGuardianName,
        age: responsibleGuardianAge,
        relation: responsibleGuardianRelation,
        mob: responsibleGuardianMob,
        occupation:responsibleGuardianOccupation
    }
    const addressOfGuardian = {
        homeName,
        post,
        pincode,
        city
    }

    new Student({
        fName,
        lName,
        mob1,
        mob2,
        dob,
        sex,
        bloodGroup,
        nameOfGuardian,
        relationGuardin,
        occupationOfGuardian,
        religion,
        prevShool,
        residence,
        course,
        sem,
        batch,
        sslc,
        hss,
        specialProblem,
        recommanted,
        postedBy: req.user,
        responsibleGuardian,
        addressOfGuardian,
        cast,
        email,
        ageOfGuardian,
        etcActivity,
        specialAchiev,
        maritalStatus,
        prevCourse,
        admissionSecured,
        pic,
        admno


    }).save().then(savedData => {
        res.json(savedData)
    })
        .catch(e => {
            console.log('\u{1F525} on Ass error in save new student', e);
        })

})


//@dsc for deletig studets
//@route delete /student/delete

router.delete("/delete", Posted, (req, res) => {
    Student.findByIdAndDelete(req.body.id)
        .then(data => res.json(data))
        .catch(e => {
            console.log('\u{1F525} on Ass error in delete student', e);
        })

})


//@dsc for show all  studets
//@route get /student/all

router.get('/all', (req, res) => {
    Student.find().populate('postedBy', 'userName _id rule').then(data => {
        res.json(data)
    })
        .catch(e => {
            console.log('\u{1F525} on Ass error in all data', e);
        })
})

//@desc for filter
//@route get /student/filter

router.get('/filter', (req, res) => {
    // aggreate a little bit advance form of mongodb if you don't understand read doc
    Student.aggregate([
        {
            $group: {
                //we put _id null for to remove duplication
                _id: null,
                course: { $addToSet: '$course' },
                sem: { $addToSet: "$sem" },
                batch: { $addToSet: "$batch" }
            }
        }
    ])
        .exec((err, filter) => {
            if (err) {
                console.log('error in filter', err);
                res.json({ error: 'something went wrong contact dev' })
            }
            else {
                res.json(filter)
            }
        })
})


//@desc for filter students data
//@route put /student/filterStudent

router.put('/filterStudent', (req, res) => {

    const { course, batch, sem } = req.body
    if (!course) return res.json({ error: 'course error' })
    if (!batch) return res.json({ error: 'batch error' })
    if (!sem) return res.json({ error: 'sem error' })
    Student.find({
        $and: [{ course: course }, { batch: batch }, { sem: sem }]
    }).then(data => {
        res.json(data)

    }).catch(e => {
        console.log('\u{1F525} on Ass', e);
        res.json({ error: 'something went wrong contact the dev' })
    })
})

//@desc to put new student data
//@route post /student/editstudent
router.put("/editstudent", user, (req, res) => {
    const { fName, lName, mob1, mob2, dob, sex, bloodGroup,
        nameOfGuardian, homeName, post, pincode,
        city, relationGuardin,
        id,
        occupationOfGuardian, religion, prevShool, residence,
        course, sem, batch, sslc, hss, specialProblem,
        recommanted, responsibleGuardianName, responsibleGuardianAge,
        responsibleGuardianMob, responsibleGuardianRelation, cast, email,
        ageOfGuardian,responsibleGuardianOccupation,etcActivity,specialAchiev,
        maritalStatus,prevCourse,admissionSecured,pic,admno } = req.body;
/* 
    if (!fName || !lName || !mob1 || !dob || !sex || !bloodGroup ||
        !nameOfGuardian || !relationGuardin ||
        !occupationOfGuardian || !prevShool ||
        !residence || !course || !batch || !responsibleGuardianName
        || !responsibleGuardianAge || !responsibleGuardianMob
        || !responsibleGuardianRelation || !homeName
        || !post || !pincode || !city || !email || !ageOfGuardian)

        return res.json({ error: 'enter required fields' });
 */
        
    const responsibleGuardian = {
        name: responsibleGuardianName,
        age: responsibleGuardianAge,
        relation: responsibleGuardianRelation,
        mob: responsibleGuardianMob,
        occupation:responsibleGuardianOccupation
    }
    const addressOfGuardian = {
        homeName,
        post,
        pincode,
        city
    }
Student.findByIdAndUpdate(id,{
        fName,
        lName,
        mob1,
        mob2,
        dob,
        sex,
        bloodGroup,
        nameOfGuardian,
        relationGuardin,
        occupationOfGuardian,
        religion,
        prevShool,
        residence,
        course,
        sem,
        batch,
        sslc,
        hss,
        specialProblem,
        recommanted,
        postedBy: req.user,
        responsibleGuardian,
        addressOfGuardian,
        cast,
        email,
        ageOfGuardian,
        etcActivity,
        specialAchiev,
        maritalStatus,
        prevCourse,
        admissionSecured,
        pic,
        admno


    }).then(savedData => {
        res.json(savedData)
    })
        .catch(e => {
            console.log('\u{1F525} on Ass error in save new student', e);
        })

})



module.exports = router;