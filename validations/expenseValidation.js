const Joi = require('joi') 

const expenseSchema = {
      createExpenseSchema: Joi.object().keys({
        title: Joi.string().required(),
        amount : Joi.number().required(),
      }),
};

module.exports = expenseSchema;