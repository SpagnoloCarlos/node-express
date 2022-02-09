const Joi = require('joi');

const regExpName = new RegExp (/^[a-zA-Z]+\s{0,1}[a-zA-Z]*$/);
const regExpPassword = new RegExp (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/);
//const regExpEmail = new RegExp (/^[\w\.\-\$]{4,20}\@[\w\.\-]{3,10}\.[a-z]{2,5}$/);
const regExpAddress = new RegExp (/^[a-zA-Z]{2,20}(\s[a-zA-Z]*\S){0,3}\d+$/);
const regExpPhone = new RegExp (/^\d+$/);

const userSchema = Joi.object({
  firstName: Joi.string().pattern(regExpName, " ").min(3).max(15).required().messages({
    'string.pattern.name': '"firstname" must only contain letters and up to two names'
  }),
  lastName: Joi.string().pattern(regExpName, " ").max(15).required().messages({
    'string.pattern.name': '"lastname" must only contain letters and up to two last names'
  }),
  userName: Joi.string().alphanum().min(3).max(10).required().required(),
  password: Joi.string().pattern(regExpPassword, " ").required().messages({
    'string.pattern.name': '"password" must contain: \n'+
    '- At least one lowercase letter\n'+
    '- At least one capital letter\n'+
    '- At least one number\n'+
    '- A length of 8 to 16 characters'
  }),
  email: Joi.string().email().required(),
  address: Joi.string().pattern(regExpAddress, " ").max(40).required().messages({
    'string.pattern.name': '"address" must contain the names and street number'
  }),
  phone: Joi.string().pattern(regExpPhone, " ").min(9).max(12).required().messages({
    'string.pattern.name': '"phone" must only contain numbers'
  })
});

module.exports = userSchema;