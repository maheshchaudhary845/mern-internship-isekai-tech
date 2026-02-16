const express = require('express');
const { getUsers, createUser, loginUser } = require('../controllers/userControllers');

const router = express.Router();

router.get('/', getUsers);
router.post('/add', createUser);
router.post('/login', loginUser);

module.exports = router;