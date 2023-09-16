
const Course = require('../models/course.js') 
const Content = require('../models/courseContent.js') 

const AddContent = async(req, res)=>{

    const content = new Content({course: req.body.course, content: req.body.content, userId: req.params.id})
    try {
       await content.save();
       res.status(200).json("successfuly add")
    } catch (error) {
        res.status(404).json(error)
    }
}

const getContent = async(req, res)=>{
    console.log(req.params.id);
    try {
        const content = await Content.find({userId : req.params.id})
        res.status(200).json(content)
    } catch (error) {
        res.stauts(404).json(error)
    }
}

const getCourseChapterTopic = async (req, res)=>{
    try {
    const courses =  await   Content.find({})
    // console.log(courses);
    res.status(200).json(courses)
    } catch (error) {
        res.status(404).json(error)
    }
}

const addTopic = async (req, res)=>{
    try {
    const courses =  await   Content.findByIdAndUpdate({_id: req.params.id}, {$push : {topic : req.body.topic}})
    // console.log(courses);
    res.status(200).json(courses)
    } catch (error) {
        res.status(404).json(error)
    }
}


module.exports = {
    getContent,
    getCourseChapterTopic,
    addTopic,
    AddContent,
}