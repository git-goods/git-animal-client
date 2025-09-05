const nextConfig = require('@gitanimals/eslint-config/next.js');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...nextConfig,
  parserOptions: {
    ...nextConfig.parserOptions,
    project: './tsconfig.json',
  },
};