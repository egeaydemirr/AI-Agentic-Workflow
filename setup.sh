#!/bin/bash

# Koç Mobil Architecture - Setup Script
# This script installs all dependencies and prepares the project for development

echo "🚀 Setting up Koç Mobil React Native project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 22.11.0"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
echo "✓ Node.js version: $NODE_VERSION"

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Please install Yarn first."
    exit 1
fi

echo "✓ Yarn is installed"

# Install dependencies
echo ""
echo "📦 Installing JavaScript dependencies..."
yarn install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed successfully"

# Setup environment file
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✓ .env file created. Please update it with your configuration."
else
    echo "✓ .env file already exists"
fi

# iOS setup
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo ""
    echo "🍎 Setting up iOS dependencies..."
    
    if ! command -v pod &> /dev/null; then
        echo "⚠️  CocoaPods is not installed. Please install it with: sudo gem install cocoapods"
    else
        echo "📦 Installing CocoaPods dependencies..."
        cd ios
        pod install
        cd ..
        echo "✓ iOS dependencies installed"
    fi
else
    echo "⚠️  Skipping iOS setup (not on macOS)"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env file with your API configuration"
echo "  2. Run 'yarn ios' or 'yarn android' to start the app"
echo ""
