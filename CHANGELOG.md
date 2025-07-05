# Changelog

All notable changes to this project will be documented in this file.

## [0.0.8] - 2024-07-05

### Added
- New "Create API Provider" command for generating complete API provider structures
- Support for Retrofit-based API providers with proper code generation
- Generated constants with status and type enums
- DTO models with Freezed and JSON serialization
- Update DTOs for API operations
- Proper export files for clean imports
- Context menu and command palette integration for API provider creation

## [0.0.7] - 2024-07-05
### Fixed
- Fixed variable naming in generated state files to use proper camelCase
- Changed from snake_case (`_user_settingsStore`) to camelCase (`_userSettingsStore`)
- This ensures generated code follows Dart naming conventions
- Affects the store variable names in state files

## [0.0.6] - 2024-07-05
### Fixed
- Fixed context menu visibility by using proper VS Code context conditions
- Changed from `resourceFolder && resourceScheme == file` to `explorerResourceIsFolder`
- Updated activation events to include `workspaceContains:**/pubspec.yaml`
- Used custom group name `mobxFeatureGroup@1` for better organization
- Based on successful patterns from KiritchoukC.flutter-clean-architecture extension

## [0.0.5] - 2024-07-05
### Improved
- Updated README to be user-focused, removing developer-specific information
- Improved extension activation and context menu visibility
- Added command palette entry for easier testing
- Enhanced troubleshooting section with user-friendly instructions

## [0.0.4] - 2024-07-05
### Fixed
- Fixed GitHub Actions permissions to allow creating releases
- Added explicit contents: write permission for release workflow

## [0.0.3] - 2024-07-05
### Fixed
- Fixed GitHub Actions workflow to use npx vsce for packaging
- Added @vscode/vsce as dev dependency for CI compatibility
- Improved release automation with proper changelog extraction

## [0.0.2] - 2024-07-05
### Added
- Automated GitHub Actions release workflow
- Version bump and release scripts
- Automatic VSIX packaging and upload to GitHub Releases
- Improved documentation and automation scripts

## [0.0.1] - 2024-07-05
### Added
- Initial beta release
- MobX feature scaffolding with injectable and @factoryParam support
- Right-click context menu integration
- Automatic folder structure generation
- Melos integration for monorepo workflows
- Error handling and file validation 