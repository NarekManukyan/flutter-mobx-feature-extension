import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable1 = vscode.commands.registerCommand('flutter-mobx-feature.createFeature', async (uri: vscode.Uri) => {
        try {
            await createFeature(uri);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create feature: ${error}`);
        }
    });

    let disposable2 = vscode.commands.registerCommand('flutter-mobx-feature.createApiProvider', async (uri: vscode.Uri) => {
        try {
            await createApiProvider(uri);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create API provider: ${error}`);
        }
    });

    context.subscriptions.push(disposable1, disposable2);
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

async function createApiProvider(uri: vscode.Uri) {
    // Get provider name from user
    const providerName = await vscode.window.showInputBox({
        prompt: 'Enter API provider name (snake_case, e.g., user_profile)',
        placeHolder: 'user_profile',
        validateInput: (value) => {
            if (!value) {
                return 'Provider name is required';
            }
            if (!/^[a-z][a-z0-9_]*$/.test(value)) {
                return 'Provider name must be snake_case (e.g., user_profile)';
            }
            return null;
        }
    });

    if (!providerName) {
        return;
    }

    // Convert to PascalCase for class names
    const providerNamePascal = providerName.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
        .replace(/^[a-z]/, letter => letter.toUpperCase());

    // Determine the base path
    let basePath = uri.fsPath;
    
    // Look for providers folder in the path
    const pathParts = basePath.split(path.sep);
    const providersIndex = pathParts.findIndex(part => part === 'providers');
    
    if (providersIndex !== -1) {
        basePath = path.join(...pathParts.slice(0, providersIndex + 1), providerName);
    } else {
        // Default to creating in current directory
        basePath = path.join(basePath, providerName);
    }

    // Check if directory already exists
    if (fs.existsSync(basePath)) {
        const overwrite = await vscode.window.showWarningMessage(
            `API provider directory '${providerName}' already exists. Do you want to overwrite it?`,
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
        const directories = ['constants/src', 'models/src'];
        for (const dir of directories) {
            const dirPath = path.join(basePath, dir);
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Create main API provider file
        const apiProviderContent = generateApiProviderContent(providerName, providerNamePascal);
        const apiProviderPath = path.join(basePath, `${providerName}_api_provider.dart`);
        fs.writeFileSync(apiProviderPath, apiProviderContent);

        // Create main export file
        const exportContent = generateApiProviderExportContent(providerName);
        const exportPath = path.join(basePath, `${providerName}_provider.dart`);
        fs.writeFileSync(exportPath, exportContent);

        // Create constants files
        const statusContent = generateStatusEnumContent(providerName, providerNamePascal);
        const statusPath = path.join(basePath, 'constants/src', `${providerName}_status.dart`);
        fs.writeFileSync(statusPath, statusContent);

        const typeContent = generateTypeEnumContent(providerName, providerNamePascal);
        const typePath = path.join(basePath, 'constants/src', `${providerName}_type.dart`);
        fs.writeFileSync(typePath, typeContent);

        const constantsExportContent = generateConstantsExportContent(providerName);
        const constantsExportPath = path.join(basePath, 'constants', 'constants.dart');
        fs.writeFileSync(constantsExportPath, constantsExportContent);

        // Create models files
        const dtoContent = generateDtoContent(providerName, providerNamePascal);
        const dtoPath = path.join(basePath, 'models/src', `${providerName}_dto.dart`);
        fs.writeFileSync(dtoPath, dtoContent);

        const updateDtoContent = generateUpdateDtoContent(providerName, providerNamePascal);
        const updateDtoPath = path.join(basePath, 'models/src', `update_${providerName}_dto.dart`);
        fs.writeFileSync(updateDtoPath, updateDtoContent);

        const modelsExportContent = generateModelsExportContent(providerName);
        const modelsExportPath = path.join(basePath, 'models', 'models.dart');
        fs.writeFileSync(modelsExportPath, modelsExportContent);

        // Show success message
        vscode.window.showInformationMessage(`✅ API Provider '${providerNamePascal}' created successfully!`);

        // Open the main API provider file
        const apiProviderUri = vscode.Uri.file(apiProviderPath);
        await vscode.window.showTextDocument(apiProviderUri);

        // Show next steps
        const nextSteps = [
            '1. Run code generation: melos run generate',
            '2. Add endpoints to _Paths class',
            '3. Implement API methods',
            '4. Add to your Dio configuration'
        ];

        vscode.window.showInformationMessage(`Next steps:\n${nextSteps.join('\n')}`);

    } catch (error) {
        vscode.window.showErrorMessage(`Failed to create API provider files: ${error}`);
        throw error;
    }
}

function generateApiProviderContent(providerName: string, providerNamePascal: string): string {
    return `import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';
import '../../../api.dart';

part '${providerName}_api_provider.g.dart';

class _Paths {
  static const ${providerName} = '/${providerName}';
  static const ${providerName}s = '/${providerName}s';
  _Paths._();
}

@RestApi()
sealed class ${providerNamePascal}Provider {
  factory ${providerNamePascal}Provider(Dio dio) = _${providerNamePascal}Provider;

  @GET(_Paths.${providerName}s)
  Future<List<${providerNamePascal}Dto>> get${providerNamePascal}s(
    @Query('page') int? page,
    @Query('limit') int? limit,
  );

  @GET(_Paths.${providerName})
  Future<${providerNamePascal}Dto> get${providerNamePascal}(
    @Query('id') String id,
  );

  @POST(_Paths.${providerName})
  Future<${providerNamePascal}Dto> create${providerNamePascal}(
    @Body() ${providerNamePascal}Dto ${providerName}Dto,
  );

  @PUT(_Paths.${providerName})
  Future<void> update${providerNamePascal}(
    @Body() Update${providerNamePascal}Dto update${providerNamePascal}Dto,
  );

  @DELETE(_Paths.${providerName})
  Future<void> delete${providerNamePascal}(
    @Query('id') String id,
  );
}`;
}

function generateApiProviderExportContent(providerName: string): string {
    return `export 'constants/constants.dart';
export 'models/models.dart';
export '${providerName}_api_provider.dart';`;
}

function generateStatusEnumContent(providerName: string, providerNamePascal: string): string {
    return `enum ${providerNamePascal}Status {
  active,
  inactive,
  pending,
  completed,
  cancelled,
}`;
}

function generateTypeEnumContent(providerName: string, providerNamePascal: string): string {
    return `enum ${providerNamePascal}Type {
  type1,
  type2,
  type3,
}`;
}

function generateConstantsExportContent(providerName: string): string {
    return `export 'src/${providerName}_status.dart';
export 'src/${providerName}_type.dart';`;
}

function generateDtoContent(providerName: string, providerNamePascal: string): string {
    return `import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:json_annotation/json_annotation.dart';

part '${providerName}_dto.g.dart';
part '${providerName}_dto.freezed.dart';

@freezed
class ${providerNamePascal}Dto with _$${providerNamePascal}Dto {
  const factory ${providerNamePascal}Dto({
    required String id,
    required String name,
    String? description,
    @JsonKey(name: 'created_at') required DateTime createdAt,
    @JsonKey(name: 'updated_at') required DateTime updatedAt,
  }) = _${providerNamePascal}Dto;

  factory ${providerNamePascal}Dto.fromJson(Map<String, dynamic> json) =>
      _$${providerNamePascal}DtoFromJson(json);

  factory ${providerNamePascal}Dto.fake() => ${providerNamePascal}Dto(
    id: 'fake-id',
    name: 'Fake ${providerNamePascal}',
    description: 'This is a fake ${providerName} for testing',
    createdAt: DateTime.now(),
    updatedAt: DateTime.now(),
  );
}`;
}

function generateUpdateDtoContent(providerName: string, providerNamePascal: string): string {
    return `import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:json_annotation/json_annotation.dart';

part 'update_${providerName}_dto.g.dart';
part 'update_${providerName}_dto.freezed.dart';

@freezed
class Update${providerNamePascal}Dto with _$${providerNamePascal}UpdateDto {
  const factory Update${providerNamePascal}Dto({
    String? name,
    String? description,
  }) = _${providerNamePascal}UpdateDto;

  factory Update${providerNamePascal}Dto.fromJson(Map<String, dynamic> json) =>
      _$${providerNamePascal}UpdateDtoFromJson(json);
}`;
}

function generateModelsExportContent(providerName: string): string {
    return `export 'src/${providerName}_dto.dart';
export 'src/update_${providerName}_dto.dart';`;
}

export function deactivate() {} 