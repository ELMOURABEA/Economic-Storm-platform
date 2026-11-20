const { generateContent, generateChat, analyzeBusinessData } = require('../config/gemini');

// Generate AI content
exports.generateContent = async (req, res) => {
  try {
    const { prompt, model } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    const result = await generateContent(prompt, { model });
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      data: {
        text: result.text,
        prompt: prompt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Chat with AI
exports.chat = async (req, res) => {
  try {
    const { message, history, model } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const result = await generateChat(history || [], message, { model });
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      data: {
        response: result.text,
        history: result.history
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Analyze data with AI
exports.analyzeData = async (req, res) => {
  try {
    const { data, analysisType } = req.body;
    
    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Data is required'
      });
    }

    const result = await analyzeBusinessData(data, analysisType || 'general');
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      data: {
        analysis: result.text,
        type: analysisType || 'general'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get business insights
exports.getBusinessInsights = async (req, res) => {
  try {
    const { topic } = req.query;
    
    const prompt = topic 
      ? `Provide business insights about: ${topic}` 
      : 'Provide general business insights for economic projects, marketing, and business development';

    const result = await generateContent(prompt);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      data: {
        insights: result.text,
        topic: topic || 'general business'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Generate report
exports.generateReport = async (req, res) => {
  try {
    const { title, data, reportType } = req.body;
    
    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Data is required for report generation'
      });
    }

    const prompt = `Generate a comprehensive ${reportType || 'business'} report titled "${title || 'Business Report'}" based on the following data: ${JSON.stringify(data)}. Include executive summary, key findings, recommendations, and conclusions.`;

    const result = await generateContent(prompt);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      data: {
        report: result.text,
        title: title || 'Business Report',
        type: reportType || 'business'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
