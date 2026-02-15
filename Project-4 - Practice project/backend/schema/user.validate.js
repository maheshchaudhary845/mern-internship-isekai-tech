const joi = require('joi');

exports.userValidateSchema = joi.object({
    name: joi.string().min(3).max(30).pattern(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
    role: joi.string().required()
})