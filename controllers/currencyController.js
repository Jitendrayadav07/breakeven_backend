const db = require("../config/db.config")
const Response = require("../classes/Response");
const { Op, QueryTypes } = require("sequelize");

const getCurrencyUnits = async (req, res) => {
    try {
        let currency_data = await sequelize.query(`Select * From Currency`, { type: QueryTypes.SELECT })
        return res.status(200).send(Response.sendResponse(true, currency_data, "Success", 200));
    } catch (error) {
        // console.log(error);
        return res.status(500).send(Response.sendResponse(false, null, error, 500));
    }
}


module.exports = {
    getCurrencyUnits,
}
