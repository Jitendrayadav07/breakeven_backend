const Joi = require('joi') 

const userSchema = {
    signUpUser: Joi.object().keys({
        name: Joi.string(),
        phone_number: Joi.string().required(),
        email: Joi.string().allow(''),
    }),

    verifyOtp:Joi.object().keys({ 
      phone_number: Joi.number(),
      otp:Joi.number(),
    }),

    verifyToken:Joi.object().keys({ 
      token: Joi.string(),
    }),

    login: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    }),

    userUpdateSchema : Joi.object().keys({
       id: Joi.number(),
       phone_number: Joi.string(),
       email : Joi.string(),
    })
};

module.exports = userSchema;