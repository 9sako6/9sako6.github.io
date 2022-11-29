---
title: "多相バリアントを理解したい"
description: ""
topics: ["OCaml"]
category: "Technology"
published: false
eyecatch: ""
date: "2022-11-26T20:51:48.0+09:00"
---

まずは、通常のバリアント `token` の例です。

```ocaml
type token =
  | Semicolon
  | Exclamation
  | Question
  | Num of int
```

`Semicolon`, `Exclamation`, `Question`, `Num` はコンストラクタと呼ばれ、`type` の値を作るものです。

```ocaml
# let first_token = Num 42;;
val first_token : token = Num 42
# let tokens = [first_token; Question];;
val tokens : token list = [Num 42; Question]
```


- 異なるバリアントをリストに含められない


# References

1. [多相バリアントを使いこなそう(1) - osiire’s blog](https://osiire.hatenablog.com/entry/20090510/1241957550)
1. [Polymorphic vs. ordinary variants in ocaml | Yehonathan Sharvit](https://blog.klipse.tech/ocaml/2018/03/16/ocaml-polymorphic-types.html)
1. [Jaques Garrigue. Code reuse through polymorphic variants. FOSE-2000](http://www.math.nagoya-u.ac.jp/~garrigue/papers/fose2000.html)