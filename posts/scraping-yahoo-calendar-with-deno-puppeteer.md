---
title: "Yahoo! カレンダーの確認コード認証を突破してスクレイピングする"
description: '私的な理由で Yahoo! カレンダーから情報をとってきたいのですが、Yahoo! カレンダーには API がありません。 そこで本記事では、認証の確認コード入力以外を自動化してヘッドレスブラウザで Yahoo! カレンダーにログインする方法を提案します。 ログインさえできればあとは Yahoo! カレンダーに迷惑のかからない範囲で情報を取ってくることができます。'
topics: ["Deno", "TypeScript", "スクレイピング"]
category: "Technology"
published: false
date: "2022-04-02T04:11:00.000+09:00"
---

# 概要

私的な理由で Yahoo! カレンダーから情報をとってきたいのですが、Yahoo! カレンダーには API がありません。
そこで本記事では、認証の確認コード入力以外を自動化してヘッドレスブラウザで Yahoo! カレンダーにログインする方法を提案します。
ログインさえできればあとは Yahoo! カレンダーに迷惑のかからない範囲で情報を取ってくることができます。

# Yahoo! へのログインフロー（カレンダーへログインする場合）

記事を執筆している2022年3月14日現在、Yahoo! へログインする方法として、パスワード認証、確認コードによる認証（SMS）、確認コードによる認証（メール）の3種類の方法があります。

