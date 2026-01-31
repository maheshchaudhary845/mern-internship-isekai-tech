const joi = require('joi')

exports.userValidateSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required()
})