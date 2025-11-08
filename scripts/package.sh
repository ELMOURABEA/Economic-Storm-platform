#!/bin/bash

# Package script for customer distribution
# Creates a complete distribution package

set -e

echo "🚀 Creating Economic Storm Platform distribution package..."

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")
PACKAGE_NAME="economic-storm-platform-v${VERSION}"

# Create temporary directory
TEMP_DIR="dist-package"
mkdir -p "$TEMP_DIR/$PACKAGE_NAME"

echo "📦 Building production bundle..."
npm run build

echo "📋 Copying files..."

# Copy essential files
cp -r build "$TEMP_DIR/$PACKAGE_NAME/"
cp Dockerfile "$TEMP_DIR/$PACKAGE_NAME/"
cp docker-compose.yml "$TEMP_DIR/$PACKAGE_NAME/"
cp nginx.conf "$TEMP_DIR/$PACKAGE_NAME/"
cp .env.example "$TEMP_DIR/$PACKAGE_NAME/"
cp .dockerignore "$TEMP_DIR/$PACKAGE_NAME/"
cp package.json "$TEMP_DIR/$PACKAGE_NAME/"
cp package-lock.json "$TEMP_DIR/$PACKAGE_NAME/" 2>/dev/null || true

# Copy documentation
cp README.md "$TEMP_DIR/$PACKAGE_NAME/"
cp DEPLOYMENT.md "$TEMP_DIR/$PACKAGE_NAME/"
cp LICENSE "$TEMP_DIR/$PACKAGE_NAME/"

# Create installation script
cat > "$TEMP_DIR/$PACKAGE_NAME/install.sh" << 'EOF'
#!/bin/bash

echo "🚀 Installing Economic Storm Platform..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your Google Ads configuration"
    echo ""
fi

# Build and start
echo "🏗️  Building and starting the application..."
docker-compose up -d

echo ""
echo "✅ Installation complete!"
echo ""
echo "🌐 Application is running at: http://localhost:3000"
echo "📊 Health check: http://localhost:3000/health"
echo ""
echo "📖 For more information, see DEPLOYMENT.md"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
EOF

chmod +x "$TEMP_DIR/$PACKAGE_NAME/install.sh"

# Create README for the package
cat > "$TEMP_DIR/$PACKAGE_NAME/INSTALLATION.txt" << 'EOF'
ECONOMIC STORM PLATFORM - Installation Instructions
====================================================

Quick Start:
-----------
1. Run: ./install.sh
2. Edit .env file with your Google Ads configuration
3. Access the application at http://localhost:3000

Requirements:
------------
- Docker
- Docker Compose

Manual Installation:
-------------------
1. Copy .env.example to .env and configure
2. Run: docker-compose up -d
3. Access at http://localhost:3000

For detailed deployment instructions, see DEPLOYMENT.md

Support: https://github.com/ELMOURABEA/Economic-Storm-platform
EOF

# Create archive
echo "📦 Creating archive..."
cd "$TEMP_DIR"
tar -czf "${PACKAGE_NAME}.tar.gz" "$PACKAGE_NAME"
zip -r "${PACKAGE_NAME}.zip" "$PACKAGE_NAME" > /dev/null

# Move to root directory
mv "${PACKAGE_NAME}.tar.gz" ../
mv "${PACKAGE_NAME}.zip" ../

cd ..
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Package created successfully!"
echo ""
echo "📦 Distribution packages:"
echo "   - ${PACKAGE_NAME}.tar.gz"
echo "   - ${PACKAGE_NAME}.zip"
echo ""
echo "🎉 Ready for customer delivery!"
