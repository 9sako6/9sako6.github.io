---
title: "C の極小サブセットコンパイラを OCaml で実装した日記"
description: ""
topics: ["OCaml", "Compiler", "C"]
category: "Technology"
published: false
eyecatch: ""
date: "2022-08-14T20:51:46.914+09:00"
---

# はじめに

2022年の夏、OCaml を勉強したあとに何か作りたくなって、C のサブセットのコンパイラを作ったときの日記です。
[Rui Ueyama](https://github.com/rui314) さんの記事 [Cコンパイラをスクラッチから開発してみた（日記） - Qiita](https://qiita.com/ruiu/items/4d471216b71ab48d8b74) に触発されて、日記形式にしました。

コードは [GitHub](https://github.com/9sako6/ccaml) にあります。

# 8月11日
めっちゃ小さい機能をコンパイルするところから初めて、インクリメンタルに開発していく。
数値を返すだけの関数をコンパイルできるようになった。

```c
int main() {
    return 42;
}
```

コンパイルして生成されたアセンブリはこんな感じ。

```text
.globl  main                        
main:
  mov $29, %rax
  ret
```

# 8月12日

`!`, `~`, `-` ら単項演算子を実装した。

# 8月13日

`+`, `-`, `*`, `/` 演算子を実装して四則演算ができるようになった。
こういう計算ができる。

```c
int main() {
    return 31 + (2 - 3) - 6 * 7 / 2;
}
```

演算子には優先順位があるので、それを守る必要がある。
このためには、演算子ごとに別の生成規則を用意するといいっぽい。

```text
<exp> ::= <mult-div-exp> { ("+" | "-") <mult-div-exp> }
<mult-div-exp> ::= <factor> { ("*" | "/") <factor> }
<factor> ::= "(" <exp> ")" | <unary_op> <factor> | <int>
<unary_op> ::= "!" | "-" | "~"
```

加えて、左結合にするために少し工夫が必要だった。
例えば `20 / 4 / 2` という割り算は `(20 / 4) / 2` の順で計算しないといけない。
このために、同じ優先順位の演算子が見つかり次第、そこまでのトークン列で二項演算用の AST を作るようにした。

```ocaml
let parse_binary_op_exp parse_next operators tokens =
  (* Join expressions of the same precedence for left-associative *)
  let left_exp, rest = parse_next tokens in
  let rec construct_exp left_exp tokens =
    let operator = List.hd tokens in
    if List.mem operator operators then
      (* left-associative *)
      let right_exp, rest = parse_next (List.tl tokens) in
      let left_exp = construct_binary_op_exp operator left_exp right_exp in
      construct_exp left_exp rest
    else (left_exp, tokens)
  in
  construct_exp left_exp rest
```
