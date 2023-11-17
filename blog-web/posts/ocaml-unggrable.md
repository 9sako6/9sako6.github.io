---
title: "Unggrable OCaml - 調べにくい構文、記号の意味を説明する"
description: ""
topics: ["OCaml"]
category: "Technology"
published: false
eyecatch: ""
date: "2022-11-29T22:19:41.854+09:00"
---

# Table of contents

OCaml 初心者です。

私は OCaml が好きなんですが、OCaml にはいろいろな記号が登場するので最初はコードを読むのに苦労しました。

そんな unggrable な記号たちの意味がだんだんわかってきたので、誰かの OCaml 学習に役に立つことを期待して説明書きを残しておきます。

```bash
$ ocaml --version
The OCaml toplevel, version 4.12.0
```

# Comment `(* *)`

コメントです。

```ocaml
(* コメントです *)
```

# `;;`

二つのセミコロン `;;` は文の終わりを意味します。しかし、OCaml のコードを書く時に `;;` を書く必要はたぶんないです。
入力が終了したことをインタプリタに伝えるときに使われるくらいです。

# `;`

# Unused variable `_`

アンダースコアは使われない変数を意味します。例えば、Pattern matching において変数を捨てるときに使われます。

```ocaml
let inspect = function
  | None -> "None"
  | Some _ -> "Some"
```

何か式を実行したいが、その結果を捨てたい時にも使われます。

```ocaml
let _ = some_side_effect "foo"
```

# `#`

# Unit `()`

```ocaml
let () = print_endline "hello"
```

# 配列へのアクセス `.()`

```ocaml
# let ids = [|123; 456; 789|];;
# ids.(1);;
- : int = 456
```

# Open a module locally `.()`

`M.(foo bar)` のようにしてモジュールに適用される記号たちです。これは `let open M in foo bar` と同じです。

例えば `Alcotest.(check string)` の部分です。

```ocaml
let test_lowercase () =
  Alcotest.(check string) "same string" "hello!" (To_test.lowercase "hELLO!")
```

この `Alcotest.(check string)` は下記の通りモジュールを式のスコープで開くのと同じことをしています。

```ocaml
let open Alcotest in
  check string;;
```

## References

1. [OCaml - The module system](https://v2.ocaml.org/manual/moduleexamples.html#s:module:structures)

# `.[]`

# `~`

# Polymorphic variants <code>`</code>

多相ヴァリアントです。

```ocaml
# [`A; `B];;
- : [> `A | `B ] list = [`A; `B]
```

# Type of polymorphic variants `[> ]`, `[< ]`

# `->`

# 型変数に付いていがち `'`

# `<=`

# `+.`, `-.`, `*.`, `/.`

# `:`

# `::`

# `@`

# `?`

# `<>`

# `|>`

# Locally abstract types `(type t)`

https://v2.ocaml.org/manual/locallyabstract.html#s:locally-abstract

# `let*`

[OCaml4.08のmonadic/applicative let/andについて - Arantium Maestum](https://zehnpaard.hatenablog.com/entry/2019/07/04/113634)

[OCaml has some new shiny syntax | Notes on Computing](http://jobjo.github.io/2019/04/24/ocaml-has-some-new-shiny-syntax.html)

# `let+`

# その他

独自に定義された演算子かもしれません。

`$`
