---
title: "モノリスについてのメモ"
description: ""
topics: []
category: "Random"
published: false
eyecatch: ""
date: "2023-06-14T20:42:33.529+09:00"
---

# モノリス

モノリスとは、デプロイの単位によって定義される概念である。
[モノリスからマイクロサービスへ](https://www.oreilly.co.jp/books/9784873119311/)では、全体を一緒にデプロイする必要があるシステムをモノリスといっている。



# モジュラーモノリス


モノリスのサブセットである。



## メリット

- コードの再利用が楽
  - マイクロサービスの場合は、同じコードを何度も書くか、ライブラリに切り出すか、共通機能をサービスとして独立させるかする必要があるだろう

## デメリット

デリバリー衝突が起こりやすい。



# 分散モノリス

複数のサービスで構成されているが、全体を一緒にデプロイする必要があるシステム。
一見するとマイクロサービスのようだが、サービス間の強い結合性や依存性によりそうなってしまっている。

とはいえ、マイクロサービスにおいて、サービスAがサービスBに依存する場合はあると思う。
サービスBからデータを取ってきてサービスAで使っているような場合。
どうしたらサービス間の結合性を弱められるんだろうか。

[API gateway pattern](https://microservices.io/patterns/apigateway.html)

## Cons

- 分散システムの欠点と単一プロセスモノリスの欠点をもつ

## なぜ発生するのか


# マイクロサービス

# モノレポ

# 参考

- [モノリスからマイクロサービスへ](https://www.oreilly.co.jp/books/9784873119311/)
- [Linking Modular Architecture to Development Teams](https://martinfowler.com/articles/linking-modular-arch.html)
- [Modular Monolith(モジュラーモノリス)についてまとめる](https://r-kaga.com/blog/what-is-modular-monolith)
