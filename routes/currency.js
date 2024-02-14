const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currencyController");
const userAuth = require("../middlewares/jsonwebtoken/jwtAuthMiddleware");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 

router.get("/",
    userAuth,
    currencyController.getCurrencyUnits)


module.exports = router;