const express = require('express')
// import multer from 'multer'
// const upload = multer()

const { getCourseInfomation , addcourse, getcourse, getAllCourse, editCourse, editcourseDetail, deleteCourse, addCourseContent} = require('../controller/course-controller.js') 
const validateToken = require('../middleware/validateTokenHandler.js');

const router = express.Router();

// router.use(validateToken);

router.post('/addcourses',  addcourse)

router.get('/', getcourse)

router.get('/allCourses', getAllCourse)

router.get('/:id', editCourse)

// router.get('/:id', AddCourseChapterTopic)

router.put('/:id', addCourseContent)

router.post('/:id', editcourseDetail)

router.delete('/:id', deleteCourse)

router.get('/course2/:id', getCourseInfomation )








module.exports = router ;

