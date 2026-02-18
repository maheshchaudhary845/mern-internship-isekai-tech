const express = require('express');
const {getUsers} = require('../controllers/userControllers');
const {auth} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', auth, getUsers);

module.exports = router;