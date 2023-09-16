
const Course = require('../models/course.js') 
const Content = require('../models/courseContent.js') 
const asyncHandler = require('express-async-handler')


const getCourseChapterTopic = asyncHandler(async(req, res)=>{
      const result = await Content.find({})
      res.stauts(200).json(result)
})


module.exports = {
    getCourseChapterTopic,
}