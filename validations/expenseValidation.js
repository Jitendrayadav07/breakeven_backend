const Joi = require('joi') 

const expenseSchema = {
      createExpenseSchema: Joi.object().keys({
        group_id : Joi.number().required(),
        title: Joi.string().required(),
        gross_amount : Joi.any().required(),
        currency_id : Joi.number(),
        expense_category_id : Joi.number(),
        date : Joi.any(),
      }),

      getUserExpense:Joi.object().keys({
        group_id : Joi.number().required(),
      })
};

module.exports = expenseSchema;