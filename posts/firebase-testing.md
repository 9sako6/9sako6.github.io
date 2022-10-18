---
title: "Fireabse testing"
description: ""
topics: []
published: false
eyecatch: ""
date: "2022-06-05T14:23:23.677+09:00"
---

Firebase CLI をインストールします。

[Firebase CLI リファレンス | Firebase Documentation](https://firebase.google.com/docs/cli?hl=ja)

```bash
npm install -g firebase-tools
```

```bash
firebase login
```

`firebase projects:list` でプロジェクトを確認し、ログインできていることを確認します。

```bash
$ firebase projects:list

✔ Preparing the list of your Firebase projects
┌──────────────────────┬───────────────────────┬────────────────┬──────────────────────┐
│ Project Display Name │ Project ID            │ Project Number │ Resource Location ID │
├──────────────────────┼───────────────────────┼────────────────┼──────────────────────┤
│ sample               │ versatile-math-111113 │ 181411810731   │ asia-northeast1      │
└──────────────────────┴───────────────────────┴────────────────┴──────────────────────┘

1 project(s) total.
```

```bash
firebase emulators:start --only firestore
```

# Local Emulator Suite のインストール

[Local Emulator Suite を設定する  |  Firebase Documentation](https://firebase.google.com/docs/rules/emulator-setup?hl=ja)

```bash
firebase init
firebase init emulators
```

```bash
? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your c
hoices. (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 ◉ Firestore: Configure security rules and indexes files for Firestore
 ◯ Functions: Configure a Cloud Functions directory and its files
 ◯ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
❯◯ Hosting: Set up GitHub Action deploys
 ◯ Storage: Configure a security rules file for Cloud Storage
 ◉ Emulators: Set up local emulators for Firebase products
 ◯ Remote Config: Configure a template file for Remote Config
(Move up and down to reveal more choices)
```

`.gitignore` に追加。

```
# firebase
firestore-debug.log
ui-debug.log
```

#

```bash
yarn add firebase
```
