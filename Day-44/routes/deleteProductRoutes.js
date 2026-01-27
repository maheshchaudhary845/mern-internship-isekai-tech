const express = require('express');
const deleteProductControllers = require('../controller/deleteProductControllers')

const route = express.Router();

route.get('/:id', deleteProductControllers.getDeleteProduct);

module.exports = route;