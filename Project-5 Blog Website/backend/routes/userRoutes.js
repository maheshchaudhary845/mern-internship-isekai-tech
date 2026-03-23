const express = require('express');
const {getUsers, getCurrentUser, updateUser} = require('../controllers/userControllers');
const {auth} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/me',auth, getCurrentUser);
router.put('/update', auth, updateUser);

module.exports = router;