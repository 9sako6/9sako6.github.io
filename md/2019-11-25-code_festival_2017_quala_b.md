---
title: "B - fLIP (200点)"
description:
tags:
  - 競技プログラミング
  - AtCoder
  - 2変数
  - グリッド
  - 全探索
  - 白黒
  - 反転
created_at: 2019-11-25
updated_at: 
draft: false
---


# 問題

[B - fLIP](https://atcoder.jp/contests/code-festival-2017-quala/tasks/code_festival_2017_quala_b)


# 考察

何行塗るか、何列塗るか、を考えると解けます。
\\(x\\)行塗り、\\(y\\)列塗るとします。黒く塗られるマスは、\\(xM + yN - 2xy\\)マスです。
制約からして\\(x\\)、\\(y\\)を全て試すことができるので、上記式が\\(K\\)と一致するかを判定すればよいです。


[submission](https://atcoder.jp/contests/code-festival-2017-quala/submissions/8648146)

# 感想
頭が動いてなくて悩んでしまった。200点なのに思いつけない焦りもあった。
制約からして、行方向、列方向にそれぞれ走査できることがわかる。

（あと、`n.times`として`x = n`の場合を漏らすミスをしてしまったので反省する。）