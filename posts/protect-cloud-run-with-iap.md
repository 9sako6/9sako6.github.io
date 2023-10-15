---
title: "Identity-Aware Proxy (IAP)で Cloud Run サービスにアクセス制限をかける"
description: "Cloud Run で立ち上げたサービスに特定のユーザー (Google アカウント)だけがアクセスできるようにします。"
topics: ["Google Cloud", "Cloud Run", "Identity-Aware Proxy"]
category: "Technology"
published: true
eyecatch: ""
date: "2023-10-14T23:00:00.595+09:00"
---

# 目次

# 実現したいこと

Identity-Aware Proxy (IAP) を使って、Cloud Run で立ち上げたサービスに特定のユーザー (Google アカウント)だけがアクセスできるようにします。

![IAPで保護されたCloud Runのページ](/images/iap-protect.png)

ユーザーがアクセスした際の処理の流れを説明します。

1. Web クライアントからのリクエスト
    - ユーザーは何らかのドメイン (example.dev)にアクセスします
    - example.dev は Google Cloud 上のロードバランサにルーティングされます
1. ロードバランサでの処理
   - ユーザーからのリクエストをサーバーレスなバックエンドにルーティングします
   - IAP を有効にするにはロードバランサが必要です
1. IAP によるアクセス制御
    - ロードバランサ経由で IAP にリクエストが届きます
    - IAP は許可されたユーザーからのリクエストのみを許可します
1. Serverless NEG からのルーティング
    - リクエストは Serverless NEG を経由して Cloud Run のサービスにルーティングされます
1. Cloud Run での処理
    - Cloud Run はリクエストを処理し、Web クライアントにレスポンスを返します

![Google Cloud 構成図](/images/cloud-run-with-iap-architecture.png)

これを実現するためにいろいろ準備する必要があるので、順に説明します。

- Cloud Run でサービスを立ち上げる
- ロードバランサの作成
  - ドメイン
  - 外部 IP アドレス
  - SSL 証明書
  - Serverless NEG
- IAP の設定

# Cloud Run でサービスを立ち上げる

