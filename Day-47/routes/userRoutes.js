const express = require('express')
const userControllers = require('../controllers/userControllers');
const validate = require('../middlewares/validate');
const {userValidateSchema} = require('../schema/user.validate')

const route = express.Router();

route.post('/add', validate(userValidateSchema), userControllers.createUser);

module.exports = route;