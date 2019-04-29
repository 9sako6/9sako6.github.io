---
title: Python3の競技プログラミング用Tips
description: 競技プログラミングをする上で重要なPython3の知識...
tags:
  - 競技プログラミング
  - Python3
created_at: 2019-04-29
updated_at:
draft: true
---

# `sys.stdin.readline()`
筆者は`input()`ではなく`sys.stdin.readline()`を使うようにしたら通ったことがある。

@@
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">ええええええええ<br>input()の代わりにstdin.readline()使っただけで通った<br>えええええええええええ <a href="https://t.co/WEQiQ9Np1E">pic.twitter.com/WEQiQ9Np1E</a></p>&mdash; 🌾くさころ🌾 (@9sako6) <a href="https://twitter.com/9sako6/status/1122073726894260225?ref_src=twsrc%5Etfw">2019年4月27日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
@@


# `set()`

# 2重ループを書く時は小さいループを外側へ
@@
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Python / PyPyで2重ループするとき<br><br>for i in range(10**8):<br>    for j in range(2):<br>        pass<br><br>を<br><br>for j in range(2):<br>    for i in range(10**8):<br>        pass<br><br>に変えるだけで処理時間が3〜5倍ぐらい速くなるので、小さいループを外側にするのがいいよ。<br><br>（たまにこれで落ちる）</p>&mdash; きり (@kiri8128) <a href="https://twitter.com/kiri8128/status/1122045783988006913?ref_src=twsrc%5Etfw">2019年4月27日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
@@


# `collections.deque()`
# `collections.Counter()`

# `itertools.accumulate(iterable[, func])`

`accumulate([1,2,3,4,5]) --> 1 3 6 10 15`のように、累積和をつくる。


`accumulate([1,2,3,4,5], operator.mul) --> 1 2 6 24 120`