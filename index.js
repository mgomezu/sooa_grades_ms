const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./course")
const Course = mongoose.model("Course");


mongoose.connect("mongodb+srv://sooa_mongo_admin:CbfRdzY1dULYKIiE@sooa-mongo-cluster.lrlq0px.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("Database is connected");
}
);

app.use(bodyParser.json());

app.post("/course",(req,res) => {
    var newCourse = {
        code: req.body.code,
        group: req.body.group,
        course_name: req.body.course_name,
        professor: req.body.professor,
        _id: req.body.code + "-" + req.body.group
    }
    var course = new Course(newCourse)

    course.save().then(() => {
        res.send("El curso fue creado con exito")
    }).catch((err) => {
        throw err;
    })
})

app.get("/course",(req,res) => {
    Course.find().then((course)=>{
        res.json(course)
    }).catch((err) => {
        throw err;
    })
})

app.get("/course/:id",(req,res) => {

    Course.findById(req.params.id).then((course)=>{
        if(course){
            res.json(course)
        }else{
            res.sendStatus(404);
        }
        
    }).catch((err) => {
        
    })
})

app.delete("/course/:id",(req,res) => {

    Grade.find({'course' : req.params.id}).then((grade)=>{
        for (const student in grade) {
            Grade.findOneAndDelete({'course' : req.params.id}).then(()=>{
                console.log("student.")
            })
          }
        
    }).catch((err) => {
        throw err;
    })

    Course.findByIdAndDelete(req.params.id).then((course)=>{
        res.send("Curso eliminado")
    }).catch((err) => {
        throw err;
    })
})

app.put("/course/:id",(req,res) => {
    Course.findById(req.params.id).then((course)=>{
        if(course){
            Course.updateOne({professor: req.body.professor}).then((rawResponse) => {

            })
            .catch((err) => {
              // manejar error
            });
        }else{
            res.sendStatus(404);
        }
        res.send("guardado");
    }).catch((err) => {
        throw err;
    })
    
})

require("./grade")
const Grade = mongoose.model("Grade");

app.post("/grade",(req,res) => {
    Course.findById(req.body.course).then((course)=>{
        if(course){
            Grade.findOne({'student_id' : req.body.student_id, 'course' : req.body.course}).then((grade)=>{
                if(!grade){
                    var newGrade = {
                        course: req.body.course,
                        student_id: req.body.student_id,
                        grade: req.body.grade
                    }
            
                    var grade = new Grade(newGrade)
            
                    grade.save().then(() => {
                        
                    }).catch((err) => {
                        throw err;
                    })
                    res.send("El estudiante fue asignado a la clase con exito")
                }else{
                    res.send("El estudiante ya habia sido asignado a la clase")
                }
            }).catch((err) => {
                throw err;
            })
        }else{
            res.send("Clase no encontrada")
        }
        
    }).catch((err) => {
        throw err;
    })
    
        
})

app.get("/grade",(req,res) => {
    Grade.find().then((grade)=>{
        res.json(grade)
    }).catch((err) => {
        throw err;
    })
})

app.get("/grade/:id",(req,res) => {

    Grade.findById(req.params.id).then((grade)=>{
        if(grade){
            res.json(grade)
        }else{
            res.sendStatus(404);
        }
        
    }).catch((err) => {
        Grade.find({'course' : req.params.id}).then((grade)=>{
            if(grade){
                res.json(grade)
            }else{
                res.sendStatus(404);
            }
            
        }).catch((err) => {
            throw err;
        })
    })
})

app.put("/grade/:id",(req,res) => {
    Grade.findById(req.params.id).then((grade)=>{
        if(grade){
            grade.updateOne({grade: req.body.grade}).then((rawResponse) => {

            })
            .catch((err) => {
              // manejar error
            });
        }else{
            res.sendStatus(404);
        }
        res.send("guardado");
    }).catch((err) => {
        throw err;
    })
    
})

app.delete("/grade/:id",(req,res) => {
    
    Grade.findByIdAndDelete(req.params.id).then((grade)=>{
        res.send("Alumno eliminado del curso")
    }).catch((err) => {
        throw err;
    })
})

app.put("/grade/:course_id/:student_id",(req,res) => {
    Grade.findOne({'student_id' : req.params.student_id, 'course' : req.params.course_id}).then((grade)=>{
        grade.updateOne({grade: req.body.grade}).then((rawResponse) => {

        })
        .catch((err) => {
            throw err;
        });
        res.send("guardado");
    }).catch((err) => {
        throw err;
    })
    
})

app.get("/grade/:id/Student",(req,res) => {

    Grade.find({'student_id' : req.params.id}).then((grade)=>{
        if(grade){
            res.json(grade)
        }else{
            res.sendStatus(404);
        }
        
    }).catch((err) => {
        throw err;
    })
})

app.listen(4545, () => {
    console.log("hola mundo");
})