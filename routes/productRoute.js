const express = require('express');
const { createProduct, getaProduct, getallProducts, updateProduct, deleteProduct } = require('../controller/productController');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');



router.post('/', authMiddleware, isAdmin, createProduct);
router.get('/:id', getaProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/', getallProducts);

module.exports = router; 