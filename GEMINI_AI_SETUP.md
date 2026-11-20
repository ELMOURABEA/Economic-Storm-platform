# Google Gemini AI Integration Guide

Complete guide for integrating Google Gemini AI (Gemini 1.5 Flash) with Economic Storm Platform.

## 📋 Overview

The Economic Storm Platform integrates Google's Gemini AI to provide intelligent insights, data analysis, and automated content generation for economic projects, marketing campaigns, and business development.

## 🤖 AI Capabilities

### 1. Business Data Analysis
- Analyze project performance and provide insights
- Evaluate marketing campaign effectiveness
- Assess business development opportunities
- Generate data-driven recommendations

### 2. Content Generation
- Create business reports
- Generate marketing copy
- Draft project proposals
- Write strategic analyses

### 3. Conversational AI
- Interactive chat interface
- Context-aware responses
- Business strategy discussions
- Q&A for business insights

### 4. Automated Insights
- Real-time data interpretation
- Trend analysis
- Performance predictions
- Risk assessments

## 🚀 Quick Start

### Step 1: Get Gemini API Key

1. **Go to Google AI Studio**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Select or create a Google Cloud project
   - Copy the generated API key

3. **Configure in Backend**
   ```bash
   # Edit backend/.env
   GEMINI_API_KEY=your_api_key_here
   GEMINI_MODEL=gemini-1.5-flash
   ```

### Step 2: Test Integration

```bash
# Start the backend server
cd backend
npm start

# Test AI endpoint
curl http://localhost:5000/api/v1/ai/insights
```

## 🔧 Configuration

### Environment Variables

Add to `backend/.env`:

```env
# Google Gemini AI Configuration
GEMINI_API_KEY=AIzaSyD...your_key_here
GEMINI_MODEL=gemini-1.5-flash

# Alternative models (if needed)
# GEMINI_MODEL=gemini-1.5-pro
# GEMINI_MODEL=gemini-1.0-pro
```

### Model Selection

**Gemini 1.5 Flash** (Recommended - Default)
- Fast response times
- Cost-effective
- Suitable for most business tasks
- 1M token context window
- Multimodal capabilities

**Gemini 1.5 Pro** (Advanced)
- Higher accuracy
- Better for complex analysis
- 2M token context window
- More expensive

**Gemini 1.0 Pro** (Legacy)
- Stable and reliable
- Good performance
- Smaller context window

## 📊 API Usage

### 1. Generate Content

**Endpoint:** `POST /api/v1/ai/generate`

```bash
curl -X POST http://localhost:5000/api/v1/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Generate a marketing strategy for Q4 2024",
    "model": "gemini-1.5-flash"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "Here's a comprehensive Q4 2024 marketing strategy...",
    "prompt": "Generate a marketing strategy for Q4 2024"
  }
}
```

### 2. Chat with AI

**Endpoint:** `POST /api/v1/ai/chat`

```bash
curl -X POST http://localhost:5000/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the best KPIs for tracking project success?",
    "history": []
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "The best KPIs for tracking project success include...",
    "history": [
      {
        "role": "user",
        "parts": [{"text": "What are the best KPIs..."}]
      },
      {
        "role": "model",
        "parts": [{"text": "The best KPIs for..."}]
      }
    ]
  }
}
```

### 3. Analyze Business Data

**Endpoint:** `POST /api/v1/ai/analyze`

```bash
curl -X POST http://localhost:5000/api/v1/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "project": "Digital Transformation",
      "budget": 500000,
      "progress": 65,
      "timeline": "6 months"
    },
    "analysisType": "economic"
  }'
```

**Analysis Types:**
- `general` - General business analysis
- `marketing` - Marketing campaign analysis
- `economic` - Economic project analysis
- `development` - Business development analysis

### 4. Get Business Insights

**Endpoint:** `GET /api/v1/ai/insights?topic=marketing`

```bash
curl http://localhost:5000/api/v1/ai/insights?topic=digital%20marketing%20trends
```

