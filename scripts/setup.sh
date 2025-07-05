#!/bin/bash

# Flutter Feature Extension Setup Script

echo "🚀 Setting up Flutter Feature Extension..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Compile TypeScript
echo "🔨 Compiling TypeScript..."
npm run compile

echo "✅ Setup complete!"
echo ""
echo "To test the extension:"
echo "1. Press F5 in VS Code to launch extension in debug mode"
echo "2. Open your Flutter project"
echo "3. Right-click on a folder and select 'Create Flutter Feature'"
echo ""
echo "To package for distribution:"
echo "npm install -g vsce"
echo "vsce package" 