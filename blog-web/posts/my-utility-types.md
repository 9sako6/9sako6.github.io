---
title: "TypeScript の Utility Types もどきを自分で実装する"
description: 'TypeScript にはじめから用意されている Partial, Uppercase 等の Utility Types, Intrinsic String Manipulation Types もどきを再実装して遊ぶ記事です。'
topics: ["TypeScript"]
category: "Technology"
published: false
date: "2022-04-09T17:30:00.000+09:00"
---

TypeScript にはじめから用意されている `Partial<Type>`, `Uppercase<StringType>` 等の
[Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html), [Intrinsic String Manipulation Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#intrinsic-string-manipulation-types) もどきを再実装して遊ぶ記事です。

実際の実装とは異なる場合があります。実際の実装を見たい方は、TypeScript で本物の Utility Types を書いてご確認ください。

なお、実際の `ThisType<Type>`, `Uppercase<StringType>`, `Lowercase<StringType>`,
`Capitalize<StringType>`, `Uncapitalize<StringType>` の実装はコンパイラの中にあり、TypeScript
のコードからは見えないのでご注意ください。本記事では、実用性を無視して TypeScript でどうにか再現しています。

# 環境

- TypeScript v4.6.2
  - `"strict": true`

# `Partial<Type>`

`Type` 型のプロパティを全て省略可能にした型を返します。

```typescript
type MyPartial<Type extends Record<string, unknown>> = {
  [Key in keyof Type]?: Type[Key];
};
```

ちなみに、`+` 演算子を使っても同じように修飾子を付与できます。ここでは特に使う必要はありません。

```typescript
type MyPartial<Type extends Record<string, unknown>> = {
  [Key in keyof Type]+?: Type[Key];
};
```

# `Required<Type>`

`Type` 型のプロパティ全てを省略不可にした型を返します。

```typescript
type MyRequired<Type extends Record<string, unknown>> = {
  [Key in keyof Type]-?: Type[Key];
};
```

# `Readonly<Type>`

`Type` 型のプロパティ全てを読み取り専用にした型を返します。

```typescript
type MyReadonly<Type extends Record<string, unknown>> = {
  readonly [Key in keyof Type]: Type[Key];
};
```

ちなみに、逆に書き込み可能にする場合は `-` 演算子を使って `readonly` を削除します。

```typescript
type Writable<Type extends Record<string, unknown>> = {
  -readonly [Key in keyof Type]: Type[Key];
};
```

# `Record<Keys, Type>`

キーの型が `Keys`、値の型が`Type` であるオブジェクトの型を返します。

```typescript
type MyRecord<Keys extends string | number | symbol, Type> = {
  [Key in Keys]: Type;
};
```

# `Pick<Type, Keys>`

`Keys` 型のプロパティだけを `Type` から取り出します。

```typescript
type MyPick<Type extends Record<string, unknown>, Keys extends keyof Type> = {
  [Key in Keys]: Type[Key];
};
```

別解です。

```typescript
type MyPick<Type extends Record<string, unknown>, Keys> = {
  [Key in keyof Type & Keys]: Type[Key];
};
```

# `Exclude<UnionType, ExcludedMembers>`

`UnionType` という合併型から、`UnionType` に代入可能な `ExcludedMembers` 型を除いた型を返します。
条件型の分配法則を利用します。

```typescript
type MyExclude<UnionType, ExcludedMembers> = UnionType extends ExcludedMembers
  ? never
  : UnionType;
```

# `Omit<Type, Keys>`

`Type` 型から `Keys` 型のプロパティを除いた型を返します。 さっき作った
`MyExclude<UnionType, ExcludedMembers>` を利用できます

```typescript
type MyExclude<UnionType, ExcludedMembers> = UnionType extends ExcludedMembers
  ? never
  : UnionType;

type MyOmit<Type extends Record<string, unknown>, Keys> = {
  [Key in MyExclude<keyof Type, Keys>]: Type[Key];
};
```

# `Extract<Type, Union>`

`Union` 型に代入可能な `Type` 型を取り出します。 条件型の分配法則が光ります。

```typescript
type MyExtract<Type, Union> = Type extends Union ? Type : never;
```

# `NonNullable<Type>`

`Type` 型を Nullable でなくします。

```typescript
type MyNonNullable<Type> = Type extends null | undefined ? never : Type;
```

# `Parameters<Type>`

`Type` という関数型の引数の型をタプル型で返します。

```typescript
type MyParameters<Type extends (...args: any) => any> = Type extends
  (...args: infer A) => any ? A : never;
```

# `ReturnType<Type>`

`Type` という関数型の戻り値の型を返します。

```typescript
type MyReturnType<Type extends (...args: any) => any> = Type extends
  (...args: any) => infer R ? R : never;
```

# `ConstructorParameters<Type>`

`Type` 型のコンストラクタの引数の型をタプル型で返します。 抽象クラスも渡せるように、`abstract` 修飾子をつけています。

```typescript
type MyConstructorParameters<Type extends abstract new (...args: any) => any> =
  Type extends abstract new (...args: infer Args) => any ? Args : unknown;
```

# `InstanceType<Type>`

`Type` 型のコンストラクタが作るインスタンスの型を返します。

```typescript
type MyInstanceType<Type extends abstract new (...args: any) => any> =
  Type extends abstract new (...args: any) => infer R ? R : unknown;
```

# `ThisParameterType<Type>`

`Type` という関数型の `this` の型を返します。

```typescript
type MyThisParameterType<Type extends (...args: any) => any> = Type extends
  (this: infer T, ...args: any) => any ? T : unknown;
```

# `OmitThisParameter<Type>`

`Type` という関数型から `this` 引数の型を取り除いた型を返します。

```typescript
type MyOmitThisParameter<Type extends (...args: any) => any> = Type extends
  (this: any, ...args: infer Args) => infer Ret ? (...args: Args) => Ret : Type;
```

# `ThisType<Type>`

`ThisType<Type>` は、オブジェクトリテラルに生えたメソッド内の `this` の型を `Type` にします。

以下は、[TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#example-15)
より引用した例です。

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

この例では、`methods` というオブジェクトがもつ `moveBy` メソッド内の `this` に型を付けています。`ThisType<D & M>`
により、 `this` は `D & M` という型のオブジェクト、すなわち、

```typescript
{
    x: number;
    y: number;
} & {
    moveBy: (dx: number, dy: number) => void;
}
```

という型のオブジェクトになります。

この `ThisType<Type>` を実装したいのですが、`ObjectType & ThisType<Type>`
というインターフェイスで実装するのは無理だと思われます。 実際、TypeScript から見えるところに `ThisType<Type>`
の実装はなく、[空の interface として定義されています](https://github.com/microsoft/TypeScript/blob/v4.6.3/lib/lib.es5.d.ts#L1626)。すなわち、実装はコンパイラの内部に隠れています。
代わりに、下記のように使う `MyThisType<ObjectType, Type>` の実装をすることにします。

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: MyThisType<M, D & M>; // Type of 'this' in methods is D & M
};
```

```typescript
type MyThisType<ObjectType, Type> = {
  [Key in keyof ObjectType]: ObjectType[Key] extends
    (...arg: infer Arg) => infer Ret ? (this: Type, ...arg: Arg) => Ret
    : ObjectType[Key];
};
```

# `Capitalize<StringType>`

```typescript
// "hello, world" -> "Hello, world"
```

`string` 型の1文字目と残りの文字列をそれぞれ取り出すには、Template Literal Types と `infer` を使います

```typescript
`${infer HeadChar}${infer TailChars}`
```

```typescript
type LowerToUpperMap = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};

type HeadCharToUpper<StringType extends string> = StringType extends
  `${infer HeadChar}${infer _}`
  ? (HeadChar extends keyof LowerToUpperMap ? LowerToUpperMap[HeadChar]
    : HeadChar)
  : "";

type MyCapitalize<StringType extends string> = StringType extends
  `${infer HeadChar}${infer TailChars}`
  ? `${HeadCharToUpper<HeadChar>}${TailChars}`
  : "";
```

# `Uncapitalize<StringType>`

`StringType` という文字列リテラル型の先頭の文字が大文字であれば小文字にした型を返します。

```typescript
// "HELLO WORLD" -> "hELLO WORLD"
```

```typescript
type UpperToLowerMap = {
  A: "a";
  B: "b";
  C: "c";
  D: "d";
  E: "e";
  F: "f";
  G: "g";
  H: "h";
  I: "i";
  J: "j";
  K: "k";
  L: "l";
  M: "m";
  N: "n";
  O: "o";
  P: "p";
  Q: "q";
  R: "r";
  S: "s";
  T: "t";
  U: "u";
  V: "v";
  W: "w";
  X: "x";
  Y: "y";
  Z: "z";
};

type HeadCharToLower<StringType extends string> = StringType extends
  `${infer HeadChar}${infer _}`
  ? HeadChar extends keyof UpperToLowerMap ? UpperToLowerMap[HeadChar]
  : HeadChar
  : "";

type MyUncapitalize<StringType extends string> = StringType extends
  `${infer HeadChar}${infer TailChars}`
  ? `${HeadCharToLower<HeadChar>}${TailChars}`
  : "";
```

# `Uppercase<StringType>`

`StringType` という文字列リテラル型の小文字を全て大文字にした型を返します。

```typescript
// "Hello, world" -> "HELLO, WORLD"
```

1文字目をさっき作った `HeadCharToUpper<StringType>` で変換し、残りを `MyUppercase` に渡して再帰的に変換します。

```typescript
type LowerToUpperMap = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};

