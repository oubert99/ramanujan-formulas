#!/bin/bash

# Ramajan - Integrated React + OpenRouter AI Evaluator
# Start script for the complete application

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                              ║"
echo "║    ██████╗  █████╗ ███╗   ███╗ █████╗      ██╗ █████╗ ███╗   ██╗           ║"
echo "║    ██╔══██╗██╔══██╗████╗ ████║██╔══██╗     ██║██╔══██╗████╗  ██║           ║"
echo "║    ██████╔╝███████║██╔████╔██║███████║     ██║███████║██╔██╗ ██║           ║"
echo "║    ██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║██   ██║██╔══██║██║╚██╗██║           ║"
echo "║    ██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║╚█████╔╝██║  ██║██║ ╚████║           ║"
echo "║    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝           ║"
echo "║                                                                              ║"
echo "║    Mathematical Approximation Evaluator with OpenRouter AI                  ║"
echo "║    React Frontend + Node.js Backend + AI Evaluation                         ║"
echo "║                                                                              ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from template..."
    cp env-example.txt .env
    echo "📝 Created .env file from template"
    echo "🔑 Please edit .env and add your OPENROUTER_API_KEY"
    echo "   Get your API key from: https://openrouter.ai/keys"
    echo ""
fi

# Install server dependencies
echo "📦 Installing server dependencies..."
if [ -f "server-package.json" ]; then
    cp server-package.json package.json
fi

npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi

# Build client for production
echo "🔨 Building React client..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build client"
    exit 1
fi

cd ..

echo ""
echo "🚀 Starting Ramajan Integrated Application..."
echo "┌─ Backend API: http://localhost:5000"
echo "├─ Frontend: http://localhost:5000"
echo "├─ OpenRouter AI: Gemini 3 Pro Preview"
echo "└─ Press Ctrl+C to stop"
echo ""

# Start the server
node server.js
