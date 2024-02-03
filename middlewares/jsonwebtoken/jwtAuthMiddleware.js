const jwt = require("jsonwebtoken");
const Response = require("../classes/Response");
const { JWT_SECRET } = require("../../config/jwtTokenKey");

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) 
      return res.status(401).send(Response.sendResponse(false, null, 'A token is required for authentication',401));
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send(Response.sendResponse(false, null, 'Invalid Token',401));
    }

    return next();
};

module.exports = verifyToken;
