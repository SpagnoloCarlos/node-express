const Joi = require('joi');

const regExpName = new RegExp(/^[a-zA-Z]{2,}(\s[a-zA-Z]{2,})*$/);
const regExpPassword = new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])[a-zA-Z\d]{8,16}$/);
const regExpAddress = new RegExp(/^([a-zA-Z]{2,15})(\s[a-zA-Z]{1,15})*\s(\d{1,4})$/);

const userSchema = Joi.object({
  firstName: Joi.string().pattern(regExpName, ' ').min(2).max(20).required().messages({
    'string.pattern.name': '"firstname" must only contain letters and up to two names',
  }),
  lastName: Joi.string().pattern(regExpName, ' ').min(2).max(20).required().messages({
    'string.pattern.name': '"lastname" must only contain letters and up to two last names',
  }),
  userName: Joi.string().alphanum().min(3).max(15).required(),
  password: Joi.string().pattern(regExpPassword, ' ').required().messages({
    'string.pattern.name': '"password" must contain: \n'+
    '- At least one lowercase letter\n'+
    '- At least one capital letter\n'+
    '- At least one number\n'+
    '- A length of 8 to 16 characters\n'+
    '- No special characters or whitespace',
  }),
  email: Joi.string().email().required(),
  address: Joi.string().pattern(regExpAddress, ' ').max(50).required().messages({
    'string.pattern.name': '"address" must contain the names and street number',
  }),
  phone: Joi.number().min(1000000000).max(999999999999).required().messages({
    'number.name': '"phone" must only contain numbers',
    'number.min': '"phone" must contain between 10 and 12 characters',
    'number.max': '"phone" must contain between 10 and 12 characters',
  }),
});

const userLoginSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15).required(),
  password: Joi.string().pattern(regExpPassword, ' ').required().messages({
    'string.pattern.name': '"password" must contain: \n'+
    '- At least one lowercase letter\n'+
    '- At least one capital letter\n'+
    '- At least one number\n'+
    '- A length of 8 to 16 characters\n'+
    '- No special characters or whitespace',
  }),
});

const queryUserSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15).required(),
});

module.exports.userSchema = userSchema;
module.exports.userLoginSchema = userLoginSchema;
module.exports.queryUserSchema = queryUserSchema;
