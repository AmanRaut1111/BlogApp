const express = require("express");
const userModel = require("../models/User");
const dotenv = require("dotenv");
const router = express.Router();
const bcrypt = require("bcrypt");

dotenv.config();

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

//delete user

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findByIdAndDelete(id);
    if (data) {
      res
        .status(200)
        .json({
          message: "User Deleted sucesssfully...!",
          status: true,
          statusCode: 200,
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
    res
      .status(500)
      .json({
        message: "Something Went Wrong...!",
        status: false,
        statusCode: 500,
      });
  }
});

//findbyid

router.get("/find/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findById(id);
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
