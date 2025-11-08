# Deployment Guide

Complete guide for deploying Economic Storm Platform to production.

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- Google Ads account (for advertising integration)
- Domain name (optional, for production)

## 🚀 Quick Start Deployment

### Option 1: Docker Compose (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/ELMOURABEA/Economic-Storm-platform.git
cd Economic-Storm-platform

# 2. Configure environment variables
cp .env.example .env
# Edit .env with your Google Ads credentials

# 3. Build and run with Docker Compose
docker-compose up -d

# 4. Access the application
# Open http://localhost:3000 in your browser
```

### Option 2: Docker Build

```bash
# Build the Docker image
docker build -t economic-storm-platform:latest .

# Run the container
docker run -d -p 3000:80 --name economic-storm economic-storm-platform:latest

# Access at http://localhost:3000
```

### Option 3: Manual Deployment

```bash
# Install dependencies
npm install

# Build the production bundle
npm run build

# Serve the build
npm run serve
# Or use any static file server to serve the 'build' directory
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google Ads Configuration
REACT_APP_GOOGLE_ADS_CLIENT_ID=ca-pub-XXXXXXXXXX
REACT_APP_AD_SLOT_TOP=1234567890
REACT_APP_AD_SLOT_BOTTOM=0987654321
# ... (see .env.example for all variables)
```

### Google Ads Setup

1. **Create Google Ads Account**
   - Go to https://www.google.com/adsense
   - Sign up or log in
   - Complete account verification

2. **Get Your Publisher ID**
   - In AdSense dashboard, find your Publisher ID
   - Format: `ca-pub-XXXXXXXXXXXXXXXXX`
   - Update `REACT_APP_GOOGLE_ADS_CLIENT_ID` in `.env`

3. **Create Ad Units**
   - Navigate to "Ads" → "By ad unit" → "Display ads"
   - Create ad units for different positions:
     - Header Ad (728x90 Leaderboard)
     - Footer Ad (728x90 Leaderboard)
     - Sidebar Ad (300x250 Rectangle)
     - Content Ads (Responsive)
   - Copy the ad slot IDs and update `.env` file

4. **Update Application**
   - Edit `public/index.html`
   - Replace `ca-pub-XXXXXXXXXX` with your actual Publisher ID
   - Rebuild the application

## 🌐 Production Deployment

### Deploy to AWS

#### Using ECS (Elastic Container Service)

```bash
# 1. Build and tag the image
docker build -t economic-storm-platform:latest .
docker tag economic-storm-platform:latest <account-id>.dkr.ecr.<region>.amazonaws.com/economic-storm-platform:latest

# 2. Push to ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/economic-storm-platform:latest

# 3. Update ECS service (if already created)
aws ecs update-service --cluster <cluster-name> --service economic-storm --force-new-deployment
```

#### Using EC2

```bash
# 1. SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# 2. Install Docker and Docker Compose
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# 3. Clone and deploy
git clone https://github.com/ELMOURABEA/Economic-Storm-platform.git
cd Economic-Storm-platform
docker-compose up -d
```

### Deploy to Google Cloud Platform

```bash
# 1. Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/<project-id>/economic-storm-platform

# 2. Deploy to Cloud Run
gcloud run deploy economic-storm-platform \
  --image gcr.io/<project-id>/economic-storm-platform \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80
```

### Deploy to Azure

```bash
# 1. Create container registry and push image
az acr build --registry <registry-name> --image economic-storm-platform:latest .

# 2. Deploy to Azure Container Instances
az container create \
  --resource-group <resource-group> \
  --name economic-storm-platform \
  --image <registry-name>.azurecr.io/economic-storm-platform:latest \
  --dns-name-label economic-storm \
  --ports 80
```

### Deploy to Heroku

```bash
# 1. Login to Heroku
heroku login

# 2. Create app
heroku create economic-storm-platform

# 3. Add container registry
heroku container:login

# 4. Build and push
heroku container:push web -a economic-storm-platform

# 5. Release
heroku container:release web -a economic-storm-platform
```

### Deploy to Vercel (Easiest for React Apps)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow prompts and deploy to production
vercel --prod
```

### Deploy to Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the application
npm run build

# 3. Deploy
netlify deploy --prod --dir=build
```

## 🔒 Security Considerations

### Before Production

1. **Update Google Ads ID**
   - Replace all placeholder IDs with real ones
   - Test ads display correctly

2. **Enable HTTPS**
   - Use SSL certificate (Let's Encrypt recommended)
   - Configure nginx for HTTPS

3. **Set Security Headers**
   - Already configured in `nginx.conf`
   - Review and adjust as needed

4. **Environment Variables**
   - Never commit `.env` files
   - Use secure secret management (AWS Secrets Manager, etc.)

5. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories

## 📊 Monitoring and Health Checks

### Health Check Endpoint

The application includes a health check at `/health`:

```bash
curl http://localhost:3000/health
# Returns: healthy
```

### Docker Health Check

Built-in Docker health check monitors the application:

```bash
docker ps
# Check HEALTH status column
```

### Monitoring Tools

Recommended monitoring solutions:
- **Application Performance**: New Relic, DataDog
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics (add GA_TRACKING_ID to .env)

## 🔄 CI/CD Integration

### GitHub Actions (Already Configured)

The repository includes GitHub Actions workflows:
- `.github/workflows/ci.yml` - CI/CD pipeline
- Automatically validates and builds on push

### Add Deployment Step

Add to `.github/workflows/ci.yml`:

```yaml
- name: Deploy to Production
  if: github.ref == 'refs/heads/main'
  run: |
    # Add your deployment commands here
    # Example: Deploy to AWS, GCP, Azure, etc.
```

## 📦 Package for Customer Delivery

### Create Distribution Package

```bash
# Run the packaging script
chmod +x scripts/package.sh
./scripts/package.sh
```

This creates a `distribution.zip` containing:
- Built application files
- Docker configuration
- Deployment documentation
- Setup scripts

### Customer Installation Instructions

1. Extract the package:
   ```bash
   unzip economic-storm-platform-v1.0.0.zip
   cd economic-storm-platform
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with customer's settings
   ```

3. Deploy:
   ```bash
   docker-compose up -d
   ```

## 🛠️ Maintenance

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### View Logs

```bash
# Docker Compose
docker-compose logs -f

# Docker container
docker logs -f economic-storm
```

### Backup Data

```bash
# Backup volumes (if using databases)
docker run --rm --volumes-from economic-storm -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /data
```

## 📞 Support

For deployment issues:
- Check logs: `docker-compose logs`
- Review documentation: `README.md`, `PROJECT_STRUCTURE.md`
- Create issue: https://github.com/ELMOURABEA/Economic-Storm-platform/issues

## 🎯 Post-Deployment Checklist

- [ ] Application accessible at domain/IP
- [ ] Google Ads displaying correctly
- [ ] Health check endpoint responding
- [ ] SSL/HTTPS enabled (production)
- [ ] Security headers configured
- [ ] Monitoring tools configured
- [ ] Backup strategy in place
- [ ] CI/CD pipeline working
- [ ] Documentation up to date
- [ ] Team trained on maintenance

## 🌟 Optimization Tips

### Performance

1. **Enable CDN** (CloudFlare, CloudFront)
2. **Optimize images** (WebP format, compression)
3. **Lazy loading** for components
4. **Code splitting** (already configured)

### Cost Optimization

1. **Use spot instances** (AWS EC2)
2. **Auto-scaling** based on traffic
3. **Optimize ad placement** for revenue
4. **Cache static assets** (already configured)

---

**Built with ❤️ and powered by GitHub Copilot Agent** 🤖
