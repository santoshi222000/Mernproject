const express = require('express')

const router = express.Router();

const {getAdminType, getAdminUser, getUsers, registerUser, loginUser} = require('../controller/userController.js')

const validateToken = require("../middleware/validateTokenHandler.js");


router.post('/register', registerUser)

router.post('/login', loginUser)

// router.get('/current', validateToken, currentUser)

router.get('/user', getUsers)

router.get('/admin',  getAdminUser)

router.get('/userData/:id',validateToken,  getAdminType)


module.exports = router ;


