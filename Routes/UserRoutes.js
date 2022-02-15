const router = require('express').Router()
const {UserController} = require('../Controllers/UserController')
const auth = require('../Middleware/auth')

router.post('/register',UserController.register)
router.post('/login',UserController.login)

module.exports=router