const express = require('express')
const signinControllers = require('../controller/signinControllers')

const route = express.Router();

route.get('/', signinControllers.getSigninPage);

route.post('/', signinControllers.getAuthenticateUser);

module.exports = route;