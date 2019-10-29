module.exports = {
  'env': {
    'browser': true,
    'jest': true,
    'es6': true,
    'node': true,
    'webextensions': true,
  },
  'extends': [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  },
  'rules': {
    '@typescript-eslint/indent': false,
    '@typescript-eslint/explicit-function-return-type': false,
    "@typescript-eslint/camelcase": ["error", { "ignoreDestructuring": "true" }],
    '@typescript-eslint/no-parameter-properties': false,
    '@typescript-eslint/explicit-member-accessibility': false,

    'jsx-a11y/label-has-for': false,
    'jsx-a11y/label-has-associated-control': [2, {
      'controlComponents': ['Flatpickr']
    }],

    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'react/prop-types': false,
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
