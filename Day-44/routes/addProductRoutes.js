const express = require('express');
const addProductControllers = require('../controller/addProductControllers');

const routes = express.Router();

routes.get('/', addProductControllers.getAddProductPage)

routes.post('/add', addProductControllers.addProduct)

module.exports = routes;