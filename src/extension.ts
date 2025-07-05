import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('flutter-mobx-feature.createFeature', async (uri: vscode.Uri) => {
        try {
            await createFeature(uri);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create feature: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function createFeature(uri: vscode.Uri) {
    // Get feature name from user
    const featureName = await vscode.window.showInputBox({
        prompt: 'Enter feature name (PascalCase, e.g., UserProfile)',
        placeHolder: 'UserProfile',
        validateInput: (value) => {
            if (!value) {
                return 'Feature name is required';
            }
            if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
                return 'Feature name must be PascalCase (e.g., UserProfile)';
            }
            return null;
        }
    });

    if (!featureName) {
        return;
    }

    // Convert to snake_case for file names
    const featureNameSnake = featureName.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');

    // Determine the base path
    let basePath = uri.fsPath;
    
    // If we're in a features folder, use that as base
    if (path.basename(basePath) === 'features') {
        basePath = path.join(basePath, featureNameSnake);
    } else {
        // Look for features folder in the path
        const pathParts = basePath.split(path.sep);
        const featuresIndex = pathParts.findIndex(part => part === 'features');
        
        if (featuresIndex !== -1) {
            basePath = path.join(...pathParts.slice(0, featuresIndex + 1), featureNameSnake);
        } else {
            // Default to creating in current directory
            basePath = path.join(basePath, featureNameSnake);
        }
    }

    // Check if directory already exists
    if (fs.existsSync(basePath)) {
        const overwrite = await vscode.window.showWarningMessage(
            `Feature directory '${featureNameSnake}' already exists. Do you want to overwrite it?`,
            'Yes', 'No'
        );
        if (overwrite !== 'Yes') {
            return;
        }
        // Remove existing directory
        fs.rmSync(basePath, { recursive: true, force: true });
    }

    try {
        // Create directory structure
        const directories = ['mobx', 'services', 'models', 'view', 'modals'];
        for (const dir of directories) {
            const dirPath = path.join(basePath, dir);
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Create Store file
        const storeContent = generateStoreContent(featureName, featureNameSnake);
        const storePath = path.join(basePath, 'mobx', `${featureNameSnake}_store.dart`);
        fs.writeFileSync(storePath, storeContent);

        // Create State file
        const stateContent = generateStateContent(featureName, featureNameSnake);
        const statePath = path.join(basePath, 'view', `${featureNameSnake}_state.dart`);
        fs.writeFileSync(statePath, stateContent);

        // Create Page file
        const pageContent = generatePageContent(featureName, featureNameSnake);
        const pagePath = path.join(basePath, 'view', `${featureNameSnake}_page.dart`);
        fs.writeFileSync(pagePath, pageContent);

        // Create barrel file
        const barrelContent = generateBarrelContent(featureName, featureNameSnake);
        const barrelPath = path.join(basePath, `${featureNameSnake}.dart`);
        fs.writeFileSync(barrelPath, barrelContent);

        // Create placeholder files
        const placeholderFiles = [
            path.join(basePath, 'services', `${featureNameSnake}_service.dart`),
            path.join(basePath, 'models', `${featureNameSnake}_model.dart`),
            path.join(basePath, 'modals', `${featureNameSnake}_modal.dart`)
        ];

        for (const filePath of placeholderFiles) {
            fs.writeFileSync(filePath, `// TODO: Implement ${path.basename(filePath)}\n`);
        }

        // Show success message
        vscode.window.showInformationMessage(`✅ MobX Feature '${featureName}' created successfully!`);

        // Open the store file
        const storeUri = vscode.Uri.file(storePath);
        await vscode.window.showTextDocument(storeUri);

        // Show next steps
        const nextSteps = [
            '1. Run code generation: melos run generate',
            '2. Register dependencies in injectable.dart',
            '3. Implement your feature logic'
        ];

        vscode.window.showInformationMessage(`Next steps:\n${nextSteps.join('\n')}`);

    } catch (error) {
        vscode.window.showErrorMessage(`Failed to create feature files: ${error}`);
        throw error;
    }
}

function generateStoreContent(featureName: string, featureNameSnake: string): string {
    return `import 'package:api/api.dart';
import 'package:injectable/injectable.dart';
import 'package:mobx/mobx.dart';

import '../../../../../../../core/services/dio_service.dart';

part '${featureNameSnake}_store.g.dart';

@injectable
class ${featureName}Store extends _${featureName}StoreBase
    with _\$${featureName}Store {
  ${featureName}Store(
    DioService dioService,
    @factoryParam String id,
  ) : super(dioService, id);
}

abstract class _${featureName}StoreBase with Store {
  final DioService _dioService;
  final String _id;

  _${featureName}StoreBase(
    this._dioService,
    this._id,
  );

  @readonly
  bool _isLoading = false;

  @computed
  bool get isLoading => _isLoading;

  @action
  Future<void> loadData() async {
    _isLoading = true;
    try {
      // TODO: Implement data loading logic
    } finally {
      _isLoading = false;
    }
  }

  void dispose() {
    // TODO: Clean up resources
  }
}`;
}

function generateStateContent(featureName: string, featureNameSnake: string): string {
    // Convert snake_case to camelCase for variable names
    const featureNameCamel = featureNameSnake.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    
    return `import 'package:injectable/injectable.dart';
import 'package:mobx/mobx.dart';

import '../mobx/${featureNameSnake}_store.dart';

part '${featureNameSnake}_state.g.dart';

@injectable
class ${featureName}State extends _${featureName}StateBase
    with _\$${featureName}State {
  ${featureName}State() : super();
}

abstract class _${featureName}StateBase with Store {
  late final ${featureName}Store _${featureNameCamel}Store;

  _${featureName}StateBase();

  @computed
  bool get isLoading => _${featureNameCamel}Store.isLoading;  

  void dispose() {
    _${featureNameCamel}Store.dispose();
  }
}`;
}

function generatePageContent(featureName: string, featureNameSnake: string): string {
    return `import 'package:design_system/design_system.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';

import '../../../../../injectable.dart';
import '${featureNameSnake}_state.dart';

class ${featureName}Page extends StatelessWidget {
  const ${featureName}Page({
    super.key,
    required this.id,
  });

  final String id;

  @override
  Widget build(BuildContext context) {
    return Provider<${featureName}State>(
      create: (_) => getIt<${featureName}State>(
        param1: id,
      ),
      dispose: (_, state) => state.dispose(),
      child: const _${featureName}PageContent(),
    );
  }
}

class _${featureName}PageContent extends StatelessWidget {
  const _${featureName}PageContent();

  @override
  Widget build(BuildContext context) {
    final state = context.read<${featureName}State>();

    return Observer(
      builder: (context) {
        if (state.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        return const Center(
          child: Text('${featureName} Content'),
        );
      },
    );
  }
}`;
}

function generateBarrelContent(featureName: string, featureNameSnake: string): string {
    return `// ${featureName} Feature
export 'mobx/${featureNameSnake}_store.dart';
export 'services/${featureNameSnake}_service.dart';
export 'models/${featureNameSnake}_model.dart';
export 'view/${featureNameSnake}_page.dart';
export 'view/${featureNameSnake}_state.dart';
export 'modals/${featureNameSnake}_modal.dart';`;
}

export function deactivate() {} 