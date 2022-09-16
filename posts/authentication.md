---
title: "各種認証の概要とNext.jsによる実装例"
description: "Basic 認証、"
topics: ['認証']
published: false
eyecatch: ""
date: "2022-09-16T22:51:19.133+09:00"
---

# Basic 認証

ユーザー名とパスワードを `:` で繋げた文字列を base64 エンコードしたものを資格情報とする。
上記を `Authorization` ヘッダでサーバーに送る。

```text
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

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

`WWW-Authenticate` ヘッダをつけて `401` `Unauthorized` を返すと、ブラウザでベーシック認証用のダイアログが表示される。
`WWW-Authenticate` ヘッダはブラウザに対してリソースへのアクセスに使用できる認証方式を伝えるものである。

`middleware.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isValid(request: NextRequest) {
  const payload = request.headers.get('authorization')?.split(' ')[1];
  if (!payload) return false;

  const [user, pass] = atob(payload).split(':');
  return user === 'tarako' && pass === 'onigiri';
}

export function middleware(request: NextRequest) {
  if (isValid(request)) return NextResponse.next();

  request.nextUrl.pathname = '/api/login';
  return NextResponse.rewrite(request.nextUrl);
}
```

どのページにアクセスしても、Basic 認証を求められる。
一度認証に成功すると、しばらくは認証情報がブラウザにキャッシュされるので、認証なしでアクセスできる。

## ログアウト

仕様にはログアウト機能が含まれていない。

ログアウトっぽいことは可能で、認証に失敗する文字列をつけてアクセスすればよい。
例えば、`https://a@example.com` にアクセスすると再度認証が求められる状態になる。

## 参考文献

- [RFC 2617: HTTP Authentication: Basic and Digest Access Authentication](https://www.rfc-editor.org/rfc/rfc2617)
- [returning-response-body-in-middleware | Next.js](https://nextjs.org/docs/messages/returning-response-body-in-middleware)
- [WWW-Authenticate - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/WWW-Authenticate)
- [Basic認証のキャッシュを削除する（ログアウトする） | DevelopersIO](https://dev.classmethod.jp/articles/delete-cache-for-basic-authentication/)
- [ログアウト機能の目的と実現方法 | 徳丸浩の日記](https://blog.tokumaru.org/2013/02/purpose-and-implementation-of-the-logout-function.html)
