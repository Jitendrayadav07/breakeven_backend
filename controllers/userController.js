const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendmail");
const { Op, QueryTypes } = require("sequelize");
const APPROVE_STATUS = require("../constants/approve.constant");
const Response = require("../classes/Response");
const { JWT_SECRET } = require("../config/jwtTokenKey");
const db = require("../config/db.config");
const http = require('http');
const qs = require('querystring');
require('dotenv').config();
//New User Register

async function generateOTP(phone_number, req, res) {
  const apiHost = process.env.API_HOST;
  const apiPath = process.env.API_PATH;
  let options = {
    "method": "GET",
    "hostname": apiHost,
    "port": null,
    "path": `${apiPath}/SMS/${phone_number}/AUTOGEN/test1`,
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    }
  };

  return new Promise((resolve, reject) => {
    let req = http.request(options, function (res) {
      let chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        let body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });

    req.write(qs.stringify({}));
    req.end();
  });
}

const signUp = async (req, res) => {
  try {
    let {name , email, phone_number } = req.body;

    if(phone_number.length != '13'){
      return res.status(500).send(Response.sendResponse(false,null,"Provide Correct Phone Number",500));
    }

    let userNumber = await db.user.findOne({where:{phone_number:phone_number}});

    if(!userNumber){
      const userData = {
        name : name,
        phone_number: phone_number,
        email : email,
        is_registered : 1
      };

      await db.user.create(userData);
    }else if(userNumber.is_registered === 0){
      await db.user.update({ is_registered: 1 }, { where: { id: userNumber.id } });
    }
    
    let otp = await generateOTP(phone_number);

    res.status(201).send(Response.sendResponse(true, APPROVE_STATUS.USER_CREATED, null, 201));
  } catch (err) {
    console.log("err", err);
    return res.status(500).send(Response.sendResponse(false, null, err, 500));
  }
};

const verifyToken = async (req,res) => {
  try {
      const result = jwt.verify(req.body.token,JWT_SECRET);
      return res.status(200).send(Response.sendResponse(true, '', "Token is Verified Successfully", 200));
  } catch (err) {
      return Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR);
  }
};

//User Login 
const verifyOtp = async (req, res) => {
  try {
      const phone_number = req.body.phone_number
      const otp = req.body.otp

      let userOtp = await db.user.findOne({ where: { phone_number: phone_number } });

      let verifiedOtp = await verifiedOTP(otp,phone_number);
      let jsonresponse = JSON.parse(verifiedOtp)
      let otpResponse = jsonresponse.Details

      const data1 = {
        otpResponse : otpResponse,
      }
      if(jsonresponse.Status != 'Error'){
            const token = jwt.sign({phone_number: userOtp.phone_number},JWT_SECRET,{ expiresIn: "24h" });
            data1.token = token;
            res.status(200).send(Response.sendResponse(true, data1, null, 200));
      }else{
        res.status(200).send(Response.sendResponse(false, data1, null, 400));
      }

  } catch (err) {
      return Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR);
  }
}

async function verifiedOTP(otp, phone_number, req, res) {
  const apiHost = process.env.API_HOST;
  const apiPath = process.env.API_PATH;
  const data = `${apiPath}/SMS/VERIFY3/${phone_number}/${otp}`
  let options = {
    "method": "GET",
    "hostname": apiHost,
    "port": null,
    "path": data,
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    }
  };
  return new Promise((resolve, reject) => {
    let req = http.request(options, function (res) {
      let chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        let body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });

    req.write(qs.stringify({}));
    req.end();
  });
}

// const updateUserData = async (req , res) =>{
//   try{
//     let { phone_number , id } = req.body
//     let userData = await db.user.findOne({where : { phone_number : phone_number}})
//     if(!userData){
//       //Update 
//       await db.user.update(phone_number, { where: { id: id } })
//     }else{
//       let userDataExit = await db.user.findOne({where : { id : id}})

//       let mergedData = {
//         name: userDataExit.name,
//         phone_number: userData.phone_number,
//         email: userDataExit.email,
//         password: userDataExit.password,
//         is_registered: 1
//       };
//       await db.user.update(mergedData, { where: { id: userData.id } });
//       // await db.user.destroy({ where: { id: userDataExit.id } })
//     }
//     res.status(200).send(Response.sendResponse(true, userData, 200));
//   }catch(err){
//     console.error("Error logging in:", err);
//     res.status(500).send("An error occurred while logging in.");
//   }
// }

const updateUserData = async (req,res) =>{
  try{
    let user_data = await db.user.update(req.body, {where: {id : req.body.id}})
    res.status(201).send(Response.sendResponse(true, user_data, null, 201));
  }catch(err){
    console.log("err", err);
    return res.status(500).send(Response.sendResponse(false, null, err, 500));
  }
}

const getAllUserData = async (req,res) =>{
  try{
    let user_data = await db.user.findAll()
    res.status(201).send(Response.sendResponse(true, user_data, null, 201));
  }catch(err){
    console.log("err", err);
    return res.status(500).send(Response.sendResponse(false, null, err, 500));
  }
}

module.exports = {
  signUp,
  verifyToken,
  verifyOtp,
  updateUserData,
  getAllUserData
};
