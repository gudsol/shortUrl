const mongoose = require('mongoose')
const ShortUrlData = require('../Model/Short_url_schema')

const CreateShortUrl = {
    full : async(req,res)=>{

        try {

            const full = req.body.full

            const shorturl = await ShortUrlData({
                full
            })
            await shorturl.save();
            console.log(`:::${full} Shorted Successfully`)
            res.redirect('http://localhost:8000/short')
            
            
        } catch (error) {
            res.json({error:error.message})
        }

      // await ShortUrlData.create({full:req.body.fullUrl})
       //res.redirect('')

        

    }
}


// const ReadShortUrl={
//     get : async(req,res)=>{
//         try {

//             const read = await ShortUrlData.find()
//             res.render('index.ejs',{read:read})
//             // res.json({msg:"Data inserted",
//             // read
//         //})
            
//         } catch (error) {

//             res.staus(200).json({msg:"Error"})
            
//         }
//     }
// }


module.exports=CreateShortUrl