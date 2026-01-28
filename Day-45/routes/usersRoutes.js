const express = require('express')
const usersControllers = require("../controllers/usersControllers");

const route = express.Router();

route.post("/add", usersControllers.createUser);

module.exports = route;