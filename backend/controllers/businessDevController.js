const BusinessDevelopment = require('../models/BusinessDevelopment');
const { analyzeBusinessData } = require('../config/gemini');

// Get all opportunities
exports.getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await BusinessDevelopment.findAll();
    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single opportunity
exports.getOpportunity = async (req, res) => {
  try {
    const opportunity = await BusinessDevelopment.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        error: 'Opportunity not found'
      });
    }
    res.json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create opportunity
exports.createOpportunity = async (req, res) => {
  try {
    const opportunity = await BusinessDevelopment.create(req.body);
    res.status(201).json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update opportunity
exports.updateOpportunity = async (req, res) => {
  try {
    const opportunity = await BusinessDevelopment.update(req.params.id, req.body);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        error: 'Opportunity not found'
      });
    }
    res.json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete opportunity
exports.deleteOpportunity = async (req, res) => {
  try {
    const deleted = await BusinessDevelopment.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Opportunity not found'
      });
    }
    res.json({
      success: true,
      message: 'Opportunity deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get pipeline
exports.getPipeline = async (req, res) => {
  try {
    const pipeline = await BusinessDevelopment.getPipeline();
    res.json({
      success: true,
      data: pipeline
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Analyze opportunity with AI
exports.analyzeOpportunity = async (req, res) => {
  try {
    const opportunity = await BusinessDevelopment.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        error: 'Opportunity not found'
      });
    }

    const analysis = await analyzeBusinessData(opportunity, 'development');
    
    if (!analysis.success) {
      return res.status(503).json({
        success: false,
        error: 'AI analysis service unavailable',
        details: analysis.error,
        opportunity: opportunity
      });
    }
    
    res.json({
      success: true,
      opportunity: opportunity,
      analysis: analysis.text,
      aiSuccess: analysis.success
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
