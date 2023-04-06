/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

const { getDefaultIgnorePatterns } = require('@sample/eslint-config-bases/helpers')

module.exports = {
  root: true,
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@sample/eslint-config-bases/typescript',
    // '@sample/eslint-config-bases/jest',
    '@sample/eslint-config-bases/react',
    // Apply prettier and disable incompatible rules
    '@sample/eslint-config-bases/prettier',
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
}
