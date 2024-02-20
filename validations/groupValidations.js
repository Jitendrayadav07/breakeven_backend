const Joi = require('joi') 

const groupSchema = {
      createGroup: Joi.object().keys({
        name: Joi.string().required(),
        type_id : Joi.number().required()
      }),

      getGroupMemberByIDSchema: Joi.object().keys({
        id: Joi.number().required() 
      }),

      deleteGroup: Joi.object().keys({
        id: Joi.number().required() 
      })
};

module.exports = groupSchema;