# Flutter MobX Feature Scaffold

A VS Code extension that helps you create Flutter features with MobX store, state, and view following the [Flutter MobX Boilerplate](https://github.com/NarekManukyan/flutter_boilerplate) architecture pattern.

## ✨ Features

- **Right-click context menu** - Create features directly from the file explorer
- **Automatic folder structure** - Creates the complete feature directory structure
- **MobX integration** - Generates MobX stores and state management with `@factoryParam` support
- **Provider pattern** - Uses Provider for dependency injection
- **Barrel files** - Creates export files for clean imports
- **Injectable integration** - Works with your existing dependency injection pattern
- **Melos integration** - Optimized for monorepo workflows
- **Error handling** - File validation and overwrite protection

## 🚀 Quick Start

### Installation

1. **Download the VSIX file** from the [GitHub releases](https://github.com/NarekManukyan/flutter-mobx-feature-extension/releases)
2. **Open VS Code**
3. **Go to Extensions** (`Ctrl+Shift+X` or `Cmd+Shift+X`)
4. **Click the "..." menu** and select "Install from VSIX..."
5. **Choose the downloaded `.vsix` file**

### Usage

1. **Right-click** on a folder in the VS Code file explorer
2. Select **"Create MobX Feature"** from the context menu
3. Enter the feature name in **PascalCase** (e.g., `UserProfile`)
4. The extension will create the complete feature structure

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

## 📄 Generated Files

### Store (`mobx/feature_name_store.dart`)
- MobX store with `@injectable` annotation
- Uses `extends` pattern for better `@factoryParam` support
- Basic loading state management with `@readonly`
- Disposable pattern

### State (`view/feature_name_state.dart`)
- State management layer
- Initializes the store with factory parameters
- Exposes store properties as computed values
- Proper disposal handling

### Page (`view/feature_name_page.dart`)
- Flutter widget with Provider pattern
- Observer for reactive UI updates
- Loading state handling
- Clean separation of concerns

### Barrel File (`feature_name.dart`)
- Exports all feature components
- Clean import statements
- Easy to use in other parts of the app

## 🎯 Integration with Flutter MobX Boilerplate

This extension is specifically designed to work with the [Flutter MobX Boilerplate](https://github.com/NarekManukyan/flutter_boilerplate) project structure:

- **Monorepo Support**: Works seamlessly with Melos-managed projects
- **Package Structure**: Aligns with the `packages/api` and `packages/design_system` structure
- **Dependency Injection**: Uses the same injectable pattern with `@factoryParam` support
- **Code Generation**: Integrates with the boilerplate's build system
- **MobX Patterns**: Uses the same `extends` pattern as your boilerplate

## 🔄 Next Steps After Creating a Feature

1. **Run code generation:**
   ```bash
   melos run generate
   ```

2. **Register dependencies** in `injectable.dart`

3. **Implement your feature logic** in the generated files

4. **Use the feature:**
   ```dart
   import 'package:app/features/feature_name/feature_name.dart';
   
   FeatureNamePage(id: 'feature-id')
   ```

## ⚙️ Requirements

- VS Code 1.74.0 or higher
- Flutter project with MobX and injectable dependencies
- Compatible with [Flutter MobX Boilerplate](https://github.com/NarekManukyan/flutter_boilerplate)
- Melos for monorepo management (recommended)

## 📦 Dependencies

Your Flutter project should have these dependencies (as in the boilerplate):

```yaml
dependencies:
  mobx: ^2.0.0
  flutter_mobx: ^2.0.0
  injectable: ^2.0.0
  provider: ^6.0.0

dev_dependencies:
  build_runner: ^2.0.0
  mobx_codegen: ^2.0.0
  injectable_generator: ^2.0.0
```

## 🆘 Troubleshooting

### Context Menu Not Showing

If you don't see "Create MobX Feature" in the context menu:

1. **Check if extension is loaded:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Developer: Show Running Extensions"
   - Look for "Flutter MobX Feature Scaffold"

2. **Reload VS Code:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Developer: Reload Window"

3. **Try Command Palette:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Create MobX Feature"
   - Run the command directly

### Extension Not Working

- Make sure you're right-clicking on a **folder** (not a file)
- Ensure you have a Flutter project open
- Check that the extension is properly installed

## 🆕 Beta Release

This is currently a **beta release (v0.0.4)**. Please report any issues or suggestions on the [GitHub repository](https://github.com/NarekManukyan/flutter-mobx-feature-extension).

## 📄 License

MIT License
