const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules/.pnpm/node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

// 웹과 같이 1rem = 16px 로 계산해 h-8 이 32 가 되게 한다 (NativeWind 기본은 14)
module.exports = withNativeWind(config, { input: './global.css', inlineRem: 16 });
