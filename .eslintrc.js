module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'babel',
    '@typescript-eslint'
  ],
  extends: [
    '@nuxtjs',
    'eslint:recommended'
  ],
  rules: {
    'vue/no-v-html': 0,
    'eol-last': ['error', 'always'],
    'no-console': [2, { allow: ['warn', 'error'] }],
    semi: ['error', 'always'],
    'no-unused-expressions': 0,
    'babel/no-unused-expressions': 1,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  },
  ignorePatterns: ['global-components.plugin.js']
};
