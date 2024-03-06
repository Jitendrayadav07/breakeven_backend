// index.js
const express = require("express");
const router = express.Router();

// Import route handlers
const userRoutes = require("./user");
const groupRoutes = require("./group");
const caregoryRoutes = require("./category");
const expenseRoutes = require("./expense");
const currencyRoutes = require("./currency");
const subCategory = require("./sub-category");

// Register route handlers
router.use("/user",userRoutes);
router.use("/group",groupRoutes);
router.use("/category",caregoryRoutes);
router.use("/expense",expenseRoutes);
router.use("/currency",currencyRoutes);
router.use("/sub-category",subCategory);

module.exports = router;
