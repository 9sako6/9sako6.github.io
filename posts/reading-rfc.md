---
title: "RFC の歩き方"
description: ""
topics: []
published: false
eyecatch: ""
date: "2022-05-03T23:54:06.890+09:00"
---

# What is an RFC

RFC は、インターネットに関する技術仕様や組織上の注意事項が記載されてる文書です。IETF (The Internet Engineering Task Force) が管理しています。
RFC という名前は、もともと Request for Comments から来ていました。現在は単に RFC と呼ばれます。

余談ですが、Rust や Vue, React にも RFC があります。IETF の RFC
をもじったものだと思います。既存のふるまいを変更したい場合や、機能を追加したい場合などに、まずは RFC を作って議論をするようです。

- [rust-lang/rfcs: RFCs for changes to Rust](https://github.com/rust-lang/rfcs)
- [vuejs/rfcs: RFCs for substantial changes / feature additions to Vue core](https://github.com/vuejs/rfcs)
- [reactjs/rfcs: RFCs for changes to React](https://github.com/reactjs/rfcs)

# RFC リーダー

[RFC Reader - An online reader for IETF RFCs](https://www.rfcreader.com/)

# 要求レベルを示すキーワード

仕様の要件を示すために、例えば `MUST` といったキーワードが使われることがあります。この場合、`MSUT`
が書かれた項目は絶対的な要件であることを意味します。 これらのキーワードが使われる RFC の冒頭には下記の文言が記載されています。

> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
> "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
> interpreted as described in RFC 2119.

> 本文書におけるキーワード「MUST」「MUST NOT」「REQUIRED」「SHALL」「SHALL NOT」「SHOULD」「SHOULD
> NOT」「RECOMMENDED」「MAY」「OPTIONAL」はRFC2119に記載されている通りに解釈されるものとします。 （筆者による訳）

要求レベルを示すキーワードを定義した
[RFC 2119 - Key words for use in RFCs to Indicate Requirement Levels](https://datatracker.ietf.org/doc/html/rfc2119)
によると、キーワードは下記の意味で使われます。

- `MUST`, `REQUIRED`, `SHALL`
  - 定義が仕様の絶対的な要件であることを意味する。
- `MUST NOT`, `SHALL NOT`
  - 定義が仕様の絶対的な禁止事項であることを意味する。
- `SHOULD`, `RECOMMENDED`
  - ある特定の状況において、ある項目を無視する正当な理由が存在する場合がある。しかし、無視する前に、意味を十分に理解し、慎重に検討する必要がある。
- `SHOULD NOT`, `NOT RECOMMENDED`
  - ある特定の状況において、ある振る舞いが許容される、あるいは有用である正当な理由が存在する場合がある。しかし、その振る舞いを実行する前に、意味を十分に理解し、慎重に検討する必要がある。
- `MAY`, `OPTIONAL`
  - ある項目がオプションであることを意味する。とはいえ、あるオプションを含まない実装は、オプションを含む実装と相互運用できるように準備されなければならない。同様に、あるオプションを含む実装は、オプションを含まない実装と相互運用できるように準備されなければならない。

# ABNF
