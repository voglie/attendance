const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const user = require("../models/user");
const { successResponse, errorResponse } = require("../utils");

const login = async (req, res) => {
  try {
    const emailID = req.body.emailID;
    const password = req.body.password;

    // check for email exist or not
    const userData = await user.findOne({ emailID: emailID });
    if (!userData) {
      return errorResponse(req, res, "Invalid credentials!", 404);
    }

    // check for the password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      res.render("login");

      // return errorResponse(req, res, 'Invalid credentials!', 404);
    } else {

      // jwt token created
      let accessToken = userData.getToken({
        exp: 60 * 60,
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      res.cookie("accessToken", accessToken);
      await userData.save();

      res.redirect("/cn");
      // return successResponse(req, res, accessToken, 200);
    }
  } catch (error) {
    return errorResponse(req, res, "something went wrong!", 400, {
      err: error,
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, enrollment, emailID, password, branch } = new user(req.body);

    // check if email id allready exist
    const userData = await user.findOne({ emailID: emailID });

    if (userData) {
      return errorResponse(req, res, "email id allready exist", 400);
    } else {
      // creating payload
      const payload = {
        username,
        enrollment,
        emailID,
        password,
        branch,
      };

      // register new user
      const newUser = new user(payload);
      const insertUser = await newUser.save();

      console.log("Registration Successful");
      res.render("login");
      // return successResponse(req, res, insertUser, 200);
    }
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 400);
  }
};

const loginView = async (req, res) => {
  res.render("login");
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.redirect("/");
  } catch (error) {
    return errorResponse(req, res, "Error while logging out", 500);
  }
};


module.exports = {
  login,
  register,
  logout,
  loginView,
};
