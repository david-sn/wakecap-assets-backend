const express = require('express');
const router = express.Router();
const controller = require('./client.controller');

router.post('/clients/', controller.createClient);
router.put('/clients/:clientId', controller.updateClient);
router.delete('/clients/:clientId', controller.deleteClient);
router.get('/clients/:clientId', controller.getClientById);
router.get('/clients/', controller.getAllClients);



module.exports = router;
