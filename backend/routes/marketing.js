const express = require('express');
const router = express.Router();
const marketingController = require('../controllers/marketingController');

// Marketing campaign routes
router.get('/', marketingController.getAllCampaigns);
router.get('/metrics', marketingController.getPerformanceMetrics);
router.get('/:id', marketingController.getCampaign);
router.post('/', marketingController.createCampaign);
router.put('/:id', marketingController.updateCampaign);
router.delete('/:id', marketingController.deleteCampaign);
router.post('/:id/analyze', marketingController.analyzeCampaign);

module.exports = router;
