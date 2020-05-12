const katexSelectorsList = require('./katex.js')

export default function () {
  const { options } = this.nuxt

  options.purgeCSS = {
    whitelistPatterns: [
      /hljs.*/,
      /ol/,
      /blockquote/,
      /table-of-contents/
    ],
    whitelist: katexSelectorsList()
  }
}
