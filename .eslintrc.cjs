module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Правила Feature-Sliced Design
    'import/no-cycle': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/no-named-export': 'off',
    'import/no-unused-modules': [
      'error',
      {
        unusedExports: true,
        missingExports: true,
        ignoreExports: ['**/*.types.ts'],
      },
    ],

    // Правила TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Правила React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
