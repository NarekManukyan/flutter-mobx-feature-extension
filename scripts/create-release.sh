#!/bin/bash

# Read version from package.json
VERSION=$(node -p "require('./package.json').version")
EXTENSION_NAME=$(node -p "require('./package.json').name")
VSIX_FILE="${EXTENSION_NAME}-${VERSION}.vsix"

echo "🚀 Flutter MobX Feature Scaffold - Release Helper"
echo "=================================================="
echo ""

echo "📦 Extension: $EXTENSION_NAME"
echo "🏷️  Version: $VERSION"
echo "📁 VSIX File: $VSIX_FILE"
echo ""

# Check if VSIX file exists
if [ ! -f "$VSIX_FILE" ]; then
    echo "❌ VSIX file not found. Creating it now..."
    npm run package
fi

echo "✅ VSIX file ready: $VSIX_FILE"
echo ""

echo "📋 Next Steps for GitHub Release:"
echo "1. Go to: https://github.com/NarekManukyan/flutter-mobx-feature-extension"
echo "2. Click 'Releases' in the right sidebar"
echo "3. Click 'Create a new release'"
echo "4. Select tag: v$VERSION (already exists)"
echo "5. Set title: 'Flutter MobX Feature Scaffold v$VERSION (Beta)'"
echo "6. Copy the content from RELEASE_NOTES.md for description"
echo "7. Upload the VSIX file: $VSIX_FILE"
echo "8. Check 'This is a pre-release' (since it's beta)"
echo "9. Click 'Publish release'"
echo ""

echo "📦 VSIX file details:"
ls -lh "$VSIX_FILE"
echo ""

echo "📝 Release notes are in: RELEASE_NOTES.md"
echo ""

echo "🎯 After release, users can:"
echo "1. Download the .vsix file from your GitHub release"
echo "2. Open VS Code"
echo "3. Go to Extensions (Ctrl+Shift+X)"
echo "4. Click '...' menu → 'Install from VSIX...'"
echo "5. Select the downloaded file"
echo ""

echo "✨ Your extension will then be available in VS Code!" 