const Users = require('../Model/User')
const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    const {authorization}=req.headers

    

    if(!authorization){
        res.status(400).json({error:"You must logged in"})
    }

    const accessToken=authorization.replace("","")

    jwt.verify(accessToken,process.env.TOKEN_KEY,(err , payload)=>{
        if(err) {
            return res.status(400).json({error:"you are un auth"})
        }

        const {_id}=payload
        Users.findOne({_id})
        .then(userdata =>{
            req.user=userdata
            next()
        res.status(200).json({msg:"your authorized"})
        })
    })
}