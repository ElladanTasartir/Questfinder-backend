module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    'no-useless-return': 'off',
    'class-methods-use-this': 'off',
  },
};
