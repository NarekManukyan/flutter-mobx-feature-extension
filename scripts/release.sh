#!/bin/bash

# Read current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
EXTENSION_NAME=$(node -p "require('./package.json').name")
VSIX_FILE="${EXTENSION_NAME}-${CURRENT_VERSION}.vsix"

echo "🚀 Flutter MobX Feature Scaffold - Release Manager"
echo "=================================================="
echo ""

echo "📦 Extension: $EXTENSION_NAME"
echo "🏷️  Current Version: $CURRENT_VERSION"
echo ""

# Function to bump version
bump_version() {
    local version_type=$1
    local new_version
    
    case $version_type in
        "patch")
            new_version=$(npm version patch --no-git-tag-version | sed 's/v//')
            ;;
        "minor")
            new_version=$(npm version minor --no-git-tag-version | sed 's/v//')
            ;;
        "major")
            new_version=$(npm version major --no-git-tag-version | sed 's/v//')
            ;;
        *)
            echo "❌ Invalid version type. Use: patch, minor, or major"
            exit 1
            ;;
    esac
    
    echo "✅ Version bumped to: $new_version"
    return 0
}

# Function to create release
create_release() {
    echo ""
    echo "📋 Creating release for version: $CURRENT_VERSION"
    echo ""
    
    # Compile and package
    echo "🔨 Compiling TypeScript..."
    npm run compile
    
    echo "📦 Creating VSIX package..."
    npm run package
    
    echo "✅ VSIX file created: $VSIX_FILE"
    echo ""
    
    # Check if tag exists
    if git tag -l "v$CURRENT_VERSION" | grep -q "v$CURRENT_VERSION"; then
        echo "🏷️  Tag v$CURRENT_VERSION already exists"
    else
        echo "🏷️  Creating tag v$CURRENT_VERSION..."
        git tag -a "v$CURRENT_VERSION" -m "Release v$CURRENT_VERSION - Flutter MobX Feature Scaffold"
    fi
    
    echo ""
    echo "📋 Next Steps for GitHub Release:"
    echo "1. Go to: https://github.com/NarekManukyan/flutter-mobx-feature-extension"
    echo "2. Click 'Releases' in the right sidebar"
    echo "3. Click 'Create a new release'"
    echo "4. Select tag: v$CURRENT_VERSION"
    echo "5. Set title: 'Flutter MobX Feature Scaffold v$CURRENT_VERSION (Beta)'"
    echo "6. Copy the content from RELEASE_NOTES.md for description"
    echo "7. Upload the VSIX file: $VSIX_FILE"
    echo "8. Check 'This is a pre-release' (since it's beta)"
    echo "9. Click 'Publish release'"
    echo ""
    
    echo "📦 VSIX file details:"
    ls -lh "$VSIX_FILE"
    echo ""
}

# Main script logic
case "${1:-}" in
    "bump-patch")
        bump_version "patch"
        ;;
    "bump-minor")
        bump_version "minor"
        ;;
    "bump-major")
        bump_version "major"
        ;;
    "release")
        create_release
        ;;
    "help"|"-h"|"--help"|"")
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  bump-patch    Bump patch version (0.0.1 -> 0.0.2)"
        echo "  bump-minor    Bump minor version (0.0.1 -> 0.1.0)"
        echo "  bump-major    Bump major version (0.0.1 -> 1.0.0)"
        echo "  release       Create release for current version"
        echo "  help          Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 bump-patch    # Bump to next patch version"
        echo "  $0 release       # Create release for current version"
        echo ""
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac 