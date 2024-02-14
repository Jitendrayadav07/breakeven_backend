const Joi = require('joi') 

const groupSchema = {
      createGroup: Joi.object().keys({
        group_name: Joi.string().required(),
        start_date: Joi.any().required(),
        end_date: Joi.any().required(),
      }),

      addGroupMemberSchema: Joi.object().keys({
        user : Joi.string().required()
      }),

      getGroupMemberByIDSchema: Joi.object().keys({
        id: Joi.number().required() 
      })
};

module.exports = groupSchema;