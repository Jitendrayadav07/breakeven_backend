const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const expenseSchema = require("../validations/expenseValidation");
const userAuth = require("../middlewares/jsonwebtoken/jwtAuthMiddleware");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 

router.post("/create-expense",
userAuth,
JoiMiddleWare(expenseSchema.createExpenseSchema,'body'),
expenseController.createExpense);


module.exports = router;