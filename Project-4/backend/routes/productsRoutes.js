const express = require('express');
const productsControllers = require('../controllers/productsControllers')
const {auth, roleAuth} = require('../middlewares/auth');

const router = express.Router();

router.get('/', productsControllers.getProducts)
router.post('/add', auth, roleAuth("seller"), productsControllers.createProduct)
router.get('/product/:id', productsControllers.getProduct)
router.put('/:id', auth, roleAuth("seller"), productsControllers.updateProduct)
router.delete('/:id', auth, roleAuth("seller"), productsControllers.deleteProduct)

// get products for particular seller
router.get('/seller', auth, roleAuth("seller"), productsControllers.getSellerProducts)

module.exports = router;