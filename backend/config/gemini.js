const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Get the Gemini model
const getGeminiModel = (modelName = null) => {
  const model = modelName || process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  return genAI.getGenerativeModel({ model });
};

// Generate content with Gemini
const generateContent = async (prompt, options = {}) => {
  try {
    const model = getGeminiModel(options.model);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return {
      success: true,
      text: response.text(),
      data: response
    };
  } catch (error) {
    console.error('Gemini AI Error:', error.message);
    return {
      success: false,
      error: error.message,
      text: null
    };
  }
};

// Generate content with chat context
const generateChat = async (history, message, options = {}) => {
  try {
    const model = getGeminiModel(options.model);
    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: options.maxTokens || 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return {
      success: true,
      text: response.text(),
      history: await chat.getHistory()
    };
  } catch (error) {
    console.error('Gemini Chat Error:', error.message);
    return {
      success: false,
      error: error.message,
      text: null
    };
  }
};

// Analyze business data with AI
const analyzeBusinessData = async (data, analysisType = 'general') => {
  const prompts = {
    general: `Analyze this business data and provide insights: ${JSON.stringify(data)}`,
    marketing: `Analyze this marketing campaign data and provide strategic recommendations: ${JSON.stringify(data)}`,
    economic: `Analyze this economic project data and provide performance insights: ${JSON.stringify(data)}`,
    development: `Analyze this business development data and provide growth recommendations: ${JSON.stringify(data)}`
  };

  const prompt = prompts[analysisType] || prompts.general;
  return await generateContent(prompt);
};

module.exports = {
  getGeminiModel,
  generateContent,
  generateChat,
  analyzeBusinessData
};
