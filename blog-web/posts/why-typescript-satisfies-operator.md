---
title: "TypeScript の satisfies 演算子は何に役立つのか"
description: "satisfies を使うことにより、型推論しつつ、型を変えない性質を利用して読みやすい推論結果を残すことができる。Puppeteer から拝借したコード例を添えて、役立つ場面を紹介する。"
topics: ["TypeScript"]
category: "Technology"
published: true
eyecatch: "https://imagedelivery.net/JtEZHVqOaD6-I4jpdS8nBQ/0286e951-6a3b-482e-6248-7751c927a200/thumbnail"
date: "2023-07-01T16:38:44.902+09:00"
---

![](https://imagedelivery.net/JtEZHVqOaD6-I4jpdS8nBQ/0286e951-6a3b-482e-6248-7751c927a200/public)

# 目次

# `satisfies` 演算子とは

[TypeScript 4.9 で導入された](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-beta/#the-satisfies-operator) `satisfies` 演算子は、`expression satisfies type` のようにして使います。

```typescript
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255]
//  ~~~~ The typo is now caught!
} satisfies Record<Colors, string | RGB>;
```

`satisfies` は、

- 式がある型を満たすことを保証しつつ、文脈的に型付けする
- 型を変えない

という演算子です。

関数で実装するならこうなるでしょう。

```typescript
function satisfies<A>() {
  return <T extends A>(x: T) => x;
}
```

これ以上の説明は他の文献に譲ります。本記事では、具体的な用途について紹介します。

# 結局何に使うの？

`satisfies` を使うことにより、**型推論しつつ、読みやすい推論結果を残す**ことができます。

これだけ言っても意味がわからないので、実例を添えて説明してみます。Puppeteer のコードを説明に使わせていただきます。

[puppeteer/packages/puppeteer-core/src/api/Input.ts - puppeteer/puppeteer](https://github.com/puppeteer/puppeteer/blob/58e9c64f6364fc1663995d4136445cdc8fab9292/packages/puppeteer-core/src/api/Input.ts#L292)

## `satisfies` を使わない場合の問題

以下のような `MouseButton` を考えます。

```typescript
export const MouseButton: Record<string, Protocol.Input.MouseButton> = Object.freeze({
  Left: 'left',
  Right: 'right',
  Middle: 'middle',
  Back: 'back',
  Forward: 'forward',
});
```

型アノテーションがついており、`MouseButton` は `Record<string, Protocol.Input.MouseButton>` 型です。
プロパティの値は `Protocol.Input.MouseButton` 型である必要があるので、例えば `forwrad` のようなミスをしても型エラーになってくれます。

今のところ何も問題なさそうですね。

では、エディタで `MouseButton` にカーソルを当てて表示される型はどうなっているでしょうか。
やってみると以下のようになります。

![](/images/why-typescript-satisfies-operator-bad.png)

何も間違ってはいませんが、型定義にジャンプしない限りは中身がどうなっているのか全くわかりません。
これが型アノテーションの限界だと思っています。

もちろん `{Left: 'left'; Right: 'right'; Middle: 'middle'; Back: 'back'; Forward: 'forward';}` 型をアノテーションすれば問題なくなりますが、Union 型で値の集合を定義しておきたいという本来の意図から外れてしまします。

## `satisfies` によってもたらされる型の可読性

今度は型アノテーションではなく、`satisfies` を使ってみましょう。

```typescript
export const MouseButton = Object.freeze({
  Left: 'left',
  Right: 'right',
  Middle: 'middle',
  Back: 'back',
  Forward: 'forward',
}) satisfies Record<string, Protocol.Input.MouseButton>;
```

型アノテーションした場合と同様に、`forwrad` みたいなタイポをしていたら型エラーになります。

さらに、「`satisfies` は型を変えない」という性質がここで効いてきます。
エディタで `MouseButton` にカーソルを当てると、型の中身が一発でわかります。


![](/images/why-typescript-satisfies-operator-good.png)


`satisfies` を使うことにより、**型推論しつつ、読みやすい推論結果を残す**ことができました。

これは個人的に一番腹落ちする `satisfies` の使い方でした。

# 参考

1. https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-beta/#the-satisfies-operator
1. https://github.com/puppeteer/puppeteer/blob/58e9c64f6364fc1663995d4136445cdc8fab9292/packages/puppeteer-core/src/api/Input.ts#L292
