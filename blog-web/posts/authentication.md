---
title: "各種認証の概要とNext.jsによる実装例"
description: "Basic 認証、"
topics: ['認証']
category: "Authentication"
published: false
eyecatch: ""
date: "2022-09-16T22:51:19.133+09:00"
---

# Basic 認証

ユーザー名とパスワードを使った認証である。
リクエストのたびにユーザー名とパスワードが実質平文で送信されるので、SSL/TLS の利用が必須である。

1. クライアントがアクセスする
2. サーバーが `401` `Unauthorized` を返す。その際、`WWW-Authenticate` ヘッダーで Basic 認証を指定する。
3. クライアントから、ユーザー名とパスワードを `:` で繋げた文字列を base64 エンコードしたものを `Authorization` ヘッダーでサーバーに送る。
    ```text
    Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
    ```
4. サーバーで認証

## 実装例

- next: 12.3.0
- react: 18.2.0

`pages/api/login.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('WWW-Authenticate', 'Basic realm="WallyWorld"');
  res.statusCode = 401;
  res.end(`Auth Required.`);
}
```

`WWW-Authenticate` ヘッダーをつけて `401` `Unauthorized` を返すと、ブラウザでベーシック認証用のダイアログが表示される。
`WWW-Authenticate` ヘッダーはブラウザに対してリソースへのアクセスに使用できる認証方式を伝えるものである。

`middleware.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isValid(request: NextRequest) {
  const payload = request.headers.get('authorization')?.split(' ')[1];
  if (!payload) return false;

  const [user, pass] = atob(payload).split(':');
  return user === process.env.BASIC_USERNAME && pass === process.env.BASIC_PASSWORD;
}

export function middleware(request: NextRequest) {
  if (isValid(request)) return NextResponse.next();

  request.nextUrl.pathname = '/api/login';
  return NextResponse.rewrite(request.nextUrl);
}
```

どのページにアクセスしても、Basic 認証を求められる。
一度認証に成功するとしばらくは認証情報がブラウザにキャッシュされるので、認証なしでアクセスできる。
ブラウザが毎回認証情報をつけてリクエストするからだ。

## ログアウト

仕様にはログアウト機能が含まれていない。

ログアウトっぽいことは可能で、認証に失敗する文字列をつけてアクセスすればよい。
例えば、`https://a@example.com` にアクセスすると再度認証が求められる状態になる。

サーバーからログアウトさせることはできなさそう。

## 普及していない理由

不便だからだと思われる。サーバーからログアウトさせられないのが不便さのひとつ。

そのほか、認証済みユーザーと認証済みでないユーザーを区別できないのが致命的である。
例えば、トップページにユーザー固有の情報を表示しようとすると厄介なことが起こる。
ユーザーの情報を取得しないといけないので、認証が必要になる。
しかしながら、トップページにアクセスするたびに認証ダイアログが出てくるなんて、ビジネス的にどうかと思うし使い勝手が悪い。

## 参考文献

- [RFC 2617: HTTP Authentication: Basic and Digest Access Authentication](https://www.rfc-editor.org/rfc/rfc2617)
- [returning-response-body-in-middleware | Next.js](https://nextjs.org/docs/messages/returning-response-body-in-middleware)
- [WWW-Authenticate - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/WWW-Authenticate)
- [Basic認証のキャッシュを削除する（ログアウトする） | DevelopersIO](https://dev.classmethod.jp/articles/delete-cache-for-basic-authentication/)
- [ログアウト機能の目的と実現方法 | 徳丸浩の日記](https://blog.tokumaru.org/2013/02/purpose-and-implementation-of-the-logout-function.html)
- [渋川よしき. Real World HTTP 第2版. 株式会社オライリー・ジャパン, 2020.](https://www.oreilly.co.jp/books/9784873119038/)
