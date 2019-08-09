module.exports = {
  env: {
    commonjs: true,
    es6: true,
    'jest/globals': true
  },
  extends: [
    'eslint-config-jobteaser'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
    },
    ecmaVersion: 2018
  },
  plugins: ['jest'],
  rules: {
    // we don't want to add a dependency for logging for such a small project
    // so we will do the logging with console
    'no-console': 0
  }
}
