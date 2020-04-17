const katexSelectorsList = require('./katex.js')

export default async function () {
  const { options } = this.nuxt

  options.purgeCSS = {
    whitelistPatterns: [
      /hljs.*/,
      /backquote/,
      /table-of-contents/
    ],
    whitelist: katexSelectorsList()
  }
}
