const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// AI routes
router.post('/generate', aiController.generateContent);
router.post('/chat', aiController.chat);
router.post('/analyze', aiController.analyzeData);
router.get('/insights', aiController.getBusinessInsights);
router.post('/report', aiController.generateReport);

module.exports = router;
