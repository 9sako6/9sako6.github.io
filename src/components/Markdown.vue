<template>
  <div id="preview">
    <h1>ABC058 C - 怪文書 / Dubious Document</h1>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";

export default {
  name: 'postForm',
  created: function() {
    marked.setOptions({
      langPrefix:'',
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
      markdownText: `
\`\`\`python
n = int(input())
S=[input() for _ in range(n)]
ans = ''
for i in range(97, 97+26):
    memo = [0]*n # 各文字列S_iに文字chr(i)がいくつずつ含まれるかを記録する配列
    for j in range(n):
        memo[j] = S[j].count(chr(i))
    ans += min(memo)*chr(i)

print(ans)
\`\`\`

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
