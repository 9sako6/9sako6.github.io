<template>
  <div id="preview">
    <div v-html="compiledMarkdown"></div>
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";

// import md from '../assets/post/hoge.md'

export default {
  name: "postForm",
  created: function() {
    marked.setOptions({
      langPrefix: "",
      highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.markdownText);
    }
  },
  data: function() {
    return {
      markdownText: `## 問題

[https://atcoder.jp/contests/abc058/tasks/arc071_a:embed:cite]

## 解法
a~zの文字について、ある文字●が全文字列中で共通して何回使われているかを数えます。その共通して使われている数だけ文字●を連結していく、ということを行えば答えるべき文字列が求まります。
 ざっくりと\`O(26*n^2)\`ですが、[tex: 1 \leq n \leq 50]なので間に合います。
`
    };
  }
};
</script>
<style scoped>
#preview {
  width: 60%;
  margin-left: 20%;
  text-align: left;
}
</style>
