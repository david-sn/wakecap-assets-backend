const express = require('express');
const router = express.Router();
const controller = require('./report.controller');

router.get(['/report','/report/:siteName'], controller.listReports);
router.get('/report/:siteName/:fileName', controller.readReport);


module.exports = router;
