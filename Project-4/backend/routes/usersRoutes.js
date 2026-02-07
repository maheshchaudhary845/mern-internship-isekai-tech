const express = require('express')
const usersControllers = require("../controllers/usersControllers");
const {validate} = require('../middlewares/validate');
const {userValidateSchema} = require('../schema/user.validate')
const {auth, roleAuth} = require('../middlewares/auth')

const route = express.Router();

route.get("/", usersControllers.getUsers);
route.post("/add", validate(userValidateSchema), usersControllers.createUser);
route.post("/login", usersControllers.loginUser)
route.put('/:id', auth, roleAuth("admin"), usersControllers.updateUser);
route.delete('/:id', auth, roleAuth("admin"), usersControllers.deleteUser);

module.exports = route;