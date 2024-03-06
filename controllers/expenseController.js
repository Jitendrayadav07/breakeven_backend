const db = require("../config/db.config")
const Response = require("../classes/Response");

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
            let individualDueAmount = dueAmount;

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



module.exports = {
    createExpense,
}
