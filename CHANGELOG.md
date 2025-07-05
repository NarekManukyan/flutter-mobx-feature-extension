# Changelog

All notable changes to this project will be documented in this file.

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