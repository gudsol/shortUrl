const router = require('express').Router()
const CreateShortUrl = require('../Controllers/ShortUrlController')

router.post("/add",CreateShortUrl.full)
//router.get("/",ReadShortUrl.get)


module.exports=router

