const express = require('express')
const editProductControllers = require('../controller/editProductControllers')

const route = express.Router();

route.get('/:id', editProductControllers.getEditProductPage)
route.post('/:id', editProductControllers.editProduct)

module.exports = route;