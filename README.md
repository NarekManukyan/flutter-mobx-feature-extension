# Flutter MobX Feature Scaffold

A VS Code extension that helps you create Flutter features with MobX store, state, and view following the [Flutter MobX Boilerplate](https://github.com/NarekManukyan/flutter_boilerplate) architecture pattern.

## Features

- **Right-click context menu** - Create features directly from the file explorer
- **Automatic folder structure** - Creates the complete feature directory structure
- **MobX integration** - Generates MobX stores and state management
- **Provider pattern** - Uses Provider for dependency injection
- **Barrel files** - Creates export files for clean imports
- **Lazy singleton support** - Works with your existing lazy singleton pattern
- **Melos integration** - Optimized for monorepo workflows

## Quick Start

### Option 1: Development Installation (Recommended for testing)

1. **Clone this repository:**
   ```bash
   git clone <your-repo-url>
   cd flutter-mobx-feature-scaffold
   ```

2. **Run setup script:**
   ```bash
   npm run setup
   ```

3. **Open in VS Code and press F5** to launch the extension in debug mode

4. **Test the extension:**
   - Open your Flutter project
   - Right-click on a folder in the file explorer
   - Select "Create MobX Feature"
   - Enter a feature name (PascalCase)

### Option 2: Production Installation

1. **Package the extension:**
   ```bash
   npm install -g vsce
   npm run package
   ```

2. **Install the .vsix file:**
   - In VS Code, go to Extensions (Ctrl+Shift+X)
   - Click the "..." menu and select "Install from VSIX..."
   - Choose the generated `.vsix` file

## Usage

1. **Right-click** on a folder in the VS Code file explorer
2. Select **"Create MobX Feature"** from the context menu
3. Enter the feature name in **PascalCase** (e.g., `UserProfile`)
4. The extension will create the complete feature structure

## Generated Structure

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

## Generated Files

### Store (`mobx/feature_name_store.dart`)
- MobX store with `@injectable` annotation
- Lazy singleton pattern with `@factoryParam`
- Basic loading state management
- Disposable pattern

### State (`view/feature_name_state.dart`)
- State management layer
- Initializes the store with meeting ID
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

## Integration with Flutter MobX Boilerplate

This extension is specifically designed to work with the [Flutter MobX Boilerplate](https://github.com/NarekManukyan/flutter_boilerplate) project structure:

- **Monorepo Support**: Works seamlessly with Melos-managed projects
- **Package Structure**: Aligns with the `packages/api` and `packages/design_system` structure
- **Dependency Injection**: Uses the same injectable pattern as the boilerplate
- **Code Generation**: Integrates with the boilerplate's build system

## Troubleshooting

### Context Menu Not Showing

If you don't see "Create MobX Feature" in the context menu:

1. **Check if extension is loaded:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Developer: Show Running Extensions"
   - Look for "Flutter MobX Feature Scaffold"

2. **Reload VS Code:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Developer: Reload Window"

3. **Check extension logs:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Developer: Show Extension Logs"

### Development Mode

When testing in development mode:
- The extension runs in a separate VS Code window
- Make sure you're right-clicking in the **Extension Development Host** window
- Check the Debug Console for any error messages

## Requirements

- VS Code 1.74.0 or higher
- Flutter project with MobX and injectable dependencies
- Compatible with [Flutter MobX Boilerplate](https://github.com/NarekManukyan/flutter_boilerplate)

## Dependencies

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

## Next Steps After Creating a Feature

1. **Run code generation:**
   ```bash
   melos run generate
   ```

2. **Register dependencies** in `injectable.dart`

3. **Implement your feature logic** in the generated files

4. **Use the feature:**
   ```dart
   import 'package:app/features/feature_name/feature_name.dart';
   
   FeatureNamePage(meetingId: 'meeting-id')
   ```

## Development

### Available Scripts

- `npm run setup` - Install dependencies and compile
- `npm run compile` - Compile TypeScript
- `npm run watch` - Watch for changes and recompile
- `npm run package` - Create .vsix package
- `npm run publish` - Publish to VS Code Marketplace

### Project Structure

```
flutter-mobx-feature-scaffold/
├── src/
│   └── extension.ts          # Main extension logic
├── out/                      # Compiled JavaScript
├── scripts/
│   └── setup.sh             # Setup script
├── package.json             # Extension manifest
├── tsconfig.json            # TypeScript config
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

## License

MIT License 