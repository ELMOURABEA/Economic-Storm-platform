#!/bin/bash

# Deployment Verification Script for Economic Storm Platform
# This script verifies that all services are running correctly

echo "═══════════════════════════════════════════════════════════"
echo "  Economic Storm Platform - Deployment Verification"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Test function
test_endpoint() {
    local name=$1
    local url=$2
    local expected_code=${3:-200}
    
    echo -n "Testing $name... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    
    if [ "$response" == "$expected_code" ]; then
        echo -e "${GREEN}✓ PASSED${NC} (HTTP $response)"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $response, expected $expected_code)"
        ((FAILED++))
        return 1
    fi
}

# Test JSON response
test_json_endpoint() {
    local name=$1
    local url=$2
    
    echo -n "Testing $name... "
    
    response=$(curl -s "$url" 2>/dev/null)
    
    if echo "$response" | grep -q "success"; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        echo "  Response: $response"
        ((FAILED++))
        return 1
    fi
}

echo "1. Testing Docker Services"
echo "──────────────────────────"

if command -v docker-compose &> /dev/null; then
    if docker-compose ps | grep -q "Up"; then
        echo -e "${GREEN}✓ Docker Compose services are running${NC}"
        ((PASSED++))
        
        # Show service status
        echo ""
        docker-compose ps
        echo ""
    else
        echo -e "${RED}✗ Docker Compose services are not running${NC}"
        echo "  Run: docker-compose up -d"
        ((FAILED++))
    fi
else
    echo -e "${YELLOW}⚠ Docker Compose not found - skipping container checks${NC}"
fi

echo ""
echo "2. Testing Backend API"
echo "──────────────────────────"

# Health check
test_endpoint "Backend Health" "http://localhost:5000/health"

# API info
test_endpoint "API Info" "http://localhost:5000/api"

# Projects endpoint
test_json_endpoint "Projects List" "http://localhost:5000/api/v1/projects"

# Marketing endpoint
test_json_endpoint "Marketing Campaigns" "http://localhost:5000/api/v1/marketing"

# Business Development endpoint
test_json_endpoint "Business Opportunities" "http://localhost:5000/api/v1/business"

# AI insights endpoint
test_json_endpoint "AI Insights" "http://localhost:5000/api/v1/ai/insights?topic=test"

echo ""
echo "3. Testing Frontend"
echo "──────────────────────────"

test_endpoint "Frontend Home" "http://localhost:3000"

echo ""
echo "4. Testing Database"
echo "──────────────────────────"

if command -v docker &> /dev/null; then
    if docker ps | grep -q "sqlserver"; then
        echo -e "${GREEN}✓ SQL Server container is running${NC}"
        ((PASSED++))
        
        # Test database connection
        echo -n "Testing Database Connection... "
        if docker exec economic-storm-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "${DB_PASSWORD:-EconomicStorm2024!}" -Q "SELECT 1" &> /dev/null; then
            echo -e "${GREEN}✓ PASSED${NC}"
            ((PASSED++))
        else
            echo -e "${RED}✗ FAILED${NC}"
            echo "  Cannot connect to SQL Server"
            ((FAILED++))
        fi
    else
        echo -e "${RED}✗ SQL Server container is not running${NC}"
        ((FAILED++))
    fi
else
    echo -e "${YELLOW}⚠ Docker not found - skipping database checks${NC}"
fi

echo ""
echo "5. Testing Advanced Features"
echo "──────────────────────────────"

# Test project creation
echo -n "Testing Project Creation... "
response=$(curl -s -X POST http://localhost:5000/api/v1/projects \
    -H "Content-Type: application/json" \
    -d '{
        "title": "Test Project",
        "description": "Automated test",
        "budget": 50000,
        "status": "active",
        "category": "Test"
    }' 2>/dev/null)

if echo "$response" | grep -q "success"; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
    
    # Extract project ID if available
    project_id=$(echo "$response" | grep -o '"project_id":[0-9]*' | grep -o '[0-9]*')
    
    if [ ! -z "$project_id" ]; then
        # Test project deletion
        echo -n "Testing Project Deletion... "
        delete_response=$(curl -s -X DELETE "http://localhost:5000/api/v1/projects/$project_id" 2>/dev/null)
        if echo "$delete_response" | grep -q "success"; then
            echo -e "${GREEN}✓ PASSED${NC}"
            ((PASSED++))
        else
            echo -e "${RED}✗ FAILED${NC}"
            ((FAILED++))
        fi
    fi
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi

# Test AI chat (if API key is configured)
echo -n "Testing AI Chat... "
chat_response=$(curl -s -X POST http://localhost:5000/api/v1/ai/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello"}' 2>/dev/null)

if echo "$chat_response" | grep -q "success"; then
    echo -e "${GREEN}✓ PASSED${NC}"
    ((PASSED++))
elif echo "$chat_response" | grep -q "API key"; then
    echo -e "${YELLOW}⚠ SKIPPED (Gemini API key not configured)${NC}"
else
    echo -e "${RED}✗ FAILED${NC}"
    ((FAILED++))
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  Verification Summary"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "Tests Passed: ${GREEN}$PASSED${NC}"
echo -e "Tests Failed: ${RED}$FAILED${NC}"
echo -e "Total Tests:  $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed! Deployment is successful.${NC}"
    echo ""
    echo "Your application is ready to use:"
    echo "  • Frontend:  http://localhost:3000"
    echo "  • Backend:   http://localhost:5000"
    echo "  • API Docs:  http://localhost:5000/api"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some tests failed. Please check the errors above.${NC}"
    echo ""
    echo "Common issues:"
    echo "  1. Services not started: run 'docker-compose up -d'"
    echo "  2. Database not initialized: run 'docker exec economic-storm-backend node scripts/init-database.js'"
    echo "  3. Wrong ports: check if ports 3000, 5000, 1433 are available"
    echo "  4. Gemini API key: set in backend/.env or .env for docker-compose"
    echo ""
    echo "For detailed troubleshooting, see:"
    echo "  • QUICK_START_BACKEND.md"
    echo "  • SQLSERVER_SETUP.md"
    echo "  • GEMINI_AI_SETUP.md"
    echo ""
    exit 1
fi
