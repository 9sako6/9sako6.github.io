const katexSelectorsList = require('./katex.js')

export default function () {
  const { options } = this.nuxt

  options.purgeCSS = {
    whitelistPatterns: [
      /hljs.*/
    ],
    whitelist: [
      ...katexSelectorsList(),
      'ol',
      'h3',
      'blockquote',
      'table-of-contents'
    ]
  }
}
