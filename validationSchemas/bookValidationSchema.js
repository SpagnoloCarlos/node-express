const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().alphanum().required(),
  author: Joi.string().min(3).max(30).required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
});

module.exports = bookSchema;