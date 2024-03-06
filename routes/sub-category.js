const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/subCategoryController");
const userAuth = require("../middlewares/jsonwebtoken/jwtAuthMiddleware");
const categorySchema = require("../validations/subCategoryValidation");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 

router.post("/create-sub-cat",
userAuth,
JoiMiddleWare(categorySchema.createSubCategorySchema,'body'),
categoryController.createSubCategory);

router.get("/get-all-sub-category", 
userAuth,
categoryController.getAllSubCategory);

router.get("/:id", 
userAuth,
JoiMiddleWare(categorySchema.getSubCategoryByIDSchema, 'params'),
categoryController.getSubCategoryById);

module.exports = router;