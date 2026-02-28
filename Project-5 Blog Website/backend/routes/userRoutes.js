const express = require('express');
const {getUsers, getCurrentUser} = require('../controllers/userControllers');
const {auth} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/me',auth, getCurrentUser);

module.exports = router;