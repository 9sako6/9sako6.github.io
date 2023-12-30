---
title: "フロントエンドのエラーハンドリングはどうあるべきか考える"
description: ""
topics: ["エラーハンドリング", "設計"]
category: "Technology"
published: false
eyecatch: ""
date: "2023-12-30T04:10:27.405Z"
---

なるべく特定のツール・方法に限った話をせずに考えたいですが、本記事の中では JavaScript が話題の中心になることがあります。
2023年現在、JavaScript はフロントエンドの構築に欠かせない言語ですから、JavaScript 特有の事情に踏み込まざるを得ません。

# アプリケーション起因のエラー

エラーの影響範囲を制御する。

# ネットワーク起因のエラー

`fetch` は `TypeError` を投げる可能性があります。

[`TypeError` が発生する状況はこちら](https://developer.mozilla.org/ja/docs/Web/API/fetch#%E8%BF%94%E5%80%A4)
にまとまっています。

# ユーザー起因のエラー

# エラーの捕捉と監視

Sentry, Datadog, New Relic など、プロジェクトに合った SaaS を使って JavaScript からの例外やログを収集します。
