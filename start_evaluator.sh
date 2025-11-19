#!/bin/bash

# Mathematical Approximation Evaluator with OpenRouter AI
# Startup script

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                              ║"
echo "║    ███████╗██╗   ██╗ █████╗ ██╗     ██╗   ██╗ █████╗ ████████╗ ██████╗ ██████╗║"
echo "║    ██╔════╝██║   ██║██╔══██╗██║     ██║   ██║██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗║"
echo "║    █████╗  ██║   ██║███████║██║     ██║   ██║███████║   ██║   ██║   ██║██████╔╝║"
echo "║    ██╔══╝  ╚██╗ ██╔╝██╔══██║██║     ██║   ██║██╔══██║   ██║   ██║   ██║██╔══██╗║"
echo "║    ███████╗ ╚████╔╝ ██║  ██║███████╗╚██████╔╝██║  ██║   ██║   ╚██████╔╝██║  ██║║"
echo "║    ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝║"
echo "║                                                                              ║"
echo "║    Mathematical Approximation Evaluator                                     ║"
echo "║    Powered by OpenRouter AI & Claude 3.5 Sonnet                            ║"
echo "║                                                                              ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from template..."
    if [ -f "env_example.txt" ]; then
        cp env_example.txt .env
        echo "📝 Created .env file from template"
        echo "🔑 Please edit .env and add your OPENROUTER_API_KEY"
        echo "   Get your API key from: https://openrouter.ai/keys"
        echo ""
        read -p "Press Enter after you've added your API key to .env..."
    else
        echo "❌ No env_example.txt found. Please create .env manually with:"
        echo "   OPENROUTER_API_KEY=your_key_here"
        exit 1
    fi
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    if [ -f "evaluator_package.json" ]; then
        cp evaluator_package.json package.json
    fi
    npm install
    echo ""
fi

echo "🚀 Starting Mathematical Evaluator..."
echo "┌─ Backend API: http://localhost:3001"
echo "├─ Frontend: http://localhost:3001"
echo "├─ OpenRouter AI: Claude 3.5 Sonnet"
echo "└─ Press Ctrl+C to stop"
echo ""

# Start the evaluator backend
node evaluator_backend.js
