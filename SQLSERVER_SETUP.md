# SQL Server Setup Guide

Complete guide for setting up Microsoft SQL Server with Economic Storm Platform.

## 📋 Overview

The Economic Storm Platform now includes a complete backend with SQL Server database integration and Google Gemini AI capabilities. This guide will help you set up and configure the database.

## 🎯 Database Features

### Database Schema

The platform includes 6 main tables:

1. **Projects** - Economic project management
   - Track project status, budget, timeline
   - Categories and milestones
   - AI-powered analysis

2. **MarketingCampaigns** - Marketing campaign tracking
   - Campaign performance metrics
   - Budget allocation
   - Multi-platform support

3. **BusinessDevelopment** - Business development pipeline
   - Opportunity tracking
   - Partner management
   - Pipeline analytics

4. **DataBank** - Flexible data storage
   - Document management
   - Metadata and tagging
   - Categorized storage

5. **AIInsights** - AI-generated insights
   - Gemini AI analysis results
   - Entity-linked insights
   - Confidence scoring

6. **Analytics** - Business analytics
   - Performance metrics
   - Dimensional analysis
   - Time-series data

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

The easiest way to get started:

```bash
# Clone the repository
git clone https://github.com/ELMOURABEA/Economic-Storm-platform.git
cd Economic-Storm-platform

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your settings

# Start all services (SQL Server, Backend, Frontend)
docker-compose up -d

# Initialize database (first time only)
docker exec economic-storm-backend node scripts/init-database.js
```

This will start:
- SQL Server on port 1433
- Backend API on port 5000
- Frontend Web on port 3000

### Option 2: Manual Setup

#### Step 1: Install SQL Server

**Windows:**
1. Download SQL Server 2022 Express from Microsoft
2. Run the installer
3. Choose "Basic" installation
4. Note the connection string

**Linux:**
```bash
# Ubuntu/Debian
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2022.list)"
sudo apt-get update
sudo apt-get install -y mssql-server
sudo /opt/mssql/bin/mssql-conf setup

# Start service
sudo systemctl start mssql-server
```

**macOS:**
Use Docker:
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrongPassword123!" \
  -p 1433:1433 --name sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

#### Step 2: Configure Connection

