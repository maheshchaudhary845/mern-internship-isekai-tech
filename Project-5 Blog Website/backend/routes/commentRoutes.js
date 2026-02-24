const express = require('express');
const { addComment, deleteComment, getCommentsByPost } = require('../controllers/commentControllers');
const {auth} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', auth, addComment);
router.get('/post/:id', getCommentsByPost);
router.delete('/:id', auth, deleteComment);

module.exports = router;