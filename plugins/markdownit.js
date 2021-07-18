import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTableOfContents from 'markdown-it-table-of-contents'
import markdownItKatex from '@traptitech/markdown-it-katex'
import '~/node_modules/katex/dist/katex.min.css'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import ruby from 'highlight.js/lib/languages/ruby'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import cpp from 'highlight.js/lib/languages/cpp'
import diff from 'highlight.js/lib/languages/diff'
import xml from 'highlight.js/lib/languages/xml'
import plaintext from 'highlight.js/lib/languages/plaintext'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('diff', diff)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('ruby', ruby)
hljs.registerLanguage('plaintext', plaintext)

export default (_, inject) => {
  const md = new MarkdownIt({
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTMLタグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にする
    use: ['markdown-it-toc', 'markdown-it-katex'],
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
          )
        } catch (error) {
          console.error(error)
        }
      }
      // 言語設定がない場合、プレーンテキストとして表示する
      return (
        '<pre class="hljs"><code>' +
        hljs.highlight('plaintext', str, true).value +
        '</code></pre>'
      )
    }
  })

  md.use(markdownItAnchor)
  md.use(markdownItTableOfContents)
  md.use(markdownItKatex)
  inject('md', md)
}
