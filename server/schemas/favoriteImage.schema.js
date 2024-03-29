const Joi = require("joi");

const favoriteImageSchema = Joi.array().items(
  Joi.object({
    title: Joi.string().required(),
    link: Joi.string().required(),
  })
);

module.exports = { favoriteImageSchema };
