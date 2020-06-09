const express = require('express');
const router = express.Router();
const controller = require('./site.controller');

router.post('/sites/', controller.createSite);
router.put('/sites/:siteId', controller.updateSite);
router.delete('/sites/:siteId', controller.deleteSite);
router.get('/sites/:siteId', controller.getSiteById);
router.get('/sites/', controller.getAllSites);



module.exports = router;
