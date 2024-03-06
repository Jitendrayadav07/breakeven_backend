const Joi = require('joi') 

const categorySchema = {
      createSubCategorySchema: Joi.object().keys({
        sub_category_name: Joi.string().required(),
        category_id : Joi.number().required(),
      }),

      getSubCategoryByIDSchema : Joi.object().keys({
        id: Joi.number().required(),
      }),
};

module.exports = categorySchema;