### 5. Generate Reports

**Endpoint:** `POST /api/v1/ai/report`

```bash
curl -X POST http://localhost:5000/api/v1/ai/report \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Q3 Performance Report",
    "data": {
      "revenue": 1500000,
      "growth": 25,
      "campaigns": 8
    },
    "reportType": "quarterly"
  }'
```

### 6. Analyze Projects with AI

**Endpoint:** `POST /api/v1/projects/:id/analyze`

```bash
curl -X POST http://localhost:5000/api/v1/projects/1/analyze
```

This will:
1. Fetch project data from database
2. Send to Gemini AI for analysis
3. Return insights and recommendations

## 💡 Use Cases

### 1. Project Analysis

```javascript
// Analyze a project's performance
const response = await fetch('/api/v1/projects/1/analyze', {
  method: 'POST'
});
const analysis = await response.json();
console.log(analysis.analysis); // AI-generated insights
```

### 2. Marketing Campaign Optimization

```javascript
// Get AI recommendations for marketing
const response = await fetch('/api/v1/ai/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: {
      campaign: 'Summer Launch',
      impressions: 50000,
      clicks: 2500,
      conversions: 125
    },
    analysisType: 'marketing'
  })
});
```

### 3. Business Development Insights

```javascript
// Analyze BD opportunity
const response = await fetch('/api/v1/ai/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: {
      opportunity: 'Strategic Partnership',
      value: 1000000,
      probability: 75,
      stage: 'negotiation'
    },
    analysisType: 'development'
  })
});
```

### 4. Interactive Chat Assistant

```javascript
let chatHistory = [];

async function chat(message) {
  const response = await fetch('/api/v1/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: message,
      history: chatHistory
    })
  });
  
  const result = await response.json();
  chatHistory = result.data.history;
  return result.data.response;
}

// Usage
const answer1 = await chat("What is the best way to track ROI?");
const answer2 = await chat("Can you provide an example?"); // Context-aware
```

### 5. Automated Report Generation

```javascript
// Generate comprehensive report
const response = await fetch('/api/v1/ai/report', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Annual Business Review',
    data: {
      revenue: 5000000,
      projects: 25,
      growth: 35,
      marketShare: 12
    },
    reportType: 'annual'
  })
});
```

## 🔐 Security Best Practices

### 1. API Key Protection

**Never expose API key in frontend code:**
```javascript
// ❌ WRONG - Don't do this
const apiKey = 'AIzaSyD...';

// ✅ CORRECT - Use backend proxy
fetch('/api/v1/ai/generate', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Generate content' })
});
```

### 2. Rate Limiting

The backend includes rate limiting:
- 100 requests per 15 minutes per IP
- Prevents abuse and controls costs

### 3. Input Validation

All AI inputs are validated:
- Maximum prompt length
- Content filtering
- Malicious input detection

### 4. Error Handling

```javascript
try {
  const response = await fetch('/api/v1/ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'Generate content' })
  });
  
  if (!response.ok) {
    throw new Error('AI request failed');
  }
  
  const data = await response.json();
  
  if (!data.success) {
    console.error('AI Error:', data.error);
  }
} catch (error) {
  console.error('Request failed:', error);
}
```

## 💰 Cost Management

### Pricing (as of 2024)

**Gemini 1.5 Flash:**
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens

**Gemini 1.5 Pro:**
- Input: $1.25 per 1M tokens
- Output: $5.00 per 1M tokens

### Cost Optimization Tips

1. **Use Flash for Most Tasks**
   - Faster and cheaper
   - Suitable for 90% of use cases

2. **Implement Caching**
   - Cache common queries
   - Store frequently used insights

3. **Optimize Prompts**
   - Be concise and specific
   - Reduce unnecessary context

4. **Set Usage Limits**
   ```javascript
   // In backend configuration
   const DAILY_REQUEST_LIMIT = 1000;
   const MONTHLY_COST_LIMIT = 100; // USD
   ```

