module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'no-debugger': 'error',
    'no-console': 'error',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/no-parsing-error': [
      'error',
      {
        'invalid-first-character-of-tag-name': false,
      },
    ],
    'vue/no-v-html': 'warn',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      // logger 유틸리티 파일에 대해 no-console 룰 비활성화
      files: ['packages/utils/src/logger.ts', 'packages/utils/src/env.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '*.d.ts',
    '*.config.js',
    '*.config.ts',
    '.eslintcache',
  ],
};
