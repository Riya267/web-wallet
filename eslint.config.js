module.exports = [
  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['frontend/tsconfig.json', 'backend/tsconfig.json']
      },
      globals: {
        browser: 'readonly',
        es2021: 'readonly',
      },
    },
    
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];