本記事では、このうちのパスワード認証を使いません。なぜなら、Yahoo! は確認コードによる認証の利用を推奨している上、パスワード認証には日常生活を送る上で不便な点があるためです。
Yahoo! のヘルプ [パスワードを使ったログインに戻したい](https://support.yahoo-net.jp/SccLogin/s/article/H000004633) によると、PayPay 等の利用時に本人確認が入ると SMS 認証に戻るようなのです。これは不便なため、なるべく Yahoo! の推奨する認証方法に沿って進めます。

それに加えて、パスワード認証をした場合に文字認証を求められる場合がありました。突破するのは無理です、というかしてはいけないでしょう。

![yahooで文字認証を求められたとき](//images.ctfassets.net/57a83iqiwfit/6IqQLjrggQopoD8CxhJZK8/cafa4b230757ed7a6f6b567675908699/20220325001355.png)

ということで、スクレイピングするためには確認コードによる認証を突破しなければなりません。

調査した結果、確認コードによる認証のフローは以下の通りでした。Chrome のゲストモードで確認しました。

## 確認コードによる認証（SMS）

次の流れでログインします。

1. https://calendar.yahoo.co.jp にアクセス
    - [https://login.yahoo.co.jp/config/login?.src=yc&.done=https%3A%2F%2Fcalendar.yahoo.co.jp%2F](https://login.yahoo.co.jp/config/login?.src=yc&.done=https%3A%2F%2Fcalendar.yahoo.co.jp%2F) にリダイレクトされ、下記の ID 入力フォームが表示されます。ログイン済みの場合はカレンダーが表示されます。
    ![YahooのIDフォーム](//images.ctfassets.net/57a83iqiwfit/7djYF1KKJVvlQBqrQmGLsh/5599f50910cd0fe092f7a39d11a75086/20220314160316.png)
2. ID、携帯電話番号、メールアドレスのいずれかを入力
    - ID を入力して「次へ」を押して画面遷移すると、確認コードが送信されるとともに入力画面が表示されます。
3. 確認コード入力
    - 登録された電話番号に届いた SMS 記載の確認コードを入力します。
4. ログイン完了
    - 最初にアクセスした https://calendar.yahoo.co.jp にリダイレクトされ、カレンダーが表示されます。
## 確認コードによる認証（メール）

SMS で確認コードを受け取る場合と同じ流れでログインします。

1. https://calendar.yahoo.co.jp にアクセス
2. ID、携帯電話番号、メールアドレスのいずれかを入力
3. 確認コード入力
4. ログイン完了

## SMS 用とメール用のどちらの入力フォームが表示されるか

パスワード認証・確認コードによる認証（SMS）・確認コードによる認証（メール）」の3種類の方法のどれを有効にしているかと、手順2で ID・携帯電話番号・メールアドレスのどれを入力するかによって、表示されるフォームが変わります。

- パスワード用フォーム
- SMS 用フォーム（「`***-****-XXXX`に届いた確認コードを入力してください。」が表示されるフォーム）
- メール用フォーム（「`**********@********`に届いた確認コードを入力してください。」が表示されるフォーム）

本記事ではパスワード認証を使わないので、ユーザーは予めパスワードによる認証を無効化していることを想定します。

- 手順2にて ID か携帯電話番号を入力した場合は SMS 用フォームが表示されます。
- 確認コードによる認証（メール）を無効化した上で、手順2にてメールアドレスを入力した場合は SMS 用フォームが表示されます。
- 確認コードによる認証（メール）を有効化した上で、手順2にてメールアドレスを入力した場合はメール用フォームが表示されます。

## コード送信上限

SMS、メールともに、一定時間内におけるコード送信回数に上限があります。
体感として、SMS の方が回数が少ないです。SMS で上限に達した場合でもメールには送信可能でした。
上限に達した場合、30分経過すると再度送信できるようになりました。

![Yahooのコード送信上限](//images.ctfassets.net/57a83iqiwfit/7lL5YRxoWGT1afTor51ulz/47a9e17fabadaf0e9ca34170b0e93114/20220314202423.png)

# Puppeteer の導入

Headless Chrome を Puppeteer で操作してスクレイピングします。
下記のコードに処理を実装していきます。

```typescript
// login.ts
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { readLines } from "https://deno.land/std@0.129.0/io/mod.ts";

const browser = await puppeteer.launch();
const page = await browser.newPage();

try {
  // 処理を書く
} catch (error) {
  console.error(error);

  await page.screenshot({ path: "./screenshots/error.png" });
} finally {
  await browser.close();
}

```

# Puppeteer によるログインの実装

確認コードによる認証の場合の Deno 実装です。

SMS の場合もメールの場合も、同じコードでログインできます。

- ID・携帯電話番号・メールアドレスを入力→「次へ」ボタンクリック→「確認コード」フォームに入力→「ログイン」ボタンクリック

という流れです。入力されるのが ID・携帯電話番号・メールアドレスのどれであっても、「確認コード」がプレースホルダになったフォームが表示されます。
ID・携帯電話番号・メールアドレスのどれが入力されたかを意識しなくて済むのは楽でした。

罠として、ログインした後にたまに広告が表示されることがありました。
その場合はサービスに戻るリンクを押してカレンダーを表示しています。
他にもコーナーケースが隠れていそうです。

ログインできたら、cookie をローカルに JSON で保存します。
この cookie を使えば再認証なしでログインできるようになります。

```typescript
// login.ts
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { readLines } from "https://deno.land/std@0.129.0/io/mod.ts";

const browser = await puppeteer.launch();
const page = await browser.newPage();

try {
  await page.goto("https://calendar.yahoo.co.jp");
  await page.screenshot({
    path: "./screenshots/after-access-calendar-page.png",
  });

  // Input a user ID or telephone number.
  console.log("> Yahoo! ID か電話番号かメールアドレスを入力してください");
  const userId = (await readLines(Deno.stdin).next()).value as string;
  await page.type('input[placeholder="ID/携帯電話番号/メールアドレス"]', userId);

  await page.screenshot({ path: "./screenshots/after-input-userid.png" });

  // Click the "次へ" button and wait for rendering.
  const [submitUserIdButton] = await page.$x('//button[contains(., "次へ")]');
  await Promise.all([
    page.waitForNavigation(),
    submitUserIdButton.click(),
  ]);

  await page.screenshot({
    path: "./screenshots/after-click-userid-submit-button.png",
  });

  // Input a verification code.
  console.log("> 届いた確認コードを入力してください");
  const verificationCode = (await readLines(Deno.stdin).next()).value as string;
  await page.type('input[placeholder="確認コード"]', verificationCode);

  await page.screenshot({
    path: "./screenshots/after-inpupt-code.png",
  });

  // Click the "ログイン" button and wait for rendering.
  const [loginButton] = await page.$x('//button[contains(., "ログイン")]');
  await Promise.all([
    page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
    loginButton.click(),
  ]);

  // 広告が表示された場合に閉じる。
  const [backLink] = await page.$x('//a[contains(., "ご利用中のサービスに戻る")]');
  if (backLink) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
      backLink.click(),
    ]);
  }

  await page.screenshot({
    path: "./screenshots/after-login.png",
  });

  const cookies = await page.cookies();

  await Deno.writeTextFile("./cookies.json", JSON.stringify(cookies));
  console.log(cookies);
} catch (error) {
  console.error(error);

  await page.screenshot({ path: "./screenshots/error.png" });
} finally {
  await page.screenshot({ path: "./screenshots/final.png" });
  await browser.close();
}

```

ログインするとカレンダーが表示されます。

![Yahoo! Calendar](//images.ctfassets.net/57a83iqiwfit/4ZKilYzGsydhW3OBTrU6OD/4f535871584486109f7a0a91dbbf6f66/20220315005832.png)

初回認証時に得た cookie を使ってログインする方法は以下の通りです。
cookie の有効期間内は確認コードによる認証なしでログインできるようになるので、あとは Yahoo! カレンダーに迷惑のかからない範囲で好きに操作できます。

```typescript
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

const browser = await puppeteer.launch();
const page = await browser.newPage();

try {
  const cookies = JSON.parse(await Deno.readTextFile("./cookies.json"));
  for (const cookie of cookies) {
    await page.setCookie(cookie);
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
    page.goto("https://calendar.yahoo.co.jp"),
  ]);
} catch (error) {
  console.error(error);

  await page.screenshot({ path: "./screenshots/error.png" });
} finally {
  await page.screenshot({ path: "./screenshots/final.png" });
  await browser.close();
}

```

# おわりに

保存した cookie は Yahoo! のログインに使用できるため、取り扱いに注意が必要です。カレンダーだけでなく他のサービスにもログインできてしまいます。
