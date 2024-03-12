const db = require("../config/db.config")
const Response = require("../classes/Response");
const { QueryTypes } = require("sequelize");

const createExpense = async (req,res) =>{
    try{
        let { group_id,title,gross_amount,currency_id,expense_category_id,date} = req.body
        let createdBy = req.user.id;

        let groupUsers  = await db.group_user_mapping.findAll({where : {group_id : group_id}})

        if (!groupUsers || groupUsers.length === 0) {
            return res.status(400).send(Response.sendResponse(false, null, "Invalid group_id", 400));
        }

        let expObj = {
            group_id : group_id,
            created_by : createdBy,
            title : title,
            gross_amount : gross_amount,
            currency_id : currency_id,
            expense_category_id : expense_category_id,
            date : date
        }

        let expenseDat = await db.expenses.create(expObj)

        let totalUsers = groupUsers.length;
        let dueAmount = gross_amount / totalUsers;

        for (let i = 0; i < groupUsers.length; i++) {
            let user_id = groupUsers[i].user_id;
           
            if (user_id === createdBy) {
                continue;
            }

            let percentage = 100 / totalUsers;
            let userWisePer = percentage.toFixed(2)
            let individualDueAmount = dueAmount.toFixed(2);

            await db.expense_user_mapping.create({
                expense_id: expenseDat.id,
                user_id: user_id,
                share_percentage : userWisePer,
                due_amount: individualDueAmount,
                is_settled: 0,
                to_user_id: createdBy
            });
        }

        res.status(201).send(Response.sendResponse(true, expenseDat, null, 201));
    }catch(err){
        // console.log("err",err)
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getUserExpenseData = async (req, res) => {
    try {
        let groupId = req.body.group_id;
        let createdBy = req.user.id;
        let userExpenseData = await db.sequelize.query(
            `SELECT be.id, SUM(eum.due_amount), eum.user_id, eum.to_user_id 
            FROM break_even.expenses be 
            LEFT JOIN break_even.expense_user_mapping eum 
            INNER JOIN break_even.users ur ON ur.id = eum.user_id
            ON be.id = eum.expense_id 
            WHERE group_id = ${groupId} 
            GROUP BY eum.user_id,eum.to_user_id;`,
            { type: QueryTypes.SELECT }
        );

        let filteredData = {};

        userExpenseData.forEach(item => {
            if (!filteredData[item.to_user_id]) {
                filteredData[item.to_user_id] = [];
            }
            filteredData[item.to_user_id].push(item);
        });
        
        for (let userID in filteredData) {
            console.log("userID!@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",userID)
            let userData1 = filteredData[userID];
            console.log("userData1@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",userData1)
            for (let toUserId2 in filteredData) {
                console.log("toUserId2####################################################################",toUserId2)
                let userData2 = filteredData[toUserId2];
                console.log("userData2$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",userData2)
                userData2.forEach(user => {
                    console.log("user%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",user)
                    if (user.user_id === parseInt(userID)) {
                        console.log("Matching user_id:", user);

                        // Subtracting SUM(eum.due_amount) values
                        userData1.forEach(user1 => {
                            if (user1.user_id === parseInt(toUserId2)) {
                                user1['SUM(eum.due_amount)'] -= user['SUM(eum.due_amount)'];
                            }
                        });
                    }
                });
            }
        }

        // Logging remaining values
        for (let toUserId in filteredData) {
            let userData = filteredData[toUserId];
            console.log("Remaining for toUserId", toUserId, ":", userData);
        }


        res.status(201).send(Response.sendResponse(true, filteredData, null, 201));
    } catch (err) {
        console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getUserExpenseMappingData = async(req,res) =>{
    try{
        let userGroupData = await db.expense_user_mapping.findAll({})
        res.status(201).send(Response.sendResponse(true, userGroupData , null, 201));
    }catch(err){
        console.log("err",err)
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

module.exports = {
    createExpense,
    getUserExpenseData,
    getUserExpenseMappingData
}
