module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@ts-gql'],
  extends: [
    'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'universe/native',
  ],
  rules: {
    '@ts-gql/ts-gql': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
  }
};
