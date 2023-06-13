const express = require("express");
const postModel = require("../models/post");
const dotenv = require("dotenv");
const router = express.Router();
const bcrypt = require("bcrypt");
const verifytoken=require('../midddleware/auth')
dotenv.config();

//add post
router.post("/Add",verifytoken, async (req, res) => {
  try {
    const Postdata = new postModel(req.body);
    const data = await Postdata.save();
    if (data) {
      res
        .status(200)
        .json({
          message: "Post Added sucessfully...!",
          status: true,
          statusCode: 200,
          data: data,
        });
    } else {
      res
        .status(400)
        .json({
          message: "Something Went Wrong...!",
          status: false,
          statusCode: 400,
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Something Went Wrong...!",
        status: false,
        statusCode: 500,
      });
  }
});

//update post

router.put('/update/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const data= await postModel.findByIdAndUpdate(id,{$set:req.body},{new:true})
        if(data){
            res.status(200).json({message:"Post updated sucessfully..!",status:true,statuscode:200,data:data})
        }else{
            res.status(400).json({message:"Something Went wrong..!",status:false,statuscode:400})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Post updated sucessfully..!",status:true,statuscode:500,data:data})
    }
});


//delete Post


router.delete('/delete/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const data=await postModel.findOneAndDelete(id)
        if(data){
            res.status(200).json({message:"Post has been deleted Sucessfully..!",status:true,statusCode:200})
        }else{
            res.status(400).json({message:"Something Went wrong..!",status:false,statuscode:400})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Post updated sucessfully..!",status:true,statuscode:500,data:data})
    }
})






 module.exports=router;