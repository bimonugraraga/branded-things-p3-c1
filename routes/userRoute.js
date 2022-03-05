const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController')
const authn = require('../middlewares/authn')


//!Login
router.post('/login', Controller.loginUser)
router.use(authn)
//!Register
router.post('/register', Controller.addNewUser)




module.exports = router