const Joi = require('joi') 

const userSchema = {
    signUpUser: Joi.object().keys({ 
        email: Joi.string().required(),
        password: Joi.string(),
      }),

      login: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
};

module.exports = userSchema;