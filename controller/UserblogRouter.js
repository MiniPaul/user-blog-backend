const express=require("express")
const userblogModel=require("../Models/UserblogModel")

const router = express.Router()

router.post("/add",async(req,res)=>{
    let data=req.body
    let userblog=new userblogModel(data)
    let result=await userblog.save()
    res.json({
        status:"success"
    })
})


module.exports=router