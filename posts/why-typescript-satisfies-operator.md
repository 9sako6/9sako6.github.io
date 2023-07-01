---
title: "TypeScript の satisfies 演算子は何に役立つのか"
description: "satisfies を使うことにより、型推論しつつ、型を変えない性質を利用して読みやすい推論結果を残すことができる。Puppeteer から拝借したコード例を添えて、役立つ場面を紹介する。"
topics: ["TypeScript"]
category: "Technology"
published: true
eyecatch: "/images/why-typescript-satisfies-operator-eye.png"
date: "2023-07-01T16:38:44.902+09:00"
---

![](/images/why-typescript-satisfies-operator-eye.png)

# 目次

# `satisfies` 演算子とは

[TypeScript 4.9 で導入された](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-beta/#the-satisfies-operator) `satisfies` 演算子は、`expression satisfies type` のようにして使う。

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

という演算子である。

関数で実装するならこうなるだろう。

```typescript
function satisfies<A>() {
  return <T extends A>(x: T) => x;
}
```

これ以上の説明は他の文献に譲る。本記事では、具体的な用途について紹介したい。

# 結局何に使うの？

`satisfies` を使うことにより、**型推論しつつ、読みやすい推論結果を残すことができる。**

これだけ言っても意味がわからないので、実例を添えて説明してみる。Puppeteer のコードを説明に使わせていただく。

[puppeteer/packages/puppeteer-core/src/api/Input.ts - puppeteer/puppeteer](https://github.com/puppeteer/puppeteer/blob/58e9c64f6364fc1663995d4136445cdc8fab9292/packages/puppeteer-core/src/api/Input.ts#L292)

## `satisfies` を使わない場合の問題

以下のような `MouseButton` を考える。

型アノテーションがついており、`MouseButton` は `Record<string, Protocol.Input.MouseButton>` 型である。
プロパティの値は `Protocol.Input.MouseButton` 型である必要があるので、例えば `forwrad` のようなミスをしても型エラーになってくれる。

今のところ何も問題なさそうだ。

```typescript
export const MouseButton: Record<string, Protocol.Input.MouseButton> = Object.freeze({
  Left: 'left',
  Right: 'right',
  Middle: 'middle',
  Back: 'back',
  Forward: 'forward',
});
```

では、エディタで `MouseButton` にカーソルを当てて表示される型はどうなっているだろうか。
やってみると以下のようになる。

![](/images/why-typescript-satisfies-operator-bad.png)

何も間違ってはいないのだが、型定義にジャンプしない限りは中身がどうなっているのか全くわからない。
これが型アノテーションの限界だと思っている。

もちろん `{Left: 'left'; Right: 'right'; Middle: 'middle'; Back: 'back'; Forward: 'forward';}` 型をアノテーションすれば問題なくなるが、Union 型で値の集合を定義しておきたいという本来の意図から外れる。

## `satisfies` によってもたらされる型の可読性

今度は型アノテーションではなく、`satisfies` を使ってみる。

```typescript
export const MouseButton = Object.freeze({
  Left: 'left',
  Right: 'right',
  Middle: 'middle',
  Back: 'back',
  Forward: 'forward',
}) satisfies Record<string, Protocol.Input.MouseButton>;
```

型アノテーションした場合と同様に、`forwrad` みたいなタイポをしていたら型エラーになる。

さらに、

> `satisfies` は型を変えない

という性質がここで効いてくる。


![](/images/why-typescript-satisfies-operator-good.png)

エディタで `MouseButton` にカーソルを当てると、型の中身が一発でわかる。

`satisfies` を使うことにより、**型推論しつつ、読みやすい推論結果を残すことができる。**

これは個人的に一番腹落ちする `satisfies` の使い方だった。

# 参考

1. https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-beta/#the-satisfies-operator
1. https://github.com/puppeteer/puppeteer/blob/58e9c64f6364fc1663995d4136445cdc8fab9292/packages/puppeteer-core/src/api/Input.ts#L292