今回は説明用にサンプルのサービスを使います。
[Cloud Run](https://console.cloud.google.com/run) のページで [サービスを作成] をクリックして作成画面を開きます。

- [サンプル コンテナでテスト] をクリック
- リージョンは asia-northeast1 (東京)
  - 後で Serverless NEG を作るときには同じリージョンにします
- [Ingress の制御] は [内部] と [外部アプリケーション ロードバランサからのトラフィックを許可する] にチェック
- [認証] は [未認証の呼び出しを許可] にチェック

[Ingress の制御] と [認証] の設定はサービス作成後でも変更できます。

![Sample Cloud Run Service](/images/cloud-run-sample-service.png)

# ロードバランサの作成

Cloud Load Balancing でロードバランサを作っていきます。
まずはロードバランサにアクセスするための DNS 設定を行います。
その後、ロードバランサを作成し、Cloud Run のサービスに接続できるようにします。


## ドメインの用意

ロードバランサにアクセスするために、ドメインを用意する必要があります。
ドメインのレジストラは何でも良いです。
今回私は検証用に新しくサブドメイン sandbox.9sako6.com を作っておきました。

## IP アドレスの予約

[VPC ネットワークのIP アドレス](https://console.cloud.google.com/networking/addresses/list) にて、外部静的アドレスを予約します。

- [タイプ] は [グローバル] にします。

![Sample IP](/images/cloud-run-ip.png)

発行された IP アドレスを控えて DNS 設定に移ります。

## DNS 設定

自分がドメインを取得したレジストラの管理画面で設定していきます。

設定したいドメインの A レコードに、先ほど発行した IP アドレスを設定します。
私は Cloudflare DNS でドメインを管理しているので例として載せます。

![Sample DNS](/images/cloud-run-dns-sample.png)

## ロードバランサの設定

[ネットワークサービスのロードバランシング](https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers) にて、[ロードバランサを作成] をクリックして作成を開始します。

- [アプリケーション ロードバランサ（HTTP/S）] で [構成を開始] します
- [インターネット接続または内部専用] は [インターネットから VM またはサーバーレス サービスへ] を選択します
- [グローバル / リージョン] は [グローバル外部アプリケーション ロードバランサ] を選択します

フロントエンドの構成を作っていきます。

- [プロトコル] を [HTTPS（HTTP/2 を含む）] にします
- [IP address] として、先ほど予約した IP アドレスを選択します
- [証明書] は [新しい証明書を作成] から新しい証明書を作成します
  - 証明書作成画面で [作成モード] は [Google マネージドの証明書を作成する] を選択します
  - 証明書作成画面で [ドメイン] には DNS 設定したドメインを入力します

SSL 証明書のステータスは Certificate Manager の [従来の証明書] タブから確認できます。
証明書作成画面での入力を完了した段階では `PROVISIONING` というステータスになり、完了すると `ACTIVE` になります。
`FAILED_NOT_VISIBLE` などの状態になって失敗する場合は [SSL 証明書のトラブルシューティング](https://cloud.google.com/load-balancing/docs/ssl-certificates/troubleshooting?hl=ja) を確認してみてください。

なお、私は [こちらの質問](https://stackoverflow.com/questions/53886750/google-managed-ssl-certificate-stuck-on-failed-not-visible) を参考に Cloudflare DNS で Proxy を無効にしたら10分後くらいに `FAILED_NOT_VISIBLE` から `ACTIVE` になっていました。

![Sample new SSL](/images/cloud-run-sample-ssl-new.png)

![Sample LB Frontend](/images/cloud-run-lb-frontend-sample.png)

次に、バックエンドの構成を作ります。

- [バックエンド サービスとバックエンド バケット] で [バックエンド サービスを作成] を選択します
- バックエンド サービスの作成画面で [バックエンド タイプ] として [サーバーレス ネットワーク エンドポイント グループ] を選択します
- バックエンド サービスの作成画面で [新しいバックエンド] として新たに Serverless NEG を作成して指定します。
  - [新しいバックエンド] の [サーバーレス ネットワーク エンドポイント グループ] で [サーバーレス ネットワーク エンドポイント グループの作成] をクリックします
    - サーバーレス ネットワーク エンドポイント グループの作成画面で、[リージョン] は Cloud Run サービスを立ち上げた asia-northeast1 (東京)にします
    - サーバーレス ネットワーク エンドポイント グループの作成画面で、[サーバーレス ネットワーク エンドポイント グループの種類] は [Cloud Run] を選択します
    - サーバーレス ネットワーク エンドポイント グループの作成画面で、[サービスを選択] から、目的の Cloud Run サービスを選択します

![Sample LB Backend](/images/cloud-run-lb-backend-sample.png)


ロードバランサの残りの設定 [ルーティングルール]、[確認と完了] は何もしなくてよいです。

設定が正常に完了し、SSL 証明書が `ACTIVE` になっていたらこの時点でロードバランサの URL (本記事では sandbox.9sako6.com)で Cloud Run のサービスにアクセスできるはずです。

# IAP の設定

特定のユーザーだけが Cloud Run のサービスにアクセスできるようにしていきます。

前準備として、プロジェクトの OAuth 同意画面をまだ構成していない場合は、[API とサービスの OAuth 同意画面](https://console.cloud.google.com/apis/credentials/consent)から作成しましょう。

- [ユーザーの種類] は [外部] にします

[Identity-Aware Proxy](https://console.cloud.google.com/security/iap) ページで、ロードバランサに対して IAP を有効にします。

![IAP sample](/images/cloud-run-iap-sample.png)

アクセス可能なユーザーを追加する手順を説明します。

- IAP を選択して [プリンシパルを追加] をクリックします

![IAP add user](/images/cloud-run-iap-sample-add-user.png)

- [新しいプリンシパル] にユーザーのメールアドレスを入力します
- [ロール] として [IAP-secured Web App User] を選択します

![IAP right sample](/images/cloud-run-iap-right-sample.png)

最後に、IAP が Cloud Run にトラフィックを送信できるようにする必要があります。
具体的には、[Cloud Run](https://console.cloud.google.com/run) のページから以下のように確認できる `service-[PROJECT-NUMBER]@gcp-sa-iap.iam.gserviceaccount.com` というサービスアカウントに対して、IAM で権限を付与します。

![Cloud Run service account sample](/images/cloud-run-service-account-sample.png)

[IAM と管理の IAM](https://console.cloud.google.com/iam-admin/iam) にて、[アクセス権を付与] をクリックします。

- [新しいプリンシパル] として先ほどのサービスアカウント `service-[PROJECT-NUMBER]@gcp-sa-iap.iam.gserviceaccount.com` を入力します
- [ロール] として [Cloud Run 起動元] を選択します


IAM 設定が保存されたかどうかは、[Google 提供のロール付与を含める] にチェックを入れると確認できます。

# 動作確認

ロードバランサの URL にアクセスすると、Google アカウントのログイン画面が表示されます。
IAP-secured Web App User ロールを追加したユーザーでログインすると、サービスにアクセスできます。
それ以外の、許可されていないユーザーでログインすると、アクセス拒否されます。

Cloud Run へのアクセスはロードバランサ経由のものだけを許可しているので、直接 Cloud Run の `https://xxx.run.app` といった URL にアクセスしても 404 が返ります。

![IAPで保護されたCloud Runのページ](/images/iap-protect.png)

Cloud Load Balancing と IAP を使うことで特定の Google アカウントだけにアクセスを許可することができるようになりました。
アクセス権限を絞りたい管理画面や、ステージング環境に使えると思います。

# 料金

月間 10,000 リクエスト、トラフィックが 1 GiB くらいのあまり使われないアプリだと想定して [Google Cloud Pricing Calculator で試算](https://cloud.google.com/products/calculator/#id=c952d014-a533-4976-9c90-628df48ce22e) してみました。

結果は合計で月 2.94 USD でした。

Cloud Load Balancing, Cloud Run は合計 0.02 USD でした。
IP Address が一番高くて 2.92 USD かかってしまいます、たぶん。

# 参考

1. [Cloud Run での IAP の有効化  |  Identity-Aware Proxy  |  Google Cloud](https://cloud.google.com/iap/docs/enabling-cloud-run?hl=ja)
1. [Cloud Run、App Engine、または Cloud Functions を使用して従来のアプリケーション ロードバランサを設定する  |  負荷分散  |  Google Cloud](https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless?hl=ja)
1. [Identity-Aware Proxy(IAP)とCloud Armorを使用してCloud Runサービスへのアクセス制御を実装する - G-gen Tech Blog](https://blog.g-gen.co.jp/entry/authentication-for-cloud-run-with-iap#IP-%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E3%81%AE%E7%A2%BA%E4%BF%9D%E3%81%A8-DNS-%E8%A8%AD%E5%AE%9A)
1. [Cloud Run で Identity-Aware Proxy (IAP) を使う](https://zenn.dev/ww24/articles/19099c85febe0d)
1. [モノレポ環境の Next.js を Cloud Run にデプロイして社内のメンバーだけが閲覧できるようにするまで](https://zenn.dev/jj/scraps/8070ee137830be#comment-80225db7a11f9a)
1. [Cloud Run user auth for internal apps - YouTube](https://www.youtube.com/watch?v=ayTGOuCaxuc)
1. [Google Managed SSL Certificate Stuck on FAILED_NOT_VISIBLE - Stack Overflow](https://stackoverflow.com/questions/53886750/google-managed-ssl-certificate-stuck-on-failed-not-visible)
