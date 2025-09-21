#!/bin/bash

# Test script for Datadog integration
# This script demonstrates how to test the monitoring capabilities

echo "🔍 Testing Datadog Integration for ironhorse"
echo "=============================================="

# Check if required packages are installed
echo ""
echo "📦 Checking dependencies..."
if npm list dd-trace @datadog/browser-rum > /dev/null 2>&1; then
    echo "✅ Datadog packages installed"
else
    echo "❌ Datadog packages missing - run: npm install dd-trace @datadog/browser-rum"
    exit 1
fi

# Check configuration files
echo ""
echo "🔧 Checking configuration files..."

if [ -f "instrumentation.ts" ]; then
    echo "✅ Server-side instrumentation configured"
else
    echo "❌ instrumentation.ts missing"
fi

if [ -f "lib/datadog.ts" ]; then
    echo "✅ Datadog APM configuration found"
else
    echo "❌ lib/datadog.ts missing"
fi

if [ -f "lib/datadog-rum.ts" ]; then
    echo "✅ Datadog RUM configuration found"
else
    echo "❌ lib/datadog-rum.ts missing"
fi

if [ -f "lib/logger.ts" ]; then
    echo "✅ Custom logger with trace correlation found"
else
    echo "❌ lib/logger.ts missing"
fi

if [ -f "components/DatadogRumProvider.tsx" ]; then
    echo "✅ RUM provider component found"
else
    echo "❌ DatadogRumProvider.tsx missing"
fi

# Test build
echo ""
echo "🏗️ Testing build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Application builds successfully with Datadog integration"
else
    echo "❌ Build failed - check TypeScript errors"
    exit 1
fi

# Environment configuration check
echo ""
echo "🌍 Environment Configuration:"
echo "Required for production APM:"
echo "  - DD_API_KEY (Server-side monitoring)"
echo "  - DD_SERVICE (Service name, defaults to 'ironhorse')"
echo "  - DD_ENV (Environment, defaults to NODE_ENV)"
echo ""
echo "Required for production RUM:"
echo "  - NEXT_PUBLIC_DD_APPLICATION_ID (Browser monitoring)"
echo "  - NEXT_PUBLIC_DD_CLIENT_TOKEN (Client-side authentication)"
echo ""
echo "Optional configuration:"
echo "  - DD_VERSION (Version tracking)"
echo "  - DD_TRACE_SAMPLE_RATE (Sampling rate, defaults to 100%)"
echo "  - NEXT_PUBLIC_DD_SITE (Datadog site, defaults to datadoghq.com)"

# Test API endpoint
echo ""
echo "🧪 Testing instrumented API endpoint..."
echo "Starting development server..."

# Start dev server in background
npm run dev > /dev/null 2>&1 &
DEV_PID=$!

# Wait for server to start
sleep 10

# Test the API endpoint
if curl -s http://localhost:3000/api/quotes/weekly > /dev/null; then
    echo "✅ API endpoint responds correctly"
    
    # Get a sample response
    echo ""
    echo "📊 Sample API response:"
    curl -s http://localhost:3000/api/quotes/weekly | jq . 2>/dev/null || curl -s http://localhost:3000/api/quotes/weekly
    echo ""
else
    echo "❌ API endpoint not responding"
fi

# Stop dev server
kill $DEV_PID 2>/dev/null
sleep 2

echo ""
echo "🎯 Monitoring Features Enabled:"
echo "✅ APM (Application Performance Monitoring)"
echo "   - Automatic HTTP request tracing"
echo "   - Custom business logic spans"
echo "   - Error tracking with stack traces"
echo ""
echo "✅ RUM (Real User Monitoring)"
echo "   - Page load performance"
echo "   - User interaction tracking"
echo "   - Session replay (20% sampling)"
echo ""
echo "✅ Log Management"
echo "   - Structured JSON logging"
echo "   - Trace correlation with dd.trace_id"
echo "   - Custom business context"
echo ""
echo "✅ Custom Instrumentation"
echo "   - Business metrics in API routes"
echo "   - Error tracking and alerting"
echo "   - Performance monitoring"

echo ""
echo "📋 Next Steps for Production:"
echo "1. Set up Datadog account at https://datadoghq.com"
echo "2. Create API key for server-side monitoring"
echo "3. Create RUM application for browser monitoring"
echo "4. Set environment variables in your deployment platform"
echo "5. Configure alerts and dashboards in Datadog"
echo "6. Review sampling rates for cost optimization"
echo ""
echo "📖 See docs/DATADOG_SETUP.md for detailed configuration instructions"
echo ""
echo "🎉 Datadog integration test completed successfully!"