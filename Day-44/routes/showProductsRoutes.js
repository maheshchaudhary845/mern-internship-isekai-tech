const express = require('express');
const showProductsControllers = require('../controller/showProductsControllers')

const route = express.Router();

route.get('/', showProductsControllers.getShowProductsPage);

module.exports = route;