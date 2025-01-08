import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'style/brace-style': ['error', '1tbs'],
      'style/arrow-parens': ['error', 'always'],
      'curly': ['error', 'all'],
      'antfu/consistent-list-newline': 'off',
      'ts/consistent-type-definitions': 'off',
      'no-undef': 'off',
    },
  },
  {
    ignores: ['.github/**'],
  },
)
