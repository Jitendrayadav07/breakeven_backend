const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/jwtTokenKey");
const Response = require("../../classes/Response");
const { Op, QueryTypes } = require("sequelize");
const db = require("../../config/db.config")

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) 
    return res.status(401).send(Response.sendResponse(false, null, 'A token is required for authentication',401));
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user_data = await db.sequelize.query(
      `SELECT id,email FROM users where email = '${decoded.email}'`,
      { type: QueryTypes.SELECT }
    );
    req.user = user_data[0];
    console.log("req.user",req.user)
  } catch (err) {
    return res.status(401).send(Response.sendResponse(false, null, 'Invalid Token',401));
  }

  return next();
};

module.exports = verifyToken;
