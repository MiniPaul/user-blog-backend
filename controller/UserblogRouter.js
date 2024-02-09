const express=require("express")
const userblogModel=require("../Models/UserblogModel")

const bcrypt=require("bcryptjs")

const router = express.Router()

hashPasswordGenerator=async(pass)=>{
    const salt = await bcrypt.genSalt(10)
    return  bcrypt.hash(pass,salt)
}

router.post("/add",async(req,res)=>{
 
    let{data}={"data":req.body}
    let password=data.password

    // hashPasswordGenerator(password).then(
    //     (hashedpassword)=>{
    //         console.log(hashedpassword)
    //         data.password=hashedpassword
    //         console.log(data)
    //         let user=new userblogModel(data)
    //         let result=user.save()
    //         res.json({
    //             status:"success"
    //         })
    //     }
    // )

    const hashedpassword=await hashPasswordGenerator(password)
    data.password=hashedpassword
    let user=new userblogModel(data)
    let result=await user.save()
    res.json({
        status:"success"
    })
})

router.post("/signin",async(req,res)=>{
    let input=req.body
    let email=req.body.email
    let data=await userblogModel.findOne({"email":email})
    if(!data)
    {
        return res.json(
            {
                status:"invalid user"
            }
        )
    }
    console.log(data)
    let dbpassword=data.password
    let inputpassword=req.body.password
    console.log(dbpassword)
    console.log(inputpassword)

    const match=await bcrypt.compare(inputpassword,dbpassword)
    if(!match)
    {
        return res.json(
            {
                status:"invalid password"
            }
        )
    }

    res.json({
        status:"success"
    })
})


module.exports=router