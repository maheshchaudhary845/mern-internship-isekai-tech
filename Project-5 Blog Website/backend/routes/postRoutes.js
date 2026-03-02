const express = require('express');
const {getPosts, createPost, updatePost, deletePost, getPostBySlug} = require('../controllers/postControllers');
const {auth} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.post('/add', auth, upload.single('image'), createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;