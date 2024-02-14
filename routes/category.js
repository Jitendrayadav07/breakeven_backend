const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const userAuth = require("../middlewares/jsonwebtoken/jwtAuthMiddleware");
const categorySchema = require("../validations/categoryValidation");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 

router.post("/create",
userAuth,
JoiMiddleWare(categorySchema.createCategorySchema,'body'),
categoryController.createCategory);

router.get("/get-all-category", 
userAuth,
categoryController.getAllCategory);

router.get("/:id", 
userAuth,
JoiMiddleWare(categorySchema.getCategoryByIDSchema, 'params'),
categoryController.getCategoryById);

module.exports = router;