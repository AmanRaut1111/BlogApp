const express = require("express");
const catModel = require("../models/category");
const dotenv = require("dotenv");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const verifytoken = require("../midddleware/auth");

router.post("/Add", verifytoken, async (req, res) => {
  try {
    const catdata = new catModel(req.body);
    const data = await catdata.save();
    if (data) {
      res
        .status(200)
        .json({
          message: "Category Added Sucessfully...!",
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

// const upload=multer({
//     storage:multer.diskStorage({
//         dstination: function(req,file,cb){
//             cb(null,"uploads")
//         },
//         filename:function(req,file,cb){
//             cb(null,file.fieldname + "_" +Date.now() + ".jpeg")
//         }
//     })
// }).single("user_file")

// router.post('/addpic',upload,(req,res)=>{
//     res.status(200).json({message:"file uploaded sucessfully"})
// })

module.exports = router;
