const jestPreset = require('@testing-library/jest-native')

module.exports = {
  projects: [
    {
      displayName: 'rntl',
      preset: '@testing-library/react-native',
      setupFiles: ['./jestSetup.js', '../node_modules/react-native-gesture-handler/jestSetup.js'],
      transform: {
        '^.+\\.js$': '<rootDir>/../node_modules/react-native/jest/preprocessor.js',
      },
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|react-navigation|@react-navigation/.*|@react-native-community/masked-view|@react-native-async-storage/async-storage|))',
      ],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      moduleNameMapper: {
        '@sample': '<rootDir>/../shared-libs/controls',
      },
      testMatch: ['<rootDir>/**/*.rntl.test.*'],
      testPathIgnorePatterns: ['/node_modules/'],
    },
    {
      displayName: 'rn',
      setupFiles: ['./jestSetup.js', '../node_modules/react-native-gesture-handler/jestSetup.js'],
      preset: 'react-native',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      testMatch: ['<rootDir>/**/*rn.test.*'],
      moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      },
    },
  ],
  rootDir: '../',
  testPathIgnorePatterns: ['<rootDir>/e2e/', '<rootDir>/node_modules/'],
  reporters: ['default', 'jest-junit'],
}
