var express = require("express"); 
var mongojs = require("mongojs");
var router = express.Router(); 
var config = require("../config");

var db = mongojs(config.database, ['students']);

router.get("/students", function(req, res, next) { 
    db.students.find( (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    })
});

router.get("/students/:id", function(req, res, next) {
    db.students.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    })
});

router.post("/students", (req, res, next) => {
    var student = req.body;

    if (!student.StartDate) {
        student.StartDate = new Date();
    }

    if(!student.FirstName || !student.LastName || !student.School) {
        res.status(400);
        res.json({"error": "Very very bad data"})
    } else {
        db.students.save(student, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        })
    }
});

router.put("/students/:id", (req, res, next) => {
    var student = req.body;
    var updatedStudent = {};

    if(student.FirstName)
        updatedStudent.FirstName = student.FirstName;

    if(student.LastName)
    updatedStudent.LastName = student.LastName;

    if(student.School)
        updatedStudent.School = student.School;

    if(student.StartDate)
    updatedStudent.StartDate = student.StartDate;

    if(Object.keys(updatedStudent).length == 0) {
        res.status(400);
        res.json({"error": "bad data"});
    }else {
        db.students.update(
            {
                _id: mongojs.ObjectId(req.params.id)}, 
                updatedStudent, 
                {},
                (err, data) => {
                    if(err) res.send(err)
                res.json(data)
            }
        )
    }
})

router.delete("/students/:id", function(req, res, next) {
    db.students.remove({_id: mongojs.ObjectId(req.params.id)}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    })
});

module.exports = router; 