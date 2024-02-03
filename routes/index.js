// index.js
const express = require("express");
const router = express.Router();

// Import route handlers
const userRoutes = require("./user");

// Register route handlers
router.use("/user",userRoutes);

module.exports = router;
