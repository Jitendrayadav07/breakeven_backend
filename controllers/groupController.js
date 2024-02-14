const Group = require("../models/Group");
const User = require("../models/User");
const GroupUserMapping = require("../models/GroupUserMapping")
const AddGroupMember = require("../models/GroupMember")
const Response = require("../classes/Response");
const sequelize = require("../config/db")
const { Op, QueryTypes } = require("sequelize");

const createGroup = async (req, res) => {
    try {
        let { group_name ,start_date ,end_date} = req.body;
        let createdBy = req.user.id;
        let group = await Group.create({
            group_name: group_name,
            createdby: createdBy,
            start_date : start_date,
            end_date : end_date
        });
        res.status(201).send(Response.sendResponse(true, group, null, 201));
    } catch (err) {
        console.log("err",err)
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const addGroupMember = async (req, res) => {
    try {
        const groupId = req.body.group_id;
        const groupMemberData = req.body.members;
        const addUser = [];

        for (let i = 0; i < groupMemberData.length; i++) {
            const user = groupMemberData[i];
            const existingUser = await AddGroupMember.findOne({ where: { name: user.name, contact_number: user.contact_number } });

            if (!existingUser) {
                const newUser = await AddGroupMember.create({ name: user.name, contact_number: user.contact_number, group_id: groupId });
                addUser.push(newUser);
                //Send message to user to download link application link
            }else{
                //Send message to user meadded (added to Group)
            }
        }

        res.status(201).send(Response.sendResponse(true, addUser, "Members added to group successfully", 201));

    } catch (err) {
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
};

const getAllGroupMember = async (req,res) =>{
    try{
        let groupData = await Group.findAll({})
       res.status(201).send(Response.sendResponse(true, groupData, null, 201));
    }catch(err){
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getGroupMemberById = async (req,res) =>{
    try{
        let groupData = await Group.findOne({where : {id : req.params.id}})
       res.status(201).send(Response.sendResponse(true, groupData, null, 201));
    }catch(err){
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}


module.exports = {
    createGroup,
    addGroupMember,
    getGroupMemberById,
    getAllGroupMember
}
