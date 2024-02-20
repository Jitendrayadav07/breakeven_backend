const db = require("../config/db.config")
const Response = require("../classes/Response");

const createCategory = async (req,res) =>{
    try{
        let category = await db.category.create(req.body)
        res.status(201).send(Response.sendResponse(true, category, null, 201));
    }catch(err){
        // console.log("err",err)
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getAllCategory = async (req,res) =>{
    try{
        let categoryData = await db.category.findAll({})
       res.status(201).send(Response.sendResponse(true, categoryData, null, 201));
    }catch(err){
        console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getCategoryById = async (req,res) =>{
    try{
        let categoryData = await db.category.findOne({where : {id : req.params.id}})
       res.status(201).send(Response.sendResponse(true, categoryData, null, 201));
    }catch(err){
        console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

module.exports = {
    createCategory,
    getCategoryById,
    getAllCategory
}
