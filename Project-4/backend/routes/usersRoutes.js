const express = require('express')
const usersControllers = require("../controllers/usersControllers");

const route = express.Router();

route.get("/", usersControllers.getUsers);
route.post("/add", usersControllers.createUser);
route.put('/:id', usersControllers.updateUser);
route.delete('/:id', usersControllers.deleteUser);

module.exports = route;