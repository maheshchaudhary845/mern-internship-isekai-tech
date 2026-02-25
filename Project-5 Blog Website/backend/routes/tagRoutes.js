const express = require('express');
const { getAllTags, getPostsByTag, createTag, deleteTag } = require('../controllers/tagControllers');

const router = express.Router();

router.get('/', getAllTags);
router.get('/:slug/posts', getPostsByTag);
// admin routes
router.post('/', createTag);
router.delete('/:id', deleteTag);

module.exports = router;