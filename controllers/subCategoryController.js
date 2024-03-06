const db = require("../config/db.config")
const Response = require("../classes/Response");

const createSubCategory = async (req,res) =>{
    try{
        let category = await db.sub_category.create(req.body)
        res.status(201).send(Response.sendResponse(true, category, null, 201));
    }catch(err){
        // console.log("err",err)
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getAllSubCategory = async (req,res) =>{
    try{
        let categoryData = await db.sub_category.findAll({})
        res.status(201).send(Response.sendResponse(true, categoryData, null, 201));
    }catch(err){
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getSubCategoryById = async (req,res) =>{
    try{
        let categoryData = await db.sub_category.findOne({where : {id : req.params.id}})
        res.status(201).send(Response.sendResponse(true, categoryData, null, 201));
    }catch(err){
        // console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

module.exports = {
    createSubCategory,
    getSubCategoryById,
    getAllSubCategory
}
