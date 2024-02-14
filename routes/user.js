const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userSchema = require("../validations/userValidations");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 

router.post("/signup", JoiMiddleWare(userSchema.signUpUser,'body'),
userController.signUp);

router.post("/login", JoiMiddleWare(userSchema.login,'body'),
userController.login);

module.exports = router;
