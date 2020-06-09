const express = require('express');
const router = express.Router();
const controller = require('./assets.controller');

router.post('/assets/', controller.createAssets);


module.exports = router;
