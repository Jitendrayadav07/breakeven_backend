const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const userAuth = require("../middlewares/jsonwebtoken/jwtAuthMiddleware");
const groupSchema = require("../validations/groupValidations");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 

router.post("/create-group",
userAuth,
JoiMiddleWare(groupSchema.createGroup,'body'),
groupController.createGroup);

router.post("/access-contact", 
userAuth,
// JoiMiddleWare(groupSchema.addGroupMemberSchema, 'body'),
groupController.accessContactApi);

router.post("/add-member", 
userAuth,
// JoiMiddleWare(groupSchema.addGroupMemberSchema, 'body'),
groupController.addGroupMember);

router.get("/get-all-groups", 
userAuth,
groupController.getAllGroupMember);

router.get("/:id", 
userAuth,
JoiMiddleWare(groupSchema.getGroupMemberByIDSchema, 'params'),
groupController.getGroupMemberById);

router.put('/update',
userAuth,
groupController.updateGroup)

router.delete('/delete/:id',
userAuth,
JoiMiddleWare(groupSchema.deleteGroup, 'params'),
groupController.deleteGroup)


module.exports = router;