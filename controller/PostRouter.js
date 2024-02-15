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
    .populate("userId","name age mobno address pincode email -_id ")//id 
    .exec()
    res.json(result)
})

router.post("/viewmypost",async(req,res)=>{
    let input=req.body
    let data=await postmodel.find(input)
    res.json(data)
})

router.post("/delete",async(req,res)=>{
    let datainput=req.body
    let response = await postmodel.deleteOne(datainput)
    res.json({
            "status":"success"
     })

})


module.exports=router