Create `backend/.env`:
```env
# SQL Server Configuration
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=EconomicStorm
DB_USER=sa
DB_PASSWORD=YourStrongPassword123!
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Step 3: Install Dependencies

```bash
cd backend
npm install
```

#### Step 4: Initialize Database

```bash
# Run the initialization script
node scripts/init-database.js
```

This will:
- Create the EconomicStorm database
- Create all tables with proper schema
- Insert sample data
- Set up indexes and constraints

#### Step 5: Start Backend Server

```bash
npm start
# or for development with auto-reload
npm run dev
```

## 🔧 Configuration

### Database Connection Settings

**Default Settings:**
- Server: localhost
- Port: 1433
- Database: EconomicStorm
- User: sa
- Encryption: Enabled

**Security Best Practices:**
1. Use strong passwords (min 12 characters)
2. Enable encryption in production
3. Use Windows Authentication when possible
4. Restrict network access
5. Regular backups

### Connection String Format

```
Server=localhost,1433;Database=EconomicStorm;User Id=sa;Password=YourPassword;Encrypt=true;TrustServerCertificate=true;
```

## 📊 Database Schema Details

### Projects Table

```sql
CREATE TABLE Projects (
    project_id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    status NVARCHAR(50) DEFAULT 'active',
    budget DECIMAL(18, 2),
    start_date DATE,
    end_date DATE,
    category NVARCHAR(100),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
```

**Constraints:**
- status: 'active', 'completed', 'on-hold', 'cancelled'

### MarketingCampaigns Table

```sql
CREATE TABLE MarketingCampaigns (
    campaign_id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    platform NVARCHAR(100),
    budget DECIMAL(18, 2),
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    conversions INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    status NVARCHAR(50) DEFAULT 'draft',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
```

**Constraints:**
- status: 'draft', 'active', 'paused', 'completed'

### BusinessDevelopment Table

```sql
CREATE TABLE BusinessDevelopment (
    bd_id INT PRIMARY KEY IDENTITY(1,1),
    opportunity_name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    partner_name NVARCHAR(255),
    potential_value DECIMAL(18, 2),
    probability INT CHECK (probability BETWEEN 0 AND 100),
    stage NVARCHAR(50) DEFAULT 'prospecting',
    contact_info NVARCHAR(MAX),
    notes NVARCHAR(MAX),
    expected_close_date DATE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
```

**Constraints:**
- stage: 'prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'
- probability: 0-100

## 🔌 API Endpoints

### Projects API

```bash
GET    /api/v1/projects              # Get all projects
GET    /api/v1/projects/:id          # Get single project
POST   /api/v1/projects              # Create project
PUT    /api/v1/projects/:id          # Update project
DELETE /api/v1/projects/:id          # Delete project
GET    /api/v1/projects/statistics   # Get statistics
POST   /api/v1/projects/:id/analyze  # AI analysis
```

### AI API

```bash
POST   /api/v1/ai/generate           # Generate AI content
POST   /api/v1/ai/chat               # Chat with AI
POST   /api/v1/ai/analyze            # Analyze data
GET    /api/v1/ai/insights           # Get business insights
POST   /api/v1/ai/report             # Generate report
```

## 🧪 Testing the Setup

### 1. Test Database Connection

```bash
# From backend directory
node -e "require('./config/database').getPool().then(() => console.log('✅ Connected')).catch(e => console.error('❌', e.message))"
```

### 2. Test API Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Get all projects
curl http://localhost:5000/api/v1/projects

# Create a project
curl -X POST http://localhost:5000/api/v1/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Test project",
    "budget": 50000,
    "status": "active",
    "category": "Technology"
  }'
```

### 3. Test Gemini AI Integration

```bash
# Generate insights
curl http://localhost:5000/api/v1/ai/insights

# Chat with AI
curl -X POST http://localhost:5000/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are best practices for project management?"
  }'
```

## 📦 Sample Data

The initialization script includes sample data for:

### Projects
- Digital Transformation Initiative
- Market Expansion Project
- Cost Optimization Study

### Marketing Campaigns
- Summer Launch Campaign
- Brand Awareness Initiative
- Customer Retention Program

### Business Development
- Strategic Partnership - TechCorp
- Distribution Agreement - GlobalRetail
- Joint Venture - Innovation Labs

## 🔐 Security

### SQL Server Security

1. **Strong Passwords**
   ```bash
   # Password requirements:
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Not based on dictionary words
   ```

2. **Network Security**
   ```bash
   # Firewall rules (adjust as needed)
   sudo ufw allow 1433/tcp
   # Or restrict to specific IPs
   sudo ufw allow from 192.168.1.0/24 to any port 1433
   ```

3. **Encryption**
   - Enable SSL/TLS for connections
   - Use certificate-based authentication
   - Encrypt data at rest

4. **Access Control**
   - Create separate users for different services
   - Grant minimum required permissions
   - Regularly audit access logs

### Backend API Security

Included security features:
- Helmet.js for HTTP headers
- CORS protection
- Rate limiting
- Input validation
- Error handling

## 🛠️ Maintenance

### Backup Database

```bash
# Using SQL Server tools
sqlcmd -S localhost -U sa -P YourPassword -Q "BACKUP DATABASE EconomicStorm TO DISK = '/var/opt/mssql/backup/EconomicStorm.bak'"

# Using Docker
docker exec sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P YourPassword \
  -Q "BACKUP DATABASE EconomicStorm TO DISK = '/var/opt/mssql/backup/EconomicStorm.bak'"
```

### Restore Database

```bash
sqlcmd -S localhost -U sa -P YourPassword -Q "RESTORE DATABASE EconomicStorm FROM DISK = '/var/opt/mssql/backup/EconomicStorm.bak'"
```

### Performance Monitoring

```sql
-- Check database size
SELECT 
    DB_NAME() AS DatabaseName,
    SUM(size * 8 / 1024) AS SizeMB
FROM sys.master_files
WHERE database_id = DB_ID()
GROUP BY DB_NAME();

-- Check table sizes
SELECT 
    t.NAME AS TableName,
    p.rows AS RowCounts,
    SUM(a.total_pages) * 8 / 1024 AS TotalSpaceMB
FROM sys.tables t
INNER JOIN sys.indexes i ON t.OBJECT_ID = i.object_id
INNER JOIN sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
INNER JOIN sys.allocation_units a ON p.partition_id = a.container_id
GROUP BY t.Name, p.Rows
ORDER BY TotalSpaceMB DESC;
```

## 🐛 Troubleshooting

### Connection Issues

**Problem:** Cannot connect to SQL Server
```bash
# Check if SQL Server is running
docker ps | grep sqlserver
# OR
sudo systemctl status mssql-server

# Check port is listening
netstat -an | grep 1433
```

**Problem:** Authentication failed
- Verify username and password in .env
- Ensure SQL Server authentication is enabled
- Check password complexity requirements

**Problem:** Database not found
```bash
# Run initialization script again
node scripts/init-database.js
```

### Performance Issues

**Problem:** Slow queries
- Add indexes to frequently queried columns
- Optimize query patterns
- Check database statistics

**Problem:** Connection pool exhausted
- Increase pool size in database config
- Implement connection pooling best practices
- Monitor active connections

## 📚 Additional Resources

### Documentation
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/sql-server/)
- [Node.js mssql Package](https://www.npmjs.com/package/mssql)
- [Express.js Guide](https://expressjs.com/)

### Tools
- **Azure Data Studio** - Cross-platform database tool
- **SQL Server Management Studio (SSMS)** - Windows database management
- **DBeaver** - Universal database tool

## 🎯 Next Steps

1. **Customize Schema** - Add custom fields to tables
2. **Create Views** - Build database views for complex queries
3. **Add Stored Procedures** - Implement business logic in database
4. **Set Up Replication** - Configure high availability
5. **Implement Caching** - Add Redis for improved performance
6. **Create Reports** - Build custom analytics and reports

---

**Built with ❤️ for the Economic Storm Platform**

For issues or questions, please create an issue on GitHub: https://github.com/ELMOURABEA/Economic-Storm-platform/issues
