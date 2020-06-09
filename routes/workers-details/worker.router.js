const express = require('express');
const router = express.Router();
const controller = require('./worker.controller');

router.post('/workers/', controller.createWorker);
router.put('/workers/:workerId', controller.updateWorker);
router.delete('/workers/:workerId', controller.deleteWorker);
router.get('/workers/:workerId', controller.getWorkerById);
router.get('/workers/', controller.getAllWorkers);



module.exports = router;
