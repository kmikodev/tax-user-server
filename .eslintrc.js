module.exports = {
  env: {
    es6: true,
    node: true
  },
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ],
    indent: 0,
    curly: ['error', 'all'],
    'import/prefer-default-export': 'off',
    'no-alert': 'error',
    'no-debugger': 'error',
    'no-undef': 'error',

    'linebreak-style': 'off',

    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'none'
      }
    ]
  }
};
