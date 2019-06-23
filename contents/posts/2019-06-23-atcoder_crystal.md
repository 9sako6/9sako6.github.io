---
title: Crystalで競プロ(AtCoder)をするときのTips
description:
tags:
  - AtCoder
  - 競技プログラミング
  - Crystal
created_at: 2019-06-23
updated_at: 
draft: true
---

Rubyとの違いを重点的に

# 環境
|サイト|バージョン|日付|
|:---:|:---:|:---:|
Atcoder | Crystal (0.20.5)|2019/06/23現在|

# 入力の受け取り
```ruby
n = gets.not_nil!.to_i                  # 整数
s = gets.not_nil!                       # 文字列他
s = read_line
a = gets.not_nil!.split.map(&.to_i)     # スペース区切りの整数
d = Array.new(n) { gets.not_nil!.to_i } # 縦並びのn個の整数AtCoderでうごかん
```
N = gets.not_nil!.to_i
みたいに大文字にするとバグる


&.to_i, &:to_i

文字列はダブルクオーテーションでくくる
'' で囲った値は Char 型のリテラルです
```ruby
# ABC081A - Placing Marbles
puts gets.not_nil!.count('1') # Correct
puts gets.not_nil!.count("1") # Wrong
```

Hash
cnt = Hash(String, Int32).new(0)

string << できない？

injectはないっぽい

arrayの和をもとめるとき、reduceよりsumがはやいっぽい？

puts arrayやるとp表示みたいになる

[0...k]よりlast(k), first(k)とかがはやそう

sort.reverseよりは.sort_by{|x| -x}がちょっとはやい?いや、そうでもないかも
