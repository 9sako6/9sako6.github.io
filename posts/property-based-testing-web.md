---
title: "Web 開発で Property-based testing が光る場面"
description: ""
topics: ["OCaml", "TypeScript", "テスト"]
category: "Technology"
published: false
eyecatch: ""
date: "2023-05-22T21:52:03.100+09:00"
---

Example-based testing は、入力と出力を特定の値に固定して行います。

Property-based testing は、ランダムに自動生成された膨大なテストケースを使って、特定の条件や制約が満たされるべき性質をテストする技法です。

どんな場合に Property-based testing を書くべきか。

- 入力のバリデーションと制約のテスト

テストが失敗したときにデバッグをやりやすい。

ランダムに生成されるなら、確率的に失敗するテストにもなりうるのか？

ランダムに生成されるっていうけど、本当に十分なケースをテストしてるのか？
