const express = require('express');
const productsControllers = require('../controllers/productsControllers')

const router = express.Router();

router.get('/', productsControllers.getProducts)
router.post('/add', productsControllers.createProduct)
router.get('/:id', productsControllers.getProduct)
router.put('/:id', productsControllers.updateProduct)
router.delete('/:id', productsControllers.deleteProduct)

module.exports = router;