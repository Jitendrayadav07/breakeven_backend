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

router.get("/get-user-expense",
userAuth,
JoiMiddleWare(expenseSchema.getUserExpense,'body'),
expenseController.getUserExpenseData);


router.get("/get-all-user-expense",
// userAuth,
expenseController.getUserExpenseMappingData);


module.exports = router;