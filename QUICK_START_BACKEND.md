# Quick Start - Backend, SQL Server & Gemini AI

Get the complete Economic Storm Platform running with SQL Server database and Gemini AI in minutes!

## 🎯 What You're Setting Up

- ✅ **Frontend**: React application on port 3000
- ✅ **Backend**: Node.js API on port 5000  
- ✅ **Database**: SQL Server 2022 on port 1433
- ✅ **AI**: Google Gemini 1.5 Flash integration

## ⚡ One-Command Deployment (Docker)

### Prerequisites

- Docker and Docker Compose installed
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/ELMOURABEA/Economic-Storm-platform.git
cd Economic-Storm-platform

# 2. Configure environment (required)
cp .env.docker.example .env

# Edit .env and add your Gemini API key:
nano .env  # or use your preferred editor
# Set: GEMINI_API_KEY=your_actual_api_key_here
# Optionally change DB_PASSWORD for security

# 3. Start all services
docker-compose up -d

# 4. Wait for services to be healthy (about 60 seconds)
# You can check status with:
docker-compose ps

# 5. Initialize database with sample data
docker exec economic-storm-backend node scripts/init-database.js

# 6. Done! Access your application:
# Frontend:  http://localhost:3000
# Backend:   http://localhost:5000
# API Docs:  http://localhost:5000/api
```

### Verify Installation

```bash
# Check all services are healthy
docker-compose ps

# Test backend health
curl http://localhost:5000/health

# Test database connection
curl http://localhost:5000/api/v1/projects

# Test AI integration
curl http://localhost:5000/api/v1/ai/insights
```

## 🛠️ Manual Setup (Development)

### Prerequisites

- Node.js 18+
- SQL Server 2022 (or Docker)
- Google Gemini API key

### Step 1: Start SQL Server

**Option A: Using Docker (Easiest)**
```bash
docker run -e "ACCEPT_EULA=Y" \
  -e "SA_PASSWORD=YourStrongPassword123!" \
  -p 1433:1433 --name sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

**Option B: Local SQL Server**
- Install SQL Server 2022
- Note the connection details

### Step 2: Configure Backend

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env with your settings:
nano .env

# Required settings:
# DB_PASSWORD=YourStrongPassword123!
# GEMINI_API_KEY=your_actual_api_key_here
```

### Step 3: Install Dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies (in separate terminal)
cd ..
npm install
```

### Step 4: Initialize Database

```bash
cd backend
node scripts/init-database.js
```

You should see:
```
✅ Connected to SQL Server
✅ Database initialization completed successfully!
📊 Database Structure:
   • Projects
   • MarketingCampaigns
   • BusinessDevelopment
   • DataBank
   • AIInsights
   • Analytics
```

### Step 5: Start Services

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm start
```

### Step 6: Verify

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Test API: `curl http://localhost:5000/api/v1/projects`

## 🧪 Testing the Setup

### 1. Test Database Connection

```bash
# List all projects
curl http://localhost:5000/api/v1/projects

# Get project statistics
curl http://localhost:5000/api/v1/projects/statistics

# Get specific project
curl http://localhost:5000/api/v1/projects/1
```

### 2. Test AI Integration

```bash
# Generate business insights
curl http://localhost:5000/api/v1/ai/insights

# Chat with AI
curl -X POST http://localhost:5000/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are best practices for project management?"}'

# Analyze a project with AI
curl -X POST http://localhost:5000/api/v1/projects/1/analyze
```

### 3. Test CRUD Operations

**Create a new project:**
```bash
curl -X POST http://localhost:5000/api/v1/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Project",
    "description": "Testing the API",
    "budget": 100000,
    "status": "active",
    "category": "Technology",
    "start_date": "2024-01-01"
  }'
```

**Update a project:**
```bash
curl -X PUT http://localhost:5000/api/v1/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "status": "completed"
  }'
```

**Delete a project:**
```bash
curl -X DELETE http://localhost:5000/api/v1/projects/4
```

### 4. Test Marketing Endpoints

```bash
# Get all campaigns
curl http://localhost:5000/api/v1/marketing

# Get campaign metrics
curl http://localhost:5000/api/v1/marketing/metrics

# Analyze campaign with AI
curl -X POST http://localhost:5000/api/v1/marketing/1/analyze
```

### 5. Test Business Development

```bash
# Get all opportunities
curl http://localhost:5000/api/v1/business

# Get pipeline analysis
curl http://localhost:5000/api/v1/business/pipeline

# Analyze opportunity with AI
curl -X POST http://localhost:5000/api/v1/business/1/analyze
```

## 📊 Sample Data

The database comes pre-loaded with sample data:

### Projects (3 samples)
1. Digital Transformation Initiative
2. Market Expansion Project
3. Cost Optimization Study

### Marketing Campaigns (3 samples)
1. Summer Launch Campaign
2. Brand Awareness Initiative
3. Customer Retention Program

### Business Development (3 samples)
1. Strategic Partnership - TechCorp
2. Distribution Agreement - GlobalRetail
3. Joint Venture - Innovation Labs

