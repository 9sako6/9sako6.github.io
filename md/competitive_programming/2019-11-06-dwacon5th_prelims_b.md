---
title: "B - Sum AND Subarrays"
description: ""
tags:
  - 競技プログラミング
  - 連続する部分列
  - 最大化
  - AtCoder
  - 企業コン
  - ビット
  - 論理積
  - "第5回 ドワンゴからの挑戦状 予選"
created_at: 2019-11-06
updated_at: 2019-11-07
draft: false
---

# 問題
[B - Sum AND Subarrays](https://atcoder.jp/contests/dwacon5th-prelims/tasks/dwacon5th_prelims_b)

# 考察
全美しさの候補は列挙できます。

そこから大きいものをK個単純にとるのはうまく行かないです。
論理積をとった結果が答えなので、なるべく大きい桁に1を残すのがよさそうです。
上の桁からみていって、1を残せるように候補を絞っていきます。

全美しさの集合を\\(S_{cands}\\)とします。

上の桁から見ていきます。
今\\(i\\)桁目にいるとして、\\(i\\)桁目に1が立っている美しさを新しい集合\\(S_{i}\\)
に入れます。

\\(|S_{i}| \geq K \\)のとき\\(i\\)桁目に1を残せます。\\(S_{i}\\)を新たな\\(S_{cands}\\)にします。

\\(|S_{i}| < K \\)のとき\\(i\\)桁目は0になります。\\(S_{cands}\\)はそのままにします。

最下位の桁まで上記の処理を行ったのち、\\(S_{cands}\\)の全要素のビット毎の論理積をとると答えが求まります。

計算量は\\(O(N^2 \log_2 10^9 N \leq 4 \times 10^7 )\\)です。

[submission(Ruby)](https://atcoder.jp/contests/dwacon5th-prelims/submissions/8301350)

[submission(C++)](https://atcoder.jp/contests/dwacon5th-prelims/submissions/8301277)