5. **Monitor Usage**
   - Track API calls
   - Set up billing alerts in Google Cloud

## 📊 Usage Analytics

### Track API Usage

```javascript
// In backend/middleware/analytics.js
const trackAIUsage = (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const endpoint = req.path;
    
    // Log to database or analytics service
    console.log({
      endpoint,
      duration,
      status: res.statusCode,
      timestamp: new Date()
    });
  });
  
  next();
};
```

## 🧪 Testing

### Unit Tests

```javascript
// backend/tests/ai.test.js
const { generateContent } = require('../config/gemini');

describe('Gemini AI Integration', () => {
  test('generates content successfully', async () => {
    const result = await generateContent('Test prompt');
    expect(result.success).toBe(true);
    expect(result.text).toBeDefined();
  });
  
  test('handles errors gracefully', async () => {
    const result = await generateContent(''); // Empty prompt
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

### Integration Tests

```bash
# Test all AI endpoints
npm test -- ai.test.js
```

## 🐛 Troubleshooting

### Common Issues

**Problem:** "API key not valid"
```bash
# Solution:
1. Verify API key in backend/.env
2. Check key hasn't expired
3. Ensure key has proper permissions
4. Restart backend server
```

**Problem:** "Rate limit exceeded"
```bash
# Solution:
1. Wait for rate limit to reset
2. Implement request queuing
3. Consider upgrading API quota
```

**Problem:** "Model not found"
```bash
# Solution:
1. Verify model name in .env
2. Check available models: gemini-1.5-flash, gemini-1.5-pro
3. Update GEMINI_MODEL in .env
```

**Problem:** "Request timeout"
```bash
# Solution:
1. Increase timeout in config
2. Reduce prompt complexity
3. Check network connection
```

## 🔄 Advanced Features

### Custom Prompts

Create specialized prompts for your business:

```javascript
// backend/utils/promptTemplates.js
const prompts = {
  projectAnalysis: (project) => `
    Analyze this economic project:
    Title: ${project.title}
    Budget: $${project.budget}
    Status: ${project.status}
    Duration: ${project.duration}
    
    Provide:
    1. Performance assessment
    2. Risk analysis
    3. Optimization recommendations
    4. ROI projections
  `,
  
  marketingStrategy: (campaign) => `
    Create a marketing strategy for:
    Campaign: ${campaign.name}
    Platform: ${campaign.platform}
    Budget: $${campaign.budget}
    Target: ${campaign.target}
    
    Include:
    1. Target audience analysis
    2. Channel recommendations
    3. Budget allocation
    4. Success metrics
  `
};
```

### Batch Processing

Process multiple items with AI:

```javascript
// backend/services/batchAI.js
async function batchAnalyze(items, analysisType) {
  const results = [];
  
  for (const item of items) {
    const analysis = await analyzeBusinessData(item, analysisType);
    results.push({
      item,
      analysis: analysis.text
    });
    
    // Rate limiting delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}
```

## 📚 Resources

### Documentation
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Best Practices Guide](https://ai.google.dev/docs/best_practices)

### Examples
- [Prompt Engineering Guide](https://ai.google.dev/docs/prompt_best_practices)
- [Code Samples](https://ai.google.dev/tutorials)

### Support
- [Stack Overflow - gemini-api](https://stackoverflow.com/questions/tagged/gemini-api)
- [Google Cloud Support](https://cloud.google.com/support)

## 🎯 Next Steps

1. **Customize AI Responses** - Fine-tune prompts for your business
2. **Implement Caching** - Reduce API calls and costs
3. **Add More Features** - Image analysis, document processing
4. **Build Workflows** - Automate business processes with AI
5. **Create Templates** - Standard prompts for common tasks

---

**Built with ❤️ powered by Google Gemini AI**

For issues or questions: https://github.com/ELMOURABEA/Economic-Storm-platform/issues
