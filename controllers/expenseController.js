const Expense = require("../models/Expense");
const sequelize = require("../config/db")
const Response = require("../classes/Response");

const createExpense = async (req,res) =>{
    try{
        let category = await Expense.create(req.body)
        res.status(201).send(Response.sendResponse(true, category, null, 201));
    }catch(err){
        // console.log("err",err)
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}



module.exports = {
    createExpense,
}
