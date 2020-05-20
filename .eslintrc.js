module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    '@nuxtjs',
    'eslint:recommended'
  ],
  rules: {
    'vue/no-v-html': 0,
    'eol-last': ["error", "always"],
    'no-console': [2, { allow: ['warn', 'error'] }],
    'semi': ["error", "always"],
  },
  ignorePatterns: ['global-components.plugin.js']
}
