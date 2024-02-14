const Joi = require('joi') 

const categorySchema = {
      createCategorySchema: Joi.object().keys({
        category_name: Joi.string().required(),
      }),

      getCategoryByIDSchema : Joi.object().keys({
        id: Joi.number().required(),
      }),
};

module.exports = categorySchema;