const express = require('express');
const { getUsers, createUser, loginUser, updateUser, deleteUser } = require('../controllers/userControllers');
const {auth} = require('../middlewares/auth')

const router = express.Router();

router.get('/', auth, getUsers);
router.post('/add', createUser);
router.post('/login', loginUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;