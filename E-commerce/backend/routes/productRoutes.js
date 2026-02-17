const express = require('express');
const {getProducts, createProduct, updateProduct, deleteProduct} = require('../controllers/productControllers');
const {auth, roleAuth} = require('../middlewares/auth')

const router = express.Router();

router.get('/', getProducts);
router.post('/add', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;