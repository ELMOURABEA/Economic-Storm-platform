const MarketingCampaign = require('../models/MarketingCampaign');
const { analyzeBusinessData } = require('../config/gemini');

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await MarketingCampaign.findAll();
    res.json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single campaign
exports.getCampaign = async (req, res) => {
  try {
    const campaign = await MarketingCampaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }
    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const campaign = await MarketingCampaign.create(req.body);
    res.status(201).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await MarketingCampaign.update(req.params.id, req.body);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }
    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const deleted = await MarketingCampaign.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }
    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get performance metrics
exports.getPerformanceMetrics = async (req, res) => {
  try {
    const metrics = await MarketingCampaign.getPerformanceMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Analyze campaign with AI
exports.analyzeCampaign = async (req, res) => {
  try {
    const campaign = await MarketingCampaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }

    const analysis = await analyzeBusinessData(campaign, 'marketing');
    
    if (!analysis.success) {
      return res.status(503).json({
        success: false,
        error: 'AI analysis service unavailable',
        details: analysis.error,
        campaign: campaign
      });
    }
    
    res.json({
      success: true,
      campaign: campaign,
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
