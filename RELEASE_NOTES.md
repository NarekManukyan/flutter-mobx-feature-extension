# Flutter MobX Feature Scaffold v0.0.1 (Beta)

## 🎉 First Beta Release

This is the initial beta release of the Flutter MobX Feature Scaffold extension for VS Code.

## ✨ Features

- **Right-click context menu** - Create features directly from the file explorer
- **Automatic folder structure** - Creates the complete feature directory structure
- **MobX integration** - Generates MobX stores and state management with proper `@factoryParam` support
- **Provider pattern** - Uses Provider for dependency injection
- **Barrel files** - Creates export files for clean imports
- **Lazy singleton support** - Works with your existing lazy singleton pattern
- **Melos integration** - Optimized for monorepo workflows

## 🏗️ Generated Structure

```
feature_name/
├── mobx/
│   └── feature_name_store.dart
├── services/
│   └── feature_name_service.dart (placeholder)
├── models/
│   └── feature_name_model.dart (placeholder)
├── view/
│   ├── feature_name_state.dart
│   └── feature_name_page.dart
├── modals/
│   └── feature_name_modal.dart (placeholder)
└── feature_name.dart (barrel file)
```

## 🔧 Technical Improvements

- **MobX Pattern**: Uses `extends` pattern instead of `=` for better `@factoryParam` support
- **Injectable Integration**: Properly configured for dependency injection with factory parameters
- **Error Handling**: Added file existence checks and overwrite protection
- **Melos Support**: Updated to use `melos run generate` for code generation

## 🎯 Perfect for Flutter MobX Boilerplate

This extension is specifically designed to work with the [Flutter MobX Boilerplate](https://github.com/NarekManukyan/flutter_boilerplate) project structure:

- **Monorepo Support**: Works seamlessly with Melos-managed projects
- **Package Structure**: Aligns with the `packages/api` and `packages/design_system` structure
- **Dependency Injection**: Uses the same injectable pattern as the boilerplate
- **Code Generation**: Integrates with the boilerplate's build system

## 📦 Installation

1. Download the `flutter-mobx-feature-scaffold-0.0.1.vsix` file
2. In VS Code, go to Extensions (Ctrl+Shift+X)
3. Click the "..." menu and select "Install from VSIX..."
4. Choose the downloaded `.vsix` file

## 🚀 Usage

1. **Right-click** on a folder in the VS Code file explorer
2. Select **"Create MobX Feature"** from the context menu
3. Enter the feature name in **PascalCase** (e.g., `UserProfile`)
4. The extension will create the complete feature structure

## 🔄 Next Steps After Creating a Feature

1. **Run code generation:**
   ```bash
   melos run generate
   ```

2. **Register dependencies** in `injectable.dart`

3. **Implement your feature logic** in the generated files

## ⚠️ Beta Notice

This is a beta release. Please report any issues or suggestions on the GitHub repository.

## 🔗 Links

- [GitHub Repository](https://github.com/NarekManukyan/flutter-mobx-feature-extension)
- [Flutter MobX Boilerplate](https://github.com/NarekManukyan/flutter_boilerplate)

---

**Version**: 0.0.1 (Beta)  
**Release Date**: July 5, 2024  
**Author**: Narek Manukyan  
**License**: MIT 