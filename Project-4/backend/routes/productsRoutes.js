const express = require('express');
const productsControllers = require('../controllers/productsControllers')

const router = express.Router();

router.get('/', productsControllers.getProducts)
router.post('/add', productsControllers.createProduct)

module.exports = router;