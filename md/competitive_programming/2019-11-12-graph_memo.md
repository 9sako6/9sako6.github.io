---
title: "Dijkstra法, Bellman-Ford法, Warshall–Floyd法のメモ"
description: "計算量や特徴など..."
tags:
  - グラフ
  - BFS
  - Bellman-Ford法
  - Dijkstra法
  - Warshall–Floyd法
  - 単一始点最短路問題
  - 全点対最短路問題
  - メモ
created_at: 2019-11-12
updated_at: 2019-12-05
draft: false
---

頂点数を\\(V\\), 辺数を\\(E\\)とする。

- **Bellman-Ford法**
  - 単一始点最短路問題
  - \\(O(VE)\\)
  - 負の辺があっても使える
  - 負閉路（辺の重みの総和が負になる閉路）検出ができる

- **Dijkstra法**
  - 負の辺がない場合の単一始点最短路問題
  - \\(O(ElogV)\\) or \\(O(V^2)\\)
  - 改造すると最短路の個数も一緒に求まる（[参考](http://drken1215.hatenablog.com/entry/2018/02/09/003200)）
  - 辺の重みが全て同一ならBFSで\\(O(E)\\)

- **Warshall–Floyd法**
  - 全点対最短路問題
  - \\(O(V^3)\\)
  - 負閉路がない限り、負の辺があっても使える
