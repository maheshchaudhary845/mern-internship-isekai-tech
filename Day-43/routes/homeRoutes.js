const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers')

router.get('/', homeControllers.getHomePage)

module.exports = router;