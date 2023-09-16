const mongoose= require("mongoose");

const courseSchema = mongoose.Schema({

    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User"
    // },
    img: String,
    title: String,
    heading: String,
    description: String,
    price: Number,
    phone: Number,
    timing: String,

    duration: String,

    start: String,

    classes: String,

    overview: String,


    facility: String,
    
    // image1: String,
})


const Course = mongoose.model('Course', courseSchema)

module.exports = Course;