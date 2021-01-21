const router = require('express').Router();

//student DB
const Student = require('../model/Student')


//@dsc for adding remarks
//@route put /remak/jan

router.put("/jan", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.jan": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in jan', e);
        })
})

//@dsc for adding remarks
//@route put /remark/feb

router.put("/feb", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.feb": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in feb', e);
        })
})

//@dsc for adding remarks
//@route put /remark/march

router.put("/march", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.march": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in march', e);
        })
})

//@dsc for adding remarks
//@route put /remark/april

router.put("/april", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.april": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in april', e);
        })
})

//@dsc for adding remarks
//@route put /remark/may

router.put("/may", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.may": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in may', e);
        })
})


//@dsc for adding remarks
//@route put /remark/jun

router.put("/jun", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.jun": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in jun', e);
        })
})

//@dsc for adding remarks
//@route put /remark/july

router.put("/july", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.july": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in july', e);
        })
})

//@dsc for adding remarks
//@route put /remark/aug

router.put("/aug", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.aug": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in aug', e);
        })
})

//@dsc for adding remarks
//@route put /remark/sep

router.put("/sep", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.sep": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in sep', e);
        })
})

//@dsc for adding remarks
//@route put /remark/oct

router.put("/oct", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.oct": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))

        .catch(e => {
            console.log('error in oct', e);
        })
})


//@dsc for adding remarks
//@route put /remak/oct

router.put("/oct", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.oct": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))
        .catch(e => {
            console.log('error in oct', e);
        })
})

//@dsc for adding remarks
//@route put /remark/nov

router.put("/nov", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.nov": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))
        .catch(e => {
            console.log('error in nov', e);
        })
})


//@dsc for adding remarks
//@route put /remark/dec

router.put("/dec", (req, res) => {
    const { id, boo } = req.body;
    Student.findByIdAndUpdate(id, {
        $set: {
            "remarks.dec": boo
        }
    }, {
        new: true
    }).then(data => res.json(data))
        .catch(e => {
            console.log('error in dec', e);
        })
})

module.exports = router