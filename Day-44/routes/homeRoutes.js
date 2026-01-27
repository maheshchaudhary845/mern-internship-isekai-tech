const express = require('express')
const routes = express.Router();
const homeControllers = require('../controller/homeControllers')

routes.get('/', homeControllers.getHomePage)

module.exports = routes;