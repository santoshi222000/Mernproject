const asyncHandler = require('express-async-handler')
const Course = require('../models/course.js') 
const Content = require('../models/courseContent.js') 
// const { Error } = require('mongoose')

const addcourse = async (req, res)=>{
    // const course = req.body;
    // const img = (req.file)? req.file.filename : null
    const course = new Course(req.body)
    try {
       await course.save();
       res.status(200).json("successfuly add")
    } catch (error) {
        res.status(404).json(error)
    }
} 

const getcourse = async (req, res)=>{


    try {
        const courses =  await   Course.find({})

        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json(error);
      
    }
}

 const getAllCourse = async (req, res)=>{
   
    try {
        const courses =  await   Course.find({})
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json(error);
      
    }
}

 const editCourse = async (req, res)=>{
    
    try {
        const edit = await Course.findOne({_id: req.params.id})

        res.status(200).json(edit)
    } catch (error) {
        res.status(400).json(error);
      
    }
    

}

 const addContent = async (req, res)=>{
    const query = req.params.id;
    // console.log(req.body.content);
     try {
        const course = new Content({content : req.body.content, userId : req.params.id, course: req.body.course})
        // console.log(course);
       const result = await course.save();
       res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

const addTopic = async (req, res)=>{
    try {
        const edit = await Course.findOne({_id: req.params.id})
        res.status(200).json(edit)
    } catch (error) {
        res.status(404).json(error)
    }
}


 const addCourseContent = async (req, res)=>{

    const course =req.body;
    // const addcoursecontent = new Course(course)
    try {
        await Course.findOneAndUpdate({_id: req.body.params}, {$push: {topic : course.topic}});
        res.status(200).json("successfully add")
     } catch (error) {
         res.status(404).json("data not saved", error)
     }
}

 const editcourseDetail = async (req, res)=>{
    
    const course = req.body;
    const editCourse =  new Course(course)

    try {
        await Course.updateOne({_id: req.params.id}, editCourse)
        res.status(200).json(editCourse)
    } catch (error) {
        res.status(500).json(error)
    }
}

 const deleteCourse = async (req, res)=>{
    try {
        await Course.deleteOne({_id: req.params.id})
        res.status(200).json('Course ddeleted Successfully')
    } catch (error) {
        res.status(408).json(error)
    }
}




const getCourseInfomation = async (req, res)=>{
            console.log(req.params.id);
            try {
                const getdetails = await Course.find({_id: req.params.id})
                console.log(getdetails);
                res.status(200).json(getdetails)
            } catch (error) {
                res.status(404).json(error)
            }
}

const getCourseChapterTopic = async (req, res)=>{
            try {
                const getdetails = await Content.find({})
                res.status(200).json(getdetails)
            } catch (error) {
                console.log(error);
                res.status(404).json(error)
            }
}

const getChapters = async (req, res)=>{
    console.log(req.query.course);
            try {
                const getdetails = await Content.find({course : req.query.course})
                res.status(200).json(getdetails)
            } catch (error) {
                console.log(error);
                res.status(404).json(error)
            }
}

module.exports = {
    addcourse,
    getcourse,
    getAllCourse,
    editCourse,
    addTopic,
    addCourseContent,
    editcourseDetail,
    deleteCourse,
    addContent,
    getCourseChapterTopic,
    getCourseInfomation,
    getChapters,

}