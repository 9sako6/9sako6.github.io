---
title: Google ColabでBERTの学習済みモデルを動かす
description: 'BERTを動かし、GLUEタスクを解いてみる'
tags:
  - BERT
  - NLP
  - DeepLearning
  - Google Colab
created_at: 2019-05-15
updated_at: 
---

Google Colab上でとりあえず[BERT](https://github.com/google-research/bert)を動かし、GLUEタスクを解いてみる。
その忘備録。

## 準備
まずは公式リポジトリをクローンする。

```shell
!git clone https://github.com/google-research/bert
```

次に学習済みモデルをダウンロードし、解凍。

```shell
!wget https://storage.googleapis.com/bert_models/2018_10_18/uncased_L-12_H-768_A-12.zip
!unzip uncased_L-12_H-768_A-12.zip
```

[W4ngatang/download_glue_data.py](https://gist.github.com/W4ngatang/60c2bdb54d156a41194446737ce03e2e)を用いて、GLUEデータセットをダウンロードする。

```shell
!test -d glue_repo || git clone https://gist.github.com/60c2bdb54d156a41194446737ce03e2e.git glue_repo
!python download_glue_repo/download_glue_data.py --data_dir='glue_data' --tasks=all
```

実行すると`glue_data`にデータセットがダウンロードされる。

```shell
Downloading and extracting CoLA...
	Completed!
Downloading and extracting SST...
	Completed!
Processing MRPC...
Local MRPC data not specified, downloading data from https://dl.fbaipublicfiles.com/senteval/senteval_data/msr_paraphrase_train.txt
	Completed!
Downloading and extracting QQP...
	Completed!
Downloading and extracting STS...
	Completed!
Downloading and extracting MNLI...
	Completed!
Downloading and extracting SNLI...
	Completed!
Downloading and extracting QNLI...
	Completed!
Downloading and extracting RTE...
	Completed!
Downloading and extracting WNLI...
	Completed!
Downloading and extracting diagnostic...
	Completed!
```

## MRPC
MRPCタスクを解いてみる。

```shell
TASK = 'MRPC'
BERT_BASE_DIR = 'uncased_L-12_H-768_A-12'
GLUE_DIR = 'glue_data'

!python bert/run_classifier.py \
  --task_name=$TASK \
  --do_train=true \
  --do_eval=true \
  --data_dir=$GLUE_DIR/$TASK \
  --vocab_file=$BERT_BASE_DIR/vocab.txt \
  --bert_config_file=$BERT_BASE_DIR/bert_config.json \
  --init_checkpoint=$BERT_BASE_DIR/bert_model.ckpt \
  --max_seq_length=128 \
  --train_batch_size=32 \
  --learning_rate=2e-5 \
  --num_train_epochs=3.0 \
  --output_dir=/tmp/mrpc_output/
```

数分で学習と評価が終了し、結果は以下のようになった。

```shell
INFO:tensorflow:***** Eval results *****
INFO:tensorflow:  eval_accuracy = 0.8627451
INFO:tensorflow:  eval_loss = 0.48449218
INFO:tensorflow:  global_step = 343
INFO:tensorflow:  loss = 0.48449218
```

## 所感
最近のNLPはBERTに代表されるつよつよな言語モデルを作って殴るのが主流なのかなあと感じている。せめてBERTは押さえておきたくて軽く動かしてみた。
動かすだけなら簡単だった。

次は自分で設定したタスクのfinetuningをしたり、[BERT日本語Pretrainedモデル](http://nlp.ist.i.kyoto-u.ac.jp/index.php?BERT%E6%97%A5%E6%9C%AC%E8%AA%9EPretrained%E3%83%A2%E3%83%87%E3%83%AB)を使うまでやりたい。


## 参考
- [google-research/bert
](https://github.com/google-research/bert)
- [BERTの学習済みモデルを使ってみる](https://techblog.nhn-techorus.com/archives/12978)
- [5分でできる：Googleの自然言語処理AI（BERT）をTPU上で転移学習 - Qiita](https://qiita.com/uedake722/items/fb9877fc45224353b44b)