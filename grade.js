const mongoose = require("mongoose");

mongoose.model("Grade",{
    course: {
        type: String,
        ref: "course",
        require: true
    },
    student_id: {
        type: Number,
        require: true
    },
    grade: {
        type: Number,
        require: false
    },
})