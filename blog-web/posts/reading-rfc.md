---
title: "RFC の歩き方"
description: ""
topics: []
category: "Random"
published: false
eyecatch: ""
date: "2022-05-03T23:54:06.890+09:00"
---

# RFC とは

RFC は、インターネットに関する技術仕様や組織上の注意事項が記載されている文書です。IETF (The Internet Engineering Task
Force) が管理しています。 RFC という名前は、もともと Request for Comments から来ていました。現在は単に RFC と呼ばれます。

RFC は 1969年に作成され始めました。RFC
の内容は次章で詳しく説明しますが、インターネットに関する技術の仕様だけでなく、広く周知されたい情報やインターネットに関する研究・実験の結果、現状のベストプラクティスといったものが文書化されています。

<!-- - [RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content](https://datatracker.ietf.org/doc/html/rfc7231)
  - HTTP 1.1 の RFC
- [RFC 8259 - The JavaScript Object Notation (JSON) Data Interchange Format](https://datatracker.ietf.org/doc/html/rfc8259)
  - JSON の RFC
- [RFC 3629 - UTF-8, a transformation format of ISO 10646](https://datatracker.ietf.org/doc/html/rfc3629)
  - UTF-8 の RFC
- [RFC 1149 - Standard for the transmission of IP datagrams on avian carriers](https://datatracker.ietf.org/doc/html/rfc1149)
  - 鳥類キャリアによるIP（ジョーク） -->

余談ですが、Rust や Vue, React にも RFC があります。IETF の RFC
をもじったものだと思います。既存のふるまいを変更したい場合や、機能を追加したい場合などに、まずは RFC を作って議論をするようです。

- [rust-lang/rfcs: RFCs for changes to Rust](https://github.com/rust-lang/rfcs)
- [vuejs/rfcs: RFCs for substantial changes / feature additions to Vue core](https://github.com/vuejs/rfcs)
- [reactjs/rfcs: RFCs for changes to React](https://github.com/reactjs/rfcs)

# RFC の内容

# 標準化過程

標準化されるにあたり辿る過程は
[RFC 2026 - The Internet Standards Process -- Revision 3](https://datatracker.ietf.org/doc/html/rfc2026)
に定義されています。3つの段階があります。

1. Proposed Standard
1. Draft Standard
1. Standard

# 要求レベルを示すキーワード

RFC の仕様の文書中では、要件を示すために `MUST` といったキーワードが使われることがあります。この場合、`MSUT`
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

RFC 内では、ABNF (Augmented Backus–Naur form) を用いてプロトコルやファイルフォーマットの形式を定義することがあります。



# RFC リーダー

最後に、RFC を読むのに便利な Web サイトの紹介です。
サイドバーに目次が付いているので、全体を俯瞰しつつ、好きな章にすぐに飛ぶことができます。

[RFC Reader - An online reader for IETF RFCs](https://www.rfcreader.com/)

# 参考文献

1. [IETF | RFCs](https://www.ietf.org/standards/rfcs/)
1. [RFCの分類 - JPNIC](https://www.nic.ad.jp/ja/rfc-jp/RFC-Category.html)
1. [インターネット標準化過程 - JPNIC](https://www.nic.ad.jp/ja/rfc-jp/Std-track.html)
1. [RFC 2119 - Key words for use in RFCs to Indicate Requirement Levels](https://datatracker.ietf.org/doc/html/rfc2119)