type HeadCharToUpper<StringType extends string> = StringType extends
  `${infer HeadChar}${infer _}`
  ? (HeadChar extends keyof LowerToUpperMap ? LowerToUpperMap[HeadChar]
    : HeadChar)
  : "";

type MyUppercase<StringType extends string> = StringType extends
  `${infer HeadChar}${infer TailChars}`
  ? `${HeadCharToUpper<HeadChar>}${MyUppercase<TailChars>}`
  : "";
```

長い文字列の型を渡すと、再帰制限にひっかかって下記のエラーになります。

> Type instantiation is excessively deep and possibly infinite.

# `Lowercase<StringType>`

`StringType` という文字列リテラル型の大文字を全て小文字にした型を返します。

```typescript
// "Hello, World" -> "hello, world"
```

```typescript
type UpperToLowerMap = {
  A: "a";
  B: "b";
  C: "c";
  D: "d";
  E: "e";
  F: "f";
  G: "g";
  H: "h";
  I: "i";
  J: "j";
  K: "k";
  L: "l";
  M: "m";
  N: "n";
  O: "o";
  P: "p";
  Q: "q";
  R: "r";
  S: "s";
  T: "t";
  U: "u";
  V: "v";
  W: "w";
  X: "x";
  Y: "y";
  Z: "z";
};

type HeadCharToLower<StringType extends string> = StringType extends
  `${infer HeadChar}${infer _}`
  ? HeadChar extends keyof UpperToLowerMap ? UpperToLowerMap[HeadChar]
  : HeadChar
  : "";

type MyLowercase<StringType extends string> = StringType extends
  `${infer HeadChar}${infer TailChars}`
  ? `${HeadCharToLower<HeadChar>}${MyLowercase<TailChars>}`
  : "";
```

# 参考

https://www.typescriptlang.org/docs/handbook/utility-types.html
https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
https://dev.to/svehla/typescript-transform-case-strings-450b
