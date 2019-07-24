---
title: Herokuで簡単なWeb APIを作る
description: 'GETリクエストを送るとHello, Worldを返すだけの簡単なWeb APIを作ります...'
tags:
  - Heroku
  - WebAPI
created_at: 2019-05-04
updated_at: 2019-07-25
draft: true
---


まずは以下の単純なWeb APIを作ります。

```shell
$ curl https://enigmatic-garden-50659.herokuapp.com/
Hello World!
```


# Set up

まずは適当なプロジェクト用ディレクトリを作り、
そこで`npm init`を実行して質問に答えながら`package.json`を作ります。

```shell
$ npm init
```

```json
{
  "name": "hoge",
  "version": "1.0.0",
  "description": "sample web api",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "9sako6",
  "license": "MIT"
}
```

次に、`Express.js`をインストールします。

```shell
$ npm install express --save
```

インストール後の`package.json`はこのようになります。

```json
{
  "name": "hoge",
  "version": "1.0.0",
  "description": "sample web api",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "9sako6",
  "license": "MIT",
  "dependencies": {
    "express": "^4.16.4"
  }
}
```

# index.js
`index.js`を作ります。

```js
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(request, response) {
  response.send('Hello World!\n');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
```

ローカルで動作確認をします。

```shell
$ node index.js
Node app is running at localhost:3000
```

`http://localhost:3000`にアクセスし、`Hello World!`が表示されていればうまくいっています。

![local server](/posts_images/2019-05-04-heroku_web_api/local.png)

もしくは、`curl`で動作確認をします。

```shell
$ curl http://localhost:3000
Hello World!
```


# Herokuへデプロイ
まずは現在のディレクトリを`Git`リポジトリにします。
```shell
$ git init
```

`.gitignore`を作ります。

```txt
node_modules
.DS_Store
```

続いて、`Procfile`を作ります。
`Procfile`はアプリケーションを起動するために実行するコマンドを記述するファイルです。

```txt
web: node index.js
```

これでもろもろの設定は終わりで、
最終的なディレクトリ構成は以下のようになります。

```txt
.
├── Procfile
├── index.js
├── node_modules/
├── package-lock.json
└── package.json
```

デプロイしていきます。まずは`Heroku`にログインしておきます。
```shell
$ heroku login
```

そもそも`Heroku`アカウントを持っていない人は[Heroku初心者がHello, Herokuをしてみる](https://qiita.com/Arashi/items/b2f2e01259238235e187)などを参考にして作ります。
`heroku`コマンドが使えない場合は[Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)を参考にHeroku CLIをインストールしておきます。

```shell
$ git add .
$ git commit -m "deploy"
$ heroku create
$ git push heroku master
$ heroku open
```

`curl`してみて、Web APIの完成を喜びます。

```shell
$ curl https://enigmatic-garden-50659.herokuapp.com/
Hello World!
```

# ルーティング
次は`index.js`を色々書き換えて遊びます。まずはルーティングをいじってみます。

> ルーティングとは、アプリケーションが特定のエンドポイントに対するクライアント要求に応答する方法として、URI (またはパス) と特定の HTTP要求メソッド (GET、POSTなど)を決定することです。
> 各ルートには、1つ以上のハンドラー関数があり、それらはルートが一致したときに実行されます。
> [基本的なルーティング](https://expressjs.com/ja/starter/basic-routing.html)

`Express.js`において、ルート定義は次のようにして行います。

```js
app.METHOD(PATH, HANDLER)
```
`app`はexpressのインスタンス、`METHOD`はHTTP要求メソッド、`PATH`は、サーバー上のパス、
`HANDLER`は、ルートが一致したときに実行される関数です。
試しに、先ほど作った`index.js`に新しいルート定義を追加してみます。

```js
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(request, response) {
  response.send('Hello World!\n');
});

app.get('/jp', function(request, response) {
  response.send('こんにちは\n');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
```

これは以下のように動作します。

```shell
$ curl http://localhost:3000/jp
こんにちは
```

# クエリ
次はクエリを取得します。
先ほど追加したルート定義のハンドラー関数を以下のように書き換えます。

```js
app.get('/jp', function(request, response) {
  const name = request.query.name || 'Name';
  response.send(`こんにちは ${name}\n`);
});
```

これは以下のように動作します。先ほどまでと違って、URLを`"`で括っている点に注意します。

```shell
$ curl "http://localhost:3000/jp?name=9sako6"
こんにちは 9sako6
```

# CORS
オリジン間リソース共有 (CORS, Cross-Origin Resource Sharing)を可能にします。
ブラウザは「[同一オリジンポリシー](https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy)」という仕組みを設け、異なるオリジンのリソースへのアクセスに制約をかけています。CORSは、この制約を一部解除し、異なるオリジン間でリソースを共有するための仕組みです。
CROSにより、任意のフロントエンドのJavaScriptコードから自作APIにリクエストできるようになります。


```js
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/', function(request, response) {
  response.send('Hello World!\n');
});

app.get('/jp', function(request, response) {
  response.send('こんにちは\n');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
```

# 参考
[All Articles - Heroku Dev Center](https://devcenter.heroku.com/articles)

[Node.js(Express) 事始め ＆ Heroku へデプロイまでのメモ - Qiita](https://qiita.com/hkusu/items/e46de8c446840c50aefe)

[CORS(Cross-Origin Resource Sharing) - とほほのWWW入門](http://www.tohoho-web.com/ex/cors.html)