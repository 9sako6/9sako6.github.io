<template>
  <div id="preview">
    <h1>ABC052 C - Factors of Factorial</h1>
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

## 問題
[ABC052 C - Factors of Factorial](https://atcoder.jp/contests/abc052/tasks/arc067_a)

N!の約数の個数を10^9+7で割った余りを答える問題。


## 解法
約数の個数は(各素因数の指数+1)を掛け合わせたものです。 この問題を解くためには、N!がN以下の素数でそれぞれ何回割れるかがわかればよいです。

そのためにまず、N以下の素数を求めます。

次に、N!が各素数で何回割れるかを数えていきます。 ある素数pでN!を割れる回数は、N以下の各正数について、pで何回割れるかを数え、それらの回数を合計すれば求まります。

約数の個数は(各素因数の指数+1)を掛け合わせたものなので、この問題を解くことができました。

\`\`\`python
def is_prime(n):
    if n <= 1:
        return False
    elif n == 2:
        return True
    else:
        for i in range(2, int((n**(1/2)))+1):
            if n % i == 0:
                return False
        return True

from collections import Counter
N = int(input())
MOD = 10**9+7

primes = [i for i in range(N+1) if is_prime(i)] # N以下の素数

c = Counter(primes) # 各素数で何回割れるかを記録する
                    # 最後に約数の個数を求める時、
                    # (各素因数の指数+1)を掛け合わせるので1で初期化されるCounterは都合が良い

# N以下の数について、各素数で割れた回数を数えていく
for j in range(2, N+1):
    for prime in primes:
        while j % prime == 0:
            j //= prime
            c[prime] += 1

ans = 1
for cnt in c.values():
    ans *= cnt # 初期値が1なので1を足す必要はない
print(ans%MOD) # 剰余で答えるのを忘れずに
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
  margin-bottom: 10%;
  text-align: left;
}
</style>
