# Scripts Directory

Utility scripts for Economic Storm Platform deployment, testing, and management.

## Available Scripts

### 1. verify-deployment.sh

**Purpose:** Verify that all services are running correctly after deployment.

**Usage:**
```bash
chmod +x scripts/verify-deployment.sh
./scripts/verify-deployment.sh
```

**What it tests:**
- ✅ Docker services status
- ✅ Backend API health
- ✅ Frontend availability
- ✅ Database connection
- ✅ API endpoints (Projects, Marketing, Business)
- ✅ AI integration
- ✅ CRUD operations

**Output:**
- Colored test results (green = passed, red = failed)
- Summary of passed/failed tests
- Troubleshooting tips if tests fail

**Example Output:**
```
═══════════════════════════════════════════════════════════
  Economic Storm Platform - Deployment Verification
═══════════════════════════════════════════════════════════

1. Testing Docker Services
──────────────────────────
✓ Docker Compose services are running

2. Testing Backend API
──────────────────────────
Testing Backend Health... ✓ PASSED (HTTP 200)
Testing API Info... ✓ PASSED (HTTP 200)
Testing Projects List... ✓ PASSED

...

Tests Passed: 12
Tests Failed: 0
Total Tests:  12

✓ All tests passed! Deployment is successful.
```

### 2. package.sh

**Purpose:** Create distribution package for customer delivery.

**Usage:**
```bash
chmod +x scripts/package.sh
./scripts/package.sh
```

**Creates:**
- `economic-storm-platform-v1.0.0.tar.gz`
- `economic-storm-platform-v1.0.0.zip`

**Package includes:**
- Built frontend application
- Backend API source code
- Docker configuration
- SQL Server schema and initialization
- Complete documentation
- Setup instructions
- License file

### 3. deploy.sh

**Purpose:** Automated deployment to various platforms.

**Usage:**
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh [platform]
```

**Supported platforms:**
- `local` - Local deployment
- `docker` - Docker deployment
- `aws` - AWS deployment
- `gcp` - Google Cloud deployment
- `azure` - Microsoft Azure deployment
- `heroku` - Heroku deployment

**Example:**
```bash
./scripts/deploy.sh docker
```

## Backend Scripts

Located in `backend/scripts/`:

### init-database.js

**Purpose:** Initialize SQL Server database with schema and sample data.

**Usage:**
```bash
cd backend
node scripts/init-database.js
```

**What it does:**
- Creates EconomicStorm database
- Creates all 6 tables
- Sets up indexes and constraints
- Inserts sample data
- Verifies successful initialization

**Requirements:**
- SQL Server running
- Environment variables configured in `backend/.env`
- Database credentials valid

**Output:**
```
🔍 Connecting to SQL Server...
   Server: localhost:1433
✅ Connected to SQL Server
📄 Reading initialization script...
📊 Executing 20 SQL batches...
   ✓ Batch 1/20 executed
   ...
✅ Database initialization completed successfully!

📊 Database Structure:
   • Projects
   • MarketingCampaigns
   • BusinessDevelopment
   • DataBank
   • AIInsights
   • Analytics

💾 Sample data has been inserted into all tables
```

## Using Scripts in Production

### Deployment Workflow

1. **Verify Environment**
   ```bash
   # Check prerequisites
   docker --version
   docker-compose --version
   node --version
   ```

2. **Configure**
   ```bash
   # Set up environment
   cp .env.docker.example .env
   # Edit .env with production values
   ```

3. **Deploy**
   ```bash
   # Deploy with Docker
   ./scripts/deploy.sh docker
   ```

4. **Initialize Database**
   ```bash
   # Run database setup
   docker exec economic-storm-backend node scripts/init-database.js
   ```

5. **Verify**
   ```bash
   # Run verification tests
   ./scripts/verify-deployment.sh
   ```

### Continuous Integration

Add to your CI/CD pipeline:

```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to production
        run: ./scripts/deploy.sh docker
      
      - name: Initialize database
        run: docker exec economic-storm-backend node scripts/init-database.js
      
      - name: Verify deployment
        run: ./scripts/verify-deployment.sh
```

## Troubleshooting

### Script Permission Issues

```bash
# Make all scripts executable
chmod +x scripts/*.sh

# Or individually
chmod +x scripts/verify-deployment.sh
chmod +x scripts/deploy.sh
chmod +x scripts/package.sh
```

### Database Initialization Fails

```bash
# Check SQL Server is running
docker ps | grep sqlserver

# Check database credentials
echo $DB_PASSWORD

# Verify network connectivity
docker exec economic-storm-backend ping sqlserver

# Check logs
docker logs sqlserver
```

### Verification Tests Fail

1. **Services not running:**
   ```bash
   docker-compose up -d
   ```

2. **Database not initialized:**
   ```bash
   docker exec economic-storm-backend node scripts/init-database.js
   ```

3. **Port conflicts:**
   ```bash
   # Check what's using ports
   lsof -i :3000
   lsof -i :5000
   lsof -i :1433
   ```

4. **API key not configured:**
   ```bash
   # Set Gemini API key
   export GEMINI_API_KEY=your_key_here
   # Or in .env file
   ```

## Adding New Scripts

When adding new scripts:

1. **Create script file:**
   ```bash
   touch scripts/my-script.sh
   chmod +x scripts/my-script.sh
   ```

2. **Add shebang:**
   ```bash
   #!/bin/bash
   ```

3. **Add documentation:**
   - Update this README
   - Add comments in script
   - Include usage examples

4. **Test thoroughly:**
   - Test in development
   - Test in staging
   - Verify in production-like environment

5. **Commit:**
   ```bash
   git add scripts/my-script.sh
   git add scripts/README.md
   git commit -m "Add new utility script"
   ```

## Best Practices

1. **Error Handling:**
   - Always check return codes
   - Provide clear error messages
   - Exit with appropriate codes

2. **Idempotency:**
   - Scripts should be safe to run multiple times
   - Check before creating/modifying
   - Clean up on failure

3. **Logging:**
   - Use colored output for clarity
   - Log to files when appropriate
   - Include timestamps for long operations

4. **Documentation:**
   - Clear usage instructions
   - Example output
   - Troubleshooting tips

5. **Security:**
   - Never hardcode credentials
   - Use environment variables
   - Validate inputs

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Bash Scripting Guide](https://www.gnu.org/software/bash/manual/)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/)

---

For more information, see:
- [QUICK_START_BACKEND.md](../QUICK_START_BACKEND.md)
- [DEPLOYMENT.md](../DEPLOYMENT.md)
- [MARKET_DEPLOYMENT_GUIDE.md](../MARKET_DEPLOYMENT_GUIDE.md)
