const Response = require("../classes/Response");
const db = require("../config/db.config")
const { Op, QueryTypes, where } = require("sequelize");

const createGroup = async (req, res) => {
    try {
        let { name , type_id} = req.body;
        let createdBy = req.user.id;
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
        let groupData = req.body.members;
        let addUser = [];
        groupData.forEach(async(element) => {
            let user = element
                let newUser = await db.access_contact.create({ name: user.name, phone_number: user.phone_number });
                addUser.push(newUser);
        });

        res.status(201).send(Response.sendResponse(true, groupData, null, 201));
    } catch (err) {
        console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const addGroupMember = async (req, res) => {
    try {
        let groupId = req.body.group_id;
        let groupMemberData = req.body.members;
        let addUser = [];

        for(let i = 0 ; i < groupMemberData.length ; i++){
            const user = groupMemberData[i];
            const userPresent = await db.user.findOne({ where: { 
                phone_number: user.phone_number
            }  });

            if(userPresent){
                // Present 
                const userId = userPresent.id;
                const userIdExit = await db.group_user_mapping.findOne({ where: { 
                    group_id: groupId,
                    user_id: userId
                } });

                if(!userIdExit) {
                    await db.group_user_mapping.create({
                        group_id : groupId,
                        user_id : userId
                    });
                }
            }else{
                // Not Present 
                const newUser = await db.user.create({ name: user.name, phone_number: user.phone_number, group_id: groupId });
                await db.group_user_mapping.create({
                    group_id : groupId,
                    user_id : newUser.id
                })
                addUser.push(newUser);
            }
        }
        res.status(201).send(Response.sendResponse(true, addUser, null, 201));
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
        let groupData = await db.group.findOne(
            { 
                where: { id: req.params.id } ,
                attributes:["id","name"],
                include : [
                    {
                        model : db.group_user_mapping,
                        attributes : ["user_id"],
                        include: [
                            {
                                model: db.user,
                                attributes: ["name", "phone_number"]
                            }
                        ]
                    },
                ]
            }
        )
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
    accessContactApi,
    getGroupMemberById,
    getAllGroupMember,
    updateGroup,
    deleteGroup,
    addGroupMember
}
