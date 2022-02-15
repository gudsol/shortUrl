const mongoose=require("mongoose")
const Users = require('../Model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const UserController = {
    register:async(req,res)=>{
        try {
            //console.log("0")
            const {username,email,password}=req.body

            const user =await Users.findOne({email})
            if(user) return res.status(400).json({msg:"email already exists"})

            // console.log("1")

            if(password.length <6) return res.status(400).json({msg:"password must be 6 char"})

            if(!username || !email || !password){
                return res.status(400).json({msg:"please fill all the field"})

               
            }
            // console.log("2")
            const hashpassword = await bcrypt.hash(password,10)

            const userData = new Users({
                username,
                email,
                password:hashpassword
            })
            // console.log("3")
            await userData.save()
                res.status(200).json("reg success")
            // res.redirect(`http://localhost:8000/login`)

        } catch (error) {
            return res.status(400).json({error:"register failed"})
            
        }
    },

    login:async(req,res)=>{

        try {

            const { email , password}=req.body

            if(!email || !password){
                return res.status(400).json({msg:"fill all field"})
            }
            
            const user =await Users.findOne({email})
            if(!user) return res.status(400).json({msg:"email does not exists"})

            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:"password dose not match"})

           

            if(isMatch){
                const accessToken = createAccessToken({_id: user._id})

                const{_id,username,email}=user
                //  res.redirect(`http://localhost:8000/short`)
                res.status(200).json("successs")
                console.log({accessToken, savedUser:{_id,username,email}})
                
            }



        } catch (error) {
            
        }

    }
}


const createAccessToken = (user) =>{
    return jwt.sign(user,process.env.TOKEN_KEY,{expiresIn:'1d'})
}



module.exports = {UserController}