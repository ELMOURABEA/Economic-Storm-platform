const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Project routes
router.get('/', projectController.getAllProjects);
router.get('/statistics', projectController.getProjectStatistics);
router.get('/:id', projectController.getProject);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.post('/:id/analyze', projectController.analyzeProject);

module.exports = router;
