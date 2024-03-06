const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userSchema = require("../validations/userValidations");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 

//To Create
router.post("/signup", JoiMiddleWare(userSchema.signUpUser,'body'),
userController.signUp);

//To verify otp
router.post("/verify",
JoiMiddleWare(userSchema.verifyOtp, 'body'),userController.verifyOtp);

//To verify Token
router.post("/verifytoken",
JoiMiddleWare(userSchema.verifyToken, 'body'),userController.verifyToken);

router.get("/getUser",
userController.getAllUserData);

router.put("/update", JoiMiddleWare(userSchema.userUpdateSchema,'body'),
userController.updateUserData);

module.exports = router;
