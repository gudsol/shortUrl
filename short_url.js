const express = require('express');
const mongoose = require('mongoose');
const ShortUrlRoute = require('./Routes/ShortUrlRoutes')
const UserRoute = require('./Routes/UserRoutes')
const ShortUrl = require('./Model/Short_url_schema');
require('dotenv').config()

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('view engine','ejs')

app.use(express.static('views'))
//app.use('/css',express.static(__dirname + 'views/css'))

// app.get("/",async(req,res)=>{
//   res.render("short")
  
// })

// app.get("/",(req,res)=>{
//   res.render("index")
// })

// app.get("/register",(req,res)=>{
//   res.render("register")
// })

// app.get('/short', async (req, res) => {
//     const shortUrls = await ShortUrl.find()
//     res.render('short',{ shortUrls: shortUrls })
//   })

//   app.get('/:shortUrl', async (req, res) => {
//     const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
//     if (shortUrl == null) return res.sendStatus(404)
//     res.redirect(shortUrl.full)
//   })

const port =process.env.port || 8000;

const URI= process.env.MONGO_URL 

mongoose.connect(URI,(err,res)=>{
   if(err) {console.log("error on connection")}else{
    console.log(`::: DB CONNECTED SUCCESSFULLY ON PORT ${port}:::`)
   }
})

app.use('/',ShortUrlRoute)
app.use('/',UserRoute)

app.listen(port,()=>console.log(`:::connected on port ${port}:::`));
