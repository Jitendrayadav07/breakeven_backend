const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendmail");
const { Op, QueryTypes } = require("sequelize");
const APPROVE_STATUS = require("../constants/approve.constant");
const Response = require("../classes/Response");
const { JWT_SECRET } = require("../config/jwtTokenKey");
const sequelize = require("../config/db");

//New User Register
const signUp = async (req, res) => {
  try {
    const {name , email, contact_number , password } = req.body;

    let user_data = await User.findOne({ where: { email: email } });

    if (user_data) {
      return res.status(400).send(Response.sendResponse(false, null, APPROVE_STATUS.EMAIL_ALREADY_EXIT, 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record in the database
    const user = await User.create({
      name,
      contact_number,
      email,
      password: hashedPassword,
    });

    const emailData = { name: user.name };

    await sendEmail(user.email, "Welcome to Our Break Even App", "user-signup", emailData);

    res.status(201).send(Response.sendResponse(true, APPROVE_STATUS.USER_CREATED, null, 201));
  } catch (err) {
    console.log("err", err);
    return res.status(500).send(Response.sendResponse(false, null, err, 500));
  }
};

//User Login 
const login = async (req, res) => {
  try {
    let user_data = await User.findOne({ where: { email: req.body.email } });
    if (!user_data)
      return res
        .status(404)
        .send(
          Response.sendResponse(false, null, APPROVE_STATUS.EMAIL_AND_PASSWORD_INVALID, 404)
        );

    let passwordMatch = await bcrypt.compare(
      req.body.password,
      user_data.password
    );

    if (!passwordMatch)
      return res
        .status(404)
        .send(
          Response.sendResponse(false, null, APPROVE_STATUS.EMAIL_AND_PASSWORD_INVALID, 404)
        );

    delete user_data.dataValues.password;
    // JWT Token creation
    const token = jwt.sign(
      { email: user_data.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    user_data.dataValues["token"] = token;

    res.status(200).send(Response.sendResponse(true, user_data,APPROVE_STATUS.LOGIN_SUCCESSFUL, 200));
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("An error occurred while logging in.");
  }
};


module.exports = {
  signUp,
  login
};
