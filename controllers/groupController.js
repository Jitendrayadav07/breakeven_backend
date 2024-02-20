const Response = require("../classes/Response");
const db = require("../config/db.config")
const { Op, QueryTypes, where } = require("sequelize");

const createGroup = async (req, res) => {
    try {
        let { name , type_id} = req.body;
        let createdBy = req.user.id;

        // const groupType = await db.group_type.findOne({ where: { group_type: { [Op.eq]: req.body.type_id } } })

        // if (!groupType) return res.status(400).send(Response.sendResponse(true, null, "No Group Type Present", 400));

        // req.body.type_id = groupType.id

        let group = await db.group.create({
            name: name,
            createdby: createdBy,
            type_id: type_id
        });
        res.status(201).send(Response.sendResponse(true, group, null, 201));
    } catch (err) {
        console.log("err", err)
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const accessContactApi = async (req, res) => {
    try {
        const groupData = req.body.members;
        const addUser = [];
        for (let i = 0; i < groupData.length; i++) {
            const user = groupData[i];
            const existingUser = await db.access_contact.findOne({ where: { contact_number: user.contact_number } });

            if (!existingUser) {
                const newUser = await db.access_contact.create({ name: user.name, contact_number: user.contact_number });
                addUser.push(newUser);
            } else {

            }
        }
        res.status(201).send(Response.sendResponse(true, groupData, null, 201));
    } catch (err) {
        // console.log("err", err);
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
            const existingUser = await db.group_member.findOne({ where: { contact_number: user.contact_number } });

            if (!existingUser) {
                const newUser = await db.group_member.create({ name: user.name, contact_number: user.contact_number, email: user.email, group_id: groupId });
                addUser.push(newUser);
                //Send message to user to download link application link
            } else {
                //Send message to user meadded (added to Group)
            }
        }

        res.status(201).send(Response.sendResponse(true, addUser, "Members added to group successfully", 201));

    } catch (err) {
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
};

const getAllGroupMember = async (req, res) => {
    try {
        let groupData = await db.group.findAll({})
        res.status(201).send(Response.sendResponse(true, groupData, null, 201));
    } catch (err) {
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getGroupMemberById = async (req, res) => {
    try {
        let groupData = await db.group.findOne({ where: { id: req.params.id } })
        res.status(201).send(Response.sendResponse(true, groupData, null, 201));
    } catch (err) {
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const updateGroup = async (req, res) => {
    try {
        let updateGroup = await db.group.update(req.body, { where: { id: req.body.id } })
        res.status(201).send(Response.sendResponse(true, updateGroup, "Group Has Been Updated", 201));
    } catch (err) {
        console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const deleteGroup = async (req, res) => {
    try {
        let deleteGroup = await db.group.destroy({ where: { id: req.params.id } })
        res.status(201).send(Response.sendResponse(true, deleteGroup, "Group Has Been Deleted", 201));
    } catch (err) {
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

module.exports = {
    createGroup,
    addGroupMember,
    getGroupMemberById,
    getAllGroupMember,
    updateGroup,
    deleteGroup,
    accessContactApi
}
