---
title: "Non empty list type"
description: ""
topics: ["型"]
category: "Technology"
published: false
eyecatch: ""
date: "2023-04-29T21:54:19.708+09:00"
---

本記事では、空にならないリスト型の表現方法を関数型言語を中心に紹介します。

空にならないリストを型で表現したい理由は、型システムを活用してリストが必ず1つ以上の要素を持つことを保証し、コードの安全性と品質を向上させるためです。
これは例えば、ドメイン駆動開発において、集約ルートが子要素を必ず持つことを保証したい場合に役に立ちます。


例えば、グループ内のメンバーを表現する際、空のリストで表現できません。必ず1つ以上のメンバーが存在することが前提です。
では、メンバーが存在しない場合を `Option` 型で表現すればいいかというと、必ずしもそうではありません。実際には、リストが空でないことを型で保証することで、コードの安全性をより強固にすることができます。
`Option` 型で表現した場合と、空にならないリスト型で表現した場合を比較して議論します。

まず、`Option` 型で表現する場合は、存在しないメンバーを `None` と表現し、存在するメンバーを `Some` と表現しますが、これはメンバーが1つだけ存在するかどうかの情報しか持ちません。
これにより、メンバーの数に関する情報が不足し、コードの安全性や可読性が損なわれる可能性があります。
実際のコードをもとに説明すると、例えば以下のようなコードが考えられます。

```ocaml
type member = { name: string; age: int }
type group = Member of member option
```

この場合、`group` 型は `Member None` でメンバーが存在しないことを表現し、`Member (Some member)` でメンバーが存在することを表現しますが、メンバーの数に関する情報は持ちません。

つまり、以下のようなコードに変更しても、同じ問題が発生します。

```ocaml
type member = { name: string; age: int }
type group = member list option
```

これは、`None` でメンバーが存在しないことを表現し、`Some` でメンバーが存在することを表現しますが、やはりメンバーの数に関する情報は持ちません。

空にならないリスト型で表現する場合は、リストが必ず1つ以上の要素を持つことが型で保証されています。これにより、存在するメンバーの数に関する情報をより正確に表現でき、コードの安全性や可読性が向上します。さらに、空でないリストに対する操作（例えば、最初の要素にアクセスする）が安全であることが保証され、実行時エラーを防ぐことができます。

例えば以下のようなコードが考えられます。

```ocaml
type member = { name: string; age: int }
type non_empty_list = Cons of member * member list
```

この場合、non_empty_list 型は Cons (member, []) で1人のメンバーが存在し、Cons (member1, [member2; member3]) のように複数のメンバーが存在することを表現できます。これにより、メンバーの数に関する情報が正確に表現されます。



TypeScript では、タプル型を使って空にならないリストを表現できます。

```typescript
type NonEmptyArray<T> = [T, ...T[]];

const el: NonEmptyArray<number> = [];
// Type '[]' is not assignable to type 'NonEmptyArray<number>'.
// Source has 0 element(s) but target requires 1.

const nel: NonEmptyArray<number> = [1];
// OK

```

OCaml では<text>。

```ocaml
type 'a non_empty_list = Cons of 'a * 'a list

```
