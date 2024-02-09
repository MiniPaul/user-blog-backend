const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userblogRouter = require("./controller/UserblogRouter")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/api/userblog",userblogRouter)

mongoose.connect("mongodb+srv://minipaul:minipaul@cluster0.isuura7.mongodb.net/userblogDb?retryWrites=true&w=majority", 
{useNewUrlParser:true})

app.listen(3001,()=>{
    console.log("Server Running")
})
