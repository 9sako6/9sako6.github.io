---
title: "Whisper でリアルタイムに文字起こしする実験"
description: ""
topics: ["Whisper", "Python"]
category: "Random"
published: true
eyecatch: ""
date: "2022-12-04T15:50:11.181+09:00"
---

OpenAI の Whisper は汎用的な音声認識モデルらしいです。流行りものを触っておくべく、ひとまずしゃべった内容をリアルタイムに文字起こししてみます。

# 環境

Mac OS で動作確認しています。

```bash
$ python --version
Python 3.9.6

$ sw_vers
ProductName:    macOS
ProductVersion: 12.6
BuildVersion:   21G115
```

# 実装

録音と文字起こしを別スレッドで行います。

まず、PyAudio を使って録音した音声を tmp ファイルに保存します。tmp ファイルのパスをキューに入れておきます。

文字起こしスレッドでは、キューから音声ファイルのパスを取り出して読み込み、Whisper で文字起こししています。Whisper の使い方はほぼ
[README](https://github.com/openai/whisper#python-usage) のままです。

無言の時間を文字起こししないように、雑な閾値を設けています。

```python
import os
import tempfile
import threading
import numpy
import pyaudio
import wave
import whisper
import argparse
import queue

FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
INTERVAL = 10
BUFFER_SIZE = 4096

parser = argparse.ArgumentParser()
parser.add_argument('--model', default='base')
args = parser.parse_args()

print('Loading model...')
model = whisper.load_model(args.model)

pa = pyaudio.PyAudio()

stream = pa.open(format=FORMAT,
                 channels=CHANNELS,
                 rate=RATE,
                 input=True,
                 frames_per_buffer=BUFFER_SIZE
                 )

print("Start recording")

q = queue.Queue()


def clean():
    stream.stop_stream()
    stream.close()
    pa.terminate()

    while not (q.empty()):
        file_path = q.get()
        os.remove(file_path)


def transcribe():
    file_path = q.get()

    audio = whisper.load_audio(file_path)
    os.remove(file_path)

    audio = whisper.pad_or_trim(audio)

    mean = numpy.mean(numpy.abs(audio))

    print("mean: ", mean)

    if (mean < 0.002):
        print("[Silent]")
        return

    # make log-Mel spectrogram and move to the same device as the model
    mel = whisper.log_mel_spectrogram(audio).to(model.device)
    # detect the spoken language
    _, probs = model.detect_language(mel)
    print(f"Detected language: {max(probs, key=probs.get)}")
    # decode the audio
    options = whisper.DecodingOptions(fp16=False)
    result = whisper.decode(model, mel, options)
    print(f'{max(probs, key=probs.get)}: {result.text}')


def gen_text():
    while True:
        transcribe()


def save_audio(data: bytes):
    _, output_path = tempfile.mkstemp(suffix=".wav")
    wf = wave.open(output_path, "wb")
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(pa.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(data)
    wf.close()
    return output_path


threading.Thread(target=gen_text, daemon=True).start()

try:
    buffer = []
    while True:
        n = 0
        while n < RATE * INTERVAL:
            data = stream.read(BUFFER_SIZE)
            buffer.append(data)
            n += len(data)

        output_path = save_audio(b"".join(buffer))

        q.put(output_path)

        buffer = []


except:
    print("Stop recording")
    clean()
```

最新のコードはリポジトリを確認してください。

https://github.com/9sako6/whiscord

# 動作

実際に動かすとこんな感じになります。今は `INTERVAL = 10` とあるように、10秒ごとに文字起こししているので精度が出ていない気がしますね。

```bash
$ python main.py
Loading model...
Start recording
mean:  0.0058724633
Detected language: ja
ja: リアルタイムで文字を越ししています
mean:  0.0076138894
Detected language: ja
ja: 短くくぎっているせいで、あまりセイドが
mean:  0.0033080776
Detected language: ja
ja: 高くないですゆっくりしゃべる
mean:  0.004548736
Detected language: ja
ja: 上らないとうまく文字列に
mean:  0.0029536195
Detected language: ja
ja: できない感じがする
^CStop recording
```

# References

1. [openai/whisper: Robust Speech Recognition via Large-Scale Weak Supervision](https://github.com/openai/whisper#python-usage)
2. [PCで再生中の音声をWhisperでリアルタイムに文字起こしする - TadaoYamaokaの開発日記](https://tadaoyamaoka.hatenablog.com/entry/2022/10/15/175722)
