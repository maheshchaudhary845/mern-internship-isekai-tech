const express = require('express');
const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/userControllers');

const route = express.Router();

route.get('/', getUsers);
route.post('/add', createUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

module.exports = route;