const express = require('express')

const router = express.Router();

const {AddContent, addTopic, getCourseChapterTopic, getContent} = require('../controller/content-controller.js')

const validateToken = require('../middleware/validateTokenHandler.js');

router.post('/addContent/:id',AddContent)

router.get('/course2/:id', getContent)

router.get("/addTopic" , getCourseChapterTopic)

router.put("/topic/:id" , addTopic)



module.exports = router ;


