const Category = require("../models/Category");
const sequelize = require("../config/db")
const Response = require("../classes/Response");

const createCategory = async (req,res) =>{
    try{
        let category = await Category.create(req.body)
        res.status(201).send(Response.sendResponse(true, category, null, 201));
    }catch(err){
        // console.log("err",err)
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getAllCategory = async (req,res) =>{
    try{
        let categoryData = await Category.findAll({})
       res.status(201).send(Response.sendResponse(true, categoryData, null, 201));
    }catch(err){
        console.log("err", err);
        return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
}

const getCategoryById = async (req,res) =>{
    try{
        let categoryData = await Category.findOne({where : {id : req.params.id}})
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
