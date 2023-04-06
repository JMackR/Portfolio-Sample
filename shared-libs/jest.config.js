// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  displayName: 'react',
  clearMocks: true,
  coverageDirectory: 'coverage',

  coverageReporters: [
    //   "json",
    'text',
    'html',
    //   "lcov",
    //   "clover"
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: './tsconfig.json',
    },
  },

  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  setupFilesAfterEnv: ['<rootDir>/sampleclient/shared-libs/jest.setup.ts', 'jest-canvas-mock'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  transformIgnorePatterns: ['/node_modules/'],
  rootDir: '../../',
  roots: ['<rootDir>/quoting/client'],
  testPathIgnorePatterns: ['__snapshots__'],
  testMatch: ['<rootDir>/**/__tests__/*.web.test.*', '<rootDir>/**/__tests__/*.core.test.*'],
  reporters: ['default', 'jest-junit'],
  testEnvironment: 'jsdom',
}
