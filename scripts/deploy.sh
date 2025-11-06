#!/bin/bash

# Deployment script
# Supports multiple deployment targets

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Economic Storm Platform Deployment${NC}"
echo ""

# Check if deployment target is provided
if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh [local|docker|aws|gcp|azure|heroku]"
    echo ""
    echo "Deployment targets:"
    echo "  local   - Deploy locally with npm"
    echo "  docker  - Deploy using Docker Compose"
    echo "  aws     - Deploy to AWS (requires AWS CLI)"
    echo "  gcp     - Deploy to Google Cloud Platform (requires gcloud)"
    echo "  azure   - Deploy to Azure (requires Azure CLI)"
    echo "  heroku  - Deploy to Heroku (requires Heroku CLI)"
    exit 1
fi

DEPLOYMENT_TARGET=$1

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Local deployment
if [ "$DEPLOYMENT_TARGET" = "local" ]; then
    echo -e "${YELLOW}Deploying locally...${NC}"
    
    if ! command_exists npm; then
        echo -e "${RED}❌ npm is not installed${NC}"
        exit 1
    fi
    
    npm install
    npm run build
    npm run serve
    
    echo -e "${GREEN}✅ Local deployment complete!${NC}"
    echo "Access at: http://localhost:3000"

# Docker deployment
elif [ "$DEPLOYMENT_TARGET" = "docker" ]; then
    echo -e "${YELLOW}Deploying with Docker...${NC}"
    
    if ! command_exists docker; then
        echo -e "${RED}❌ Docker is not installed${NC}"
        exit 1
    fi
    
    if ! command_exists docker-compose; then
        echo -e "${RED}❌ Docker Compose is not installed${NC}"
        exit 1
    fi
    
    # Check if .env exists
    if [ ! -f .env ]; then
        echo -e "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
        cp .env.example .env
        echo -e "${YELLOW}⚠️  Please edit .env file with your configuration${NC}"
    fi
    
    docker-compose up -d --build
    
    echo -e "${GREEN}✅ Docker deployment complete!${NC}"
    echo "Access at: http://localhost:3000"
    echo "View logs: docker-compose logs -f"

# AWS deployment
elif [ "$DEPLOYMENT_TARGET" = "aws" ]; then
    echo -e "${YELLOW}Deploying to AWS...${NC}"
    
    if ! command_exists aws; then
        echo -e "${RED}❌ AWS CLI is not installed${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Building Docker image...${NC}"
    docker build -t economic-storm-platform:latest .
    
    echo -e "${YELLOW}Please configure AWS deployment manually or update this script${NC}"
    echo "See DEPLOYMENT.md for AWS deployment instructions"

# GCP deployment
elif [ "$DEPLOYMENT_TARGET" = "gcp" ]; then
    echo -e "${YELLOW}Deploying to Google Cloud Platform...${NC}"
    
    if ! command_exists gcloud; then
        echo -e "${RED}❌ gcloud CLI is not installed${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Building and deploying...${NC}"
    gcloud builds submit --tag gcr.io/$(gcloud config get-value project)/economic-storm-platform
    gcloud run deploy economic-storm-platform \
        --image gcr.io/$(gcloud config get-value project)/economic-storm-platform \
        --platform managed \
        --region us-central1 \
        --allow-unauthenticated \
        --port 80
    
    echo -e "${GREEN}✅ GCP deployment complete!${NC}"

# Azure deployment
elif [ "$DEPLOYMENT_TARGET" = "azure" ]; then
    echo -e "${YELLOW}Deploying to Azure...${NC}"
    
    if ! command_exists az; then
        echo -e "${RED}❌ Azure CLI is not installed${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Please configure Azure deployment manually or update this script${NC}"
    echo "See DEPLOYMENT.md for Azure deployment instructions"

# Heroku deployment
elif [ "$DEPLOYMENT_TARGET" = "heroku" ]; then
    echo -e "${YELLOW}Deploying to Heroku...${NC}"
    
    if ! command_exists heroku; then
        echo -e "${RED}❌ Heroku CLI is not installed${NC}"
        exit 1
    fi
    
    heroku container:login
    heroku container:push web
    heroku container:release web
    
    echo -e "${GREEN}✅ Heroku deployment complete!${NC}"
    echo "Access at: https://$(heroku info -s | grep web_url | cut -d= -f2)"

else
    echo -e "${RED}❌ Unknown deployment target: $DEPLOYMENT_TARGET${NC}"
    echo "Valid targets: local, docker, aws, gcp, azure, heroku"
    exit 1
fi
