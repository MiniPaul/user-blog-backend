const express=require("express")
const cors=require("cors")
const mongodb=require("mongoose")
const postmodel=require("../Models/PostModel")
const router=express.Router()

router.post("/add",async(req,res)=>{
    let data=req.body
    let post=new postmodel(data)
    let result=await post.save()
    res.json({
        status:"success"
    })
})

router.get("/viewall",async(req,res)=>{
    let result=await postmodel.find()
    res.json(result)
})

module.exports=router
