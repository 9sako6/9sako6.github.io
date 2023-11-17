---
title: "最近考えている緩いフロントエンドのディレクトリ構成"
description: ""
topics: ["設計"]
category: "Random"
published: true
eyecatch: ""
date: "2023-07-09T00:41:57.436+09:00"
---

望ましいディレクトリ構成は、プロジェクトの規模やチームの習慣、個々のお気持ちなどによって変わってくるでしょう。

本記事で述べるディレクトリ構成は、誰に押し付けるものでもありません。私の考えをスナップショットとして記述するだけです。なお、Next.js を使うプロジェクトを想定しています。

最近考えている、緩いフロントエンドのディレクトリ構成は次のようになります。

開発者が **ファイルの置き場に迷わない** ことに重きを置いています。

```text
├── app/ # or pages/
├── components/
│   ├── features/
│   └── ui/
├── hooks/
```

- components
  - features ディレクトリには、ドメインごとに分かれた状態で、そのドメイン固有のロジックをもつコンポーネントを配置します。
  - ui ディレクトリには、汎用的に UI を描画するコンポーネントが含まれています。ボタン、ヘッダー、フッターなど、アプリケーション全体で再利用可能な UI コンポーネントがここに位置します。
- hooks には React のカスタムフックが格納されています。これらのカスタムフックはアプリケーションのロジックをカプセル化し、複数のコンポーネント間で共有することができます。カスタムフックはコンポーネントから独立しているため、components ディレクトリとは別に管理します。
- Next.js には app ディレクトリ（または pages ディレクトリ）があるので、コンポーネントを集約してページを作るのは app ディレクトリ下の page.tsx の仕事とします。

この構成は、私にとって Atomic Design よりもシンプルで直感的です。コンポーネントが molecules なのか organisms なのかは判断が難しいですが、どのドメインのコンポーネントなのかはすぐに判断できます。

以下は具体的なディレクトリ構成の例です。

```text
├── components
│   ├── features
│   │   ├── authentication
│   │   │   ├── GoogleLogInButton.tsx
│   │   │   ├── LogOutButton.tsx
│   │   │   └── SignUpButton.tsx
│   │   ├── post
│   │   │   ├── PostListItem.tsx
│   │   │   └── RecentPostList.tsx
│   │   └── user
│   │       └── UserProfile.tsx
│   └── ui
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── assets
│       │   └── svg
│       │       └── logo
│       │           ├── facebook.svg
│       │           └── twitter.svg
│       ├── buttons
│       │   ├── Button.tsx
|       |   └── ShowMoreButton.tsx
│       └── navigations
│           ├── HamburgerMenu.test.tsx
│           └── HamburgerMenu.tsx
├── hooks
|   └── ui
|       └── navigations
│           ├── useHamburgerMenu.test.ts
│           └── useHamburgerMenu.ts
```

features ディレクトリは authentication, post, user といったドメイン別のサブディレクトリを持ちます。その下には、ドメインロジックをもつコンポーネントが配置されます。階層について考えすぎないためにフラットにコンポーネントを配置します。ただし、コンポーネントが増えすぎて痛みが生じた場合は、後の章で述べるような拡張を考えます。

コンポーネントテストを書く場合は、そのコンポーネントと同じディレクトリに ComponentName.test.tsx を置きます。テストの有無が一目でわかるからです。

hooks ディレクトリは components ディレクトリと同列に置きます。
カスタムフックをコンポーネントから独立させ、再利用可能にするために、components ディレクトリの外に配置しています。

正直なところ、再利用可能なカスタムフックを作るのは難しいかもしれませんが、それでも独立したディレクトリに配置することで再利用の可能性を開いています。

つまり、以下のような配置は避けました。

```text
navigations
├── HamburgerMenu.test.tsx
├── HamburgerMenu.tsx
└── hooks
    ├── useHamburgerMenu.test.ts
    └── useHamburgerMenu.ts
```

[Screaming Architecture - Evolution of a React folder structure - DEV Community](https://dev.to/profydev/screaming-architecture-evolution-of-a-react-folder-structure-4g25#prototype-group-by-file-types) においては下記の通り、コンポーネントとフックをなるべく近くに配置する提案がなされています。

> Our solution: colocation! Whenever possible we move the contexts and hooks next to the components where they are used.

この配置では、カスタムフックが特定のコンポーネントに紐づく形となってしまい、再利用の可能性が狭まると考えました。
ただ、上記記事の中では共通で使う `useAuth` のようなフックを components と同列の hooks に置くことも許しています。
コロケーションを優先して、再利用性が低いフックをコンポーネントの近くに置いておくのは悪くない気もしています。悩ましい。


# 拡張

## カスタムフックではないドメインロジック

lib/features に置きます。例えば次のようになります。

```text
├── lib
|   └── features
|       └── post
│           ├── xxx.test.ts
│           └── xxx.ts
```


## 大量のコンポーネントに対処する方法

以下のような例を考えます。
RecentPostList.tsx は、その他の Author.tsx 等によって構成されているとします。components の外からは RecentPostList.tsx だけが参照されます。

```text
├── components
│   ├── features
│   │   ├── post
│   │   │   ├── Author.tsx
│   │   │   ├── Body.tsx
│   │   │   ├── DraftLabel.tsx
│   │   │   ├── EyeCatchImage.tsx
│   │   │   ├── PostListItem.tsx
│   │   │   ├── RecentPostList.tsx
│   │   │   └── Title.tsx
```

ここでは、RecentPostList.tsx を親コンポーネント、その他の Author.tsx 等を子コンポーネントと呼ぶことにします。

もし親コンポーネントと同列にあるコンポーネントが多すぎて、関係性がわかりにくいと感じた場合、次のような拡張を考えます。

親コンポーネントの名前で新たなディレクトリを作成し、親コンポーネントとその子コンポーネントをこの新たなディレクトリに移動します。
加えて、これはお好みですが親コンポーネントだけを `export` する index.tsx を作成します。

その結果、ディレクトリ構成は次のようになります。

```text
├── components
│   ├── features
│   │   ├── post
│   │   │   ├── RecentPostList
│   │   │   |   ├── index.tsx
│   │   │   |   ├── Author.tsx
│   │   │   |   ├── Body.tsx
│   │   │   |   ├── DraftLabel.tsx
│   │   │   |   ├── EyeCatchImage.tsx
│   │   │   |   ├── PostListItem.tsx
│   │   │   |   ├── RecentPostList.tsx
│   │   │   |   └── Title.tsx
```

# おわり

個人の主観を述べた感想文ができあがってしまいました。

とりあえず、本記事で紹介した構成は開発者が **ファイルの置き場に迷わない** ことに重きを置いているつもりです。

