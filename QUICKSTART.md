# Quick Start Guide

Get Economic Storm Platform running in minutes!

## 🚀 Option 1: Local Development (Fastest)

Perfect for development and testing.

```bash
# 1. Clone the repository
git clone https://github.com/ELMOURABEA/Economic-Storm-platform.git
cd Economic-Storm-platform

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open your browser
# Visit: http://localhost:3000
```

That's it! The application is running locally.

## 🐳 Option 2: Docker Deployment (Production)

Best for production deployments.

### Prerequisites
- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (included with Docker Desktop)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/ELMOURABEA/Economic-Storm-platform.git
cd Economic-Storm-platform

# 2. Build the Docker image
docker build -t economic-storm-platform .

# 3. Run the container
docker run -d -p 3000:80 --name economic-storm economic-storm-platform

# 4. Access the application
# Visit: http://localhost:3000
```

### Using Docker Compose (Easier)

```bash
# 1. Clone the repository
git clone https://github.com/ELMOURABEA/Economic-Storm-platform.git
cd Economic-Storm-platform

# 2. Start with Docker Compose
docker-compose up -d

# 3. Access the application
# Visit: http://localhost:3000

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## 💰 Option 3: With Google Ads (Monetization)

Enable advertising revenue.

### Step 1: Get Google Ads Credentials

1. Go to [Google AdSense](https://www.google.com/adsense)
2. Sign up or log in
3. Get your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXXX`)
4. Create ad units and get slot IDs

See [GOOGLE_ADS_SETUP.md](GOOGLE_ADS_SETUP.md) for detailed instructions.

### Step 2: Configure Environment

```bash
# Create .env file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your favorite editor
```

Update these values in `.env`:
```env
REACT_APP_GOOGLE_ADS_CLIENT_ID=ca-pub-YOUR-ACTUAL-ID
REACT_APP_AD_SLOT_TOP=your-top-slot-id
REACT_APP_AD_SLOT_BOTTOM=your-bottom-slot-id
# ... (see .env.example for all slots)
```

### Step 3: Build and Deploy

```bash
# Build with environment variables
npm run build

# Deploy (choose one)
npm run serve              # Local static server
docker-compose up -d       # Docker
./scripts/deploy.sh local  # Using deploy script
```

## ☁️ Option 4: Cloud Deployment

Deploy to your favorite cloud platform.

### Vercel (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Heroku

```bash
# Login
heroku login

# Create app
heroku create economic-storm-platform

# Deploy with container
heroku container:push web
heroku container:release web

# Open app
heroku open
```

### AWS, GCP, Azure

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete instructions for:
- AWS (ECS, EC2, Elastic Beanstalk)
- Google Cloud Platform (Cloud Run, GKE)
- Microsoft Azure (Container Instances, App Service)

## 🔧 Common Commands

```bash
# Development
npm start                 # Start development server
npm test                  # Run tests
npm run build             # Build for production

# Docker
docker-compose up -d      # Start in background
docker-compose logs -f    # View logs
docker-compose down       # Stop and remove
docker-compose restart    # Restart services

# Deployment
./scripts/deploy.sh local # Deploy locally
./scripts/deploy.sh docker # Deploy with Docker
./scripts/package.sh      # Create distribution package
```

## 🧪 Verify Installation

After starting the application, verify it's working:

1. **Homepage**: http://localhost:3000
   - Should see welcome page with gradient design

2. **Navigation**: Click menu items
   - Economic Projects
   - Marketing
   - Business Development
   - Data Bank

3. **Health Check**: http://localhost:3000/health
   - Should return: "healthy"

4. **Ad Placeholders**: Look for gray boxes with "📢 Google Ad Space"
   - These will show real ads in production with proper configuration

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Docker Issues

```bash
# Stop all containers
docker-compose down

# Remove old containers and images
docker system prune -a

# Rebuild from scratch
docker-compose up -d --build
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Google Ads Not Showing

- Ads only show in production (NODE_ENV=production)
- Verify Publisher ID and slot IDs are correct
- Check browser console for errors
- Disable ad blockers for testing
- Wait 24-48 hours for new accounts

## 📚 Next Steps

1. **Customize Content**: Edit pages in `src/pages/`
2. **Configure Ads**: See [GOOGLE_ADS_SETUP.md](GOOGLE_ADS_SETUP.md)
3. **Deploy**: Choose a platform from [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Monitor**: Set up monitoring and analytics
5. **Scale**: Add backend API, database, authentication

## 🎯 Features Overview

### Current Features
- ✅ Modern React application
- ✅ 5 main pages with rich content
- ✅ Responsive design (mobile-friendly)
- ✅ Google Ads integration (8 ad slots)
- ✅ Docker deployment ready
- ✅ Multi-cloud support
- ✅ Health check endpoint
- ✅ Production-optimized build

### Coming Soon
- 🔜 Backend API
- 🔜 Database integration
- 🔜 User authentication
- 🔜 Advanced analytics
- 🔜 Admin dashboard

## 💡 Tips

1. **Development**: Use `npm start` for hot reload during development
2. **Testing**: Always test builds with `npm run build` before deploying
3. **Performance**: Use Docker multi-stage builds for optimal image size
4. **Security**: Never commit `.env` files with real credentials
5. **Monitoring**: Set up health checks on your hosting platform

## 🤝 Need Help?

- **Documentation**: Check [DEPLOYMENT.md](DEPLOYMENT.md) and [GOOGLE_ADS_SETUP.md](GOOGLE_ADS_SETUP.md)
- **Issues**: [Create an issue](https://github.com/ELMOURABEA/Economic-Storm-platform/issues)
- **Build Issues**: Check `npm run build` output for errors
- **Docker Issues**: Check `docker-compose logs`

## 🌟 Success!

If you've reached this point, your Economic Storm Platform is running! 🎉

Next steps:
1. Explore the application
2. Configure Google Ads for monetization
3. Deploy to your chosen platform
4. Share with your users

---

**Built with ❤️ and powered by GitHub Copilot Agent** 🤖
