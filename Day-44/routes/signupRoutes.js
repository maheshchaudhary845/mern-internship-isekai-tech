const express = require('express');
const signupControllers = require('../controller/signupControllers')

const routes = express.Router();

routes.get('/', (req, res)=>{
    res.render('signup')
})

routes.post('/', signupControllers.getSignupPage);


module.exports = routes;