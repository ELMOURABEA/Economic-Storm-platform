const express = require('express');
const router = express.Router();
const businessDevController = require('../controllers/businessDevController');

// Business development routes
router.get('/', businessDevController.getAllOpportunities);
router.get('/pipeline', businessDevController.getPipeline);
router.get('/:id', businessDevController.getOpportunity);
router.post('/', businessDevController.createOpportunity);
router.put('/:id', businessDevController.updateOpportunity);
router.delete('/:id', businessDevController.deleteOpportunity);
router.post('/:id/analyze', businessDevController.analyzeOpportunity);

module.exports = router;
