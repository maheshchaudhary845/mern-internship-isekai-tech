const express = require('express')
const usersControllers = require("../controllers/usersControllers");

const route = express.Router();

route.post("/add", usersControllers.createUser);
route.put('/:id', usersControllers.updateUser)

module.exports = route;