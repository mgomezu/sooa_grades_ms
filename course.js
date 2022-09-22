const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Grade = mongoose.model("Grade");

mongoose.model("Course",{
    _id:{
        type: String,
        require: true
    },
    code: {
        type: Number,
        require: true
    },
    group: {
        type: Number,
        require: true
    },
    course_name: {
        type: String,
        require: true
    },
    professor: {
        type: String,
        require: false
    },
    /*grades: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Grade'
    }]*/
}) 