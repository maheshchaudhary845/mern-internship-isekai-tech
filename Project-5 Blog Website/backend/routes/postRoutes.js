const express = require('express');
const {getPosts, createPost, getPostById, updatePost, deletePost} = require('../controllers/postControllers');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/add', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;