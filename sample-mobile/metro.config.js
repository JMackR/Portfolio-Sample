const {getDefaultConfig} = require('metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const {
  getMetroTools,
  getMetroAndroidAssetsResolutionFix,
} = require('react-native-monorepo-tools');
const monorepoMetroTools = getMetroTools();

const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      // Apply the Android assets resolution fix to the public path...
      publicPath: androidAssetsResolutionFix.publicPath,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    server: {
      // ...and to the server middleware.
      enhanceMiddleware: middleware => {
        return androidAssetsResolutionFix.applyMiddleware(middleware);
      },
    },
    // Add additional Yarn workspace package roots to the module map.
    // This allows importing importing from all the project's packages.
    watchFolders: monorepoMetroTools.watchFolders,
    resolver: {
      // Ensure we resolve nohoist libraries from this directory.
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'json', 'svg'],
      blockList: exclusionList(monorepoMetroTools.blockList),
      extraNodeModules: monorepoMetroTools.extraNodeModules,
    },
  };
})();
