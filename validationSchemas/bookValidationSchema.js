const Joi = require('joi');

const regExpTitle = new RegExp(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/);
const regExpText = new RegExp(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);

const bookSchema = Joi.object({
  title: Joi.string().pattern(regExpTitle, ' ').max(50).required().messages({
    'string.pattern.name': '"title" must only contain alpha-numeric characters',
  }),
  author: Joi.string().pattern(regExpText, ' ').min(3).max(50).required().messages({
    'string.pattern.name': '"author" must only contain letters',
  }),
  genre: Joi.string().pattern(regExpText, ' ').min(3).max(20).required().messages({
    'string.pattern.name': '"genre" must only contain letters',
  }),
  read: Joi.boolean().required(),
});

const queryBookSchema = Joi.object({
  title: Joi.string().pattern(regExpTitle, '').max(50),
  author: Joi.string().pattern(regExpText, '').min(3).max(50),
});

module.exports.bookSchema = bookSchema;
module.exports.queryBookSchema = queryBookSchema;