## 🔧 Configuration Options

### Backend Environment Variables

```env
# Server
NODE_ENV=development
PORT=5000

# SQL Server
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=EconomicStorm
DB_USER=sa
DB_PASSWORD=YourStrongPassword123!
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true

# Gemini AI (Required!)
GEMINI_API_KEY=AIzaSyD...your_key
GEMINI_MODEL=gemini-1.5-flash

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Docker Environment Variables

```env
# .env file in root directory
DB_PASSWORD=YourStrongPassword123!
GEMINI_API_KEY=your_key_here
CORS_ORIGIN=http://localhost:3000
```

## 🚨 Troubleshooting

### Database Connection Issues

**Error: Cannot connect to SQL Server**
```bash
# Check if SQL Server is running
docker ps | grep sqlserver

# Check logs
docker logs sqlserver

# Restart SQL Server
docker restart sqlserver
```

**Error: Login failed for user 'sa'**
- Verify password in .env matches SQL Server password
- Check DB_ENCRYPT and DB_TRUST_SERVER_CERTIFICATE settings

### Gemini AI Issues

**Error: API key not valid**
- Get a new key from https://makersuite.google.com/app/apikey
- Update GEMINI_API_KEY in backend/.env
- Restart backend server

**Error: Rate limit exceeded**
- Wait for quota to reset
- Check usage in Google Cloud Console
- Consider upgrading API quota

### Port Already in Use

**Error: Port 3000/5000/1433 already in use**
```bash
# Find process using port
lsof -i :3000  # or :5000, :1433

# Kill process
kill -9 <PID>

# Or change port in configuration
```

### Docker Issues

**Error: Container fails to start**
```bash
# View logs
docker-compose logs

# Restart services
docker-compose down
docker-compose up -d

# Rebuild images
docker-compose build --no-cache
docker-compose up -d
```

## 📱 API Endpoints Reference

### Projects
- `GET /api/v1/projects` - List all projects
- `GET /api/v1/projects/:id` - Get specific project
- `POST /api/v1/projects` - Create project
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project
- `GET /api/v1/projects/statistics` - Get statistics
- `POST /api/v1/projects/:id/analyze` - AI analysis

### Marketing
- `GET /api/v1/marketing` - List all campaigns
- `GET /api/v1/marketing/:id` - Get specific campaign
- `POST /api/v1/marketing` - Create campaign
- `PUT /api/v1/marketing/:id` - Update campaign
- `DELETE /api/v1/marketing/:id` - Delete campaign
- `GET /api/v1/marketing/metrics` - Performance metrics
- `POST /api/v1/marketing/:id/analyze` - AI analysis

### Business Development
- `GET /api/v1/business` - List all opportunities
- `GET /api/v1/business/:id` - Get specific opportunity
- `POST /api/v1/business` - Create opportunity
- `PUT /api/v1/business/:id` - Update opportunity
- `DELETE /api/v1/business/:id` - Delete opportunity
- `GET /api/v1/business/pipeline` - Pipeline analysis
- `POST /api/v1/business/:id/analyze` - AI analysis

### AI Services
- `POST /api/v1/ai/generate` - Generate content
- `POST /api/v1/ai/chat` - Interactive chat
- `POST /api/v1/ai/analyze` - Analyze data
- `GET /api/v1/ai/insights` - Business insights
- `POST /api/v1/ai/report` - Generate report

## 🎯 Next Steps

1. **Explore the API**
   - Try different endpoints
   - Test AI features
   - Review sample data

2. **Customize**
   - Add your own projects
   - Configure AI prompts
   - Adjust database schema

3. **Deploy to Production**
   - See [MARKET_DEPLOYMENT_GUIDE.md](MARKET_DEPLOYMENT_GUIDE.md)
   - Configure for cloud platform
   - Set up monitoring

4. **Integrate Frontend**
   - Connect React app to API
   - Display real data
   - Add AI-powered features

## 📚 Additional Resources

- [SQL Server Setup Guide](SQLSERVER_SETUP.md)
- [Gemini AI Setup Guide](GEMINI_AI_SETUP.md)
- [Market Deployment Guide](MARKET_DEPLOYMENT_GUIDE.md)
- [Full Documentation](README.md)

## 💡 Tips

1. **Development Workflow**
   - Use `npm run dev` for auto-reload
   - Check logs regularly
   - Use Postman or curl for API testing

2. **Database Management**
   - Use Azure Data Studio for GUI
   - Regular backups recommended
   - Monitor query performance

3. **AI Integration**
   - Keep API key secure
   - Monitor usage and costs
   - Test prompts thoroughly

4. **Docker Tips**
   - Use `docker-compose logs -f` to follow logs
   - Rebuild images after code changes
   - Clean up: `docker-compose down -v`

---

**Ready to build something amazing? Start now! 🚀**

Need help? Create an issue: https://github.com/ELMOURABEA/Economic-Storm-platform/issues
