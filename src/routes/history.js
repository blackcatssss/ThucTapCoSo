const express = require('express');
const router = express.Router();

const historyControllers = require('../app/controllers/historyControllers')

router.get('/', historyControllers.index);

module.exports = router
