const express = require("express");
const userModel = require("../models/User");
const dotenv = require("dotenv");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifytoken = require("../midddleware/auth");

dotenv.config();

//register user
router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const userdata = new userModel({
      userName: userName,
      email: email,
      password: hashpassword,
    });
    const data = await userdata.save();
    if (data) {
      const token = jwt.sign({ id: data._id }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      res.status(200).json({
        message: "User Registered Sucessfully...!",
        status: true,
        statusCode: 200,
        data: data,
        token: token,
      });
    } else {
      res.status(400).json({
        message: "Something went wrong...!",
        status: false,
        statusCode: 400,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong...!",
      status: false,
      statusCode: 500,
    });
  }
});

//login

router.post("/login", verifytoken, async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      let getData = await userModel.findOne({ userName });
      if (getData) {
        let result = await bcrypt.compare(password, getData.password);

        if (result) {
          res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Login Successfully...!",
          });
        } else {
          res.status(400).json({
            status: false,
            statusCode: 400,
            message: "Invalid Credentials, Please Try Again",
          });
        }
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "User is not found please try again...!",
          status: false,
        });
      }
    }
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Something Went Wrong..",
    });
  }
});

//update user

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, password, email } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: userName,
          password: hash,
          email: email,
        },
      },
      { new: true }
    );
    if (updateUser) {
      res
        .status(200)
        .json({
          message: "User updaded sucesssfully...!",
          status: true,
          statusCode: 200,
          data: updateUser,
        });
    } else {
      res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Something Went Wrong..",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Something Went Wrong..",
    });
  }
});

//findbyid

router.get("/", verifytoken, async (req, res) => {
  try {
    const data = await userModel.find();
    if (data) {
      res
        .status(200)
        .json({
          message: "Data Found Sucessfuylly..!",
          status: true,
          statusCode: 200,
          data: data,
        });
    } else {
      res
        .status(400)
        .json({
          message: "Something Went Wrong..!",
          status: false,
          statusCode: 400,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something Went Wrong..!",
        status: false,
        statusCode: 400,
      });
  }
});

module.exports = router;
