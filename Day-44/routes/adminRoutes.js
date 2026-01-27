const express = require('express')
const adminControllers = require('../controller/adminControllers');

const route = express.Router();

route.get('/', adminControllers.getAdminPage);
route.get('/edituser/:id', adminControllers.getEditUserPage);
route.post('/edituser/:id', adminControllers.editUser);
route.get('/deleteuser/:id', adminControllers.deleteUser);

module.exports = route;