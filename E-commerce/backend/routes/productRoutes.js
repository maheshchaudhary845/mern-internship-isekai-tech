const express = require('express');
const {getProducts, createProduct, updateProduct, deleteProduct, getProductById, getProductsBySeller} = require('../controllers/productControllers');
const {auth, roleAuth} = require('../middlewares/auth')

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/seller', getProductsBySeller)
router.post('/add', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;