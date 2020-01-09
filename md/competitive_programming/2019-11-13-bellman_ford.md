---
title: "Bellman-Ford法の解説"
description: ""
tags:
  - "グラフ"
  - "単一始点最短路問題"
  - Bellman-Ford法
created_at: 2019-11-13
updated_at: 2019-11-13
draft: false
---

この記事では、\\(|V| - 1\\)回のループで最短距離が求まる理由にも触れて解説します。
間違ってたらつっこみをください。

# Bellman-Ford法
重み付き有向グラフにおいて、始点を固定したとき、その始点と任意の頂点との間の最短距離を求めるアルゴリズムです。
つまり、単一始点最短路問題を解くアルゴリズムです。

負の重みを持つ辺があっても使えます。さらに、負閉路（辺の重みの総和が負になる閉路）の検出にも使えます。

## アルゴリズムの説明

頂点の集合を\\(V\\)、辺の集合を\\(E\\)とします。計算量は\\(O(|V||E|)\\)です（この理由は後述）。

始点\\(s\\)から頂点\\(i\\)への最短距離を\\(d[i]\\)とします。
最初は\\(d[s]\\)を\\(0\\)、 \\(d[i]\\)を十分大きな数で初期化しておきます。

```c++
int d[V];
fill(d, d + V, INF);
d[s] = 0;
```

その後、\\(|V| - 1\\)回ループを回し、全ての辺を**緩和**することで全ての頂点\\(i\\)に対して\\(d[i]\\)が求まります。
緩和というのは、最短距離と思われる距離に置き換える操作のことです。（\\(INF\\)だった距離を、始点から求まった距離で置き換えてどんどん最短距離に近づけていく操作です。）

```c++
struct Edge {
    int from, to, cost;
};

for (int i = 0; i < V - 1; ++i) {
  for (int j = 0; j < E; ++j) 
    Edge e = edges[j];
    if (d[e.from] != INF && d[e.to] > d[e.from] + e.cost) {
      d[e.to] = d[e.from] + e.cost; // 緩和
    }
  }
}
```

緩和については合意できるかと思います。`e.from`から`e.to`へ、もっと短い距離でいけるなら更新しているだけです。`d[e.from] != INF`としているのは、単に`d[e.from] == INF`のとき緩和にならないからです。

理解し難いのは、\\(|V| - 1\\)回ループを回せば最短距離が求まるという点かもしれません。

## \\(|V| - 1\\)回のループで最短距離が求まる理由

これを理解するには、まず最短路と緩和の性質である「経路緩和性」を知る必要があります。

\\(s = v_0\\)から\\(v_k\\)に至る最短路を\\(p = <v_0, v_1, ..., v_k> \\)と書くことにします。

>**経路緩和性**   
\\(p = <v_0, v_1, ..., v_k> \\)が\\(s = v_0\\)から\\(v_k\\)に至る最短路で, \\(p\\)の辺が\\((v_0, v_1), (v_1, v_2), ..., (v_{k-1}, v_k)\\)の順で緩和されたとき, \\(d[v_k]=\delta(s, v_k)\\)が成立する。ただし、\\(\delta(s, v_k)\\)は\\(s\\)から\\(v_k\\)への最短距離。  
（参考2より）

これは帰納法で証明することができます。（ここでは書きません。参考2に載っています。）

**つまり、1回目のループでは、始点から、始点に隣接する点への最短距離が求まります。次のループでは、始点に隣接する点から、それらに隣接する点への最短距離が求まります。このように、始点から順に最短距離が求まっていって、高々\\(|V|-1\\)回のループで任意の点への最短距離が求まります。**

なぜ高々\\(|V| - 1\\)回なのかを説明します。負閉路のない場合を考えると、最短路において、同じ頂点を2回以上通ることはありません。同じ頂点を2回以上通っても、距離が伸びるだけだからです。つまり、最短路は高々\\(|V| - 1\\)個の辺しか通らないので、最短路の最大パス長は\\(|V| - 1\\)です。したがって、\\(|V| - 1\\)回のループを回せば、最短路が求まります。

ということで、計算量は\\(O(|V||E|)\\)です。

## 負閉路の検出
\\(|V| - 1\\)回のループで最短路が求まることを利用して、負閉路を検出することができます。
これは簡単で、\\(|V|\\)回目のループで更新が発生するかどうかを調べれば良いです。


```c++
for (int i = 0; i < V; ++i) {
  for (int j = 0; j < E; ++j) {
    Edge e = edges[j];
    if (d[e.from] != INF && d[e.to] > d[e.from] + e.cost) {
      if (i == V - 1) {
        cout << "NEGATIVE CYCLE" << endl;
        return 0;
      }
      d[e.to] = d[e.from] + e.cost; // 緩和
    }
  }
}
```

## コード

Verify用問題([単一始点最短経路（負の重みをもつ辺を含む）](https://onlinejudge.u-aizu.ac.jp/problems/GRL_1_B))です。

[submission](https://onlinejudge.u-aizu.ac.jp/status/users/qsako6/submissions/1/GRL_1_B/judge/3986695/C++14)

```c++
#include <iostream>

using namespace std;
const int INF = (1 << 30);

struct Edge {
  int from, to, cost;
};

int main() {
  int V, E, r;
  cin >> V >> E >> r;
  Edge edges[E];
  for (int i = 0; i < E; ++i) {
    int s, t, c;
    cin >> s >> t >> c;
    edges[i] = Edge({s, t, c});
  }
  int d[V];
  fill(d, d + V, INF);
  d[r] = 0;
  for (int i = 0; i < V; ++i) {
    for (int j = 0; j < E; ++j) {
      Edge e = edges[j];
      if (d[e.from] != INF && d[e.to] > d[e.from] + e.cost) {
        if (i == V - 1) {
          cout << "NEGATIVE CYCLE" << endl;
          return 0;
        }
        d[e.to] = d[e.from] + e.cost;
      }
    }
  }
  for (int i = 0; i < V; ++i) {
    if (d[i] == INF) {
      cout << "INF" << endl;
    } else {
      cout << d[i] << endl;
    }
  }

  return 0;
}
```

# 参考
1. [https://ja.wikipedia.org/wiki/ベルマン–フォード法](https://ja.wikipedia.org/wiki/%E3%83%99%E3%83%AB%E3%83%9E%E3%83%B3%E2%80%93%E3%83%95%E3%82%A9%E3%83%BC%E3%83%89%E6%B3%95)
1. [http://agent.inf.kyushu-u.ac.jp/~yokoo/lecture/DA2_09.pdf](http://agent.inf.kyushu-u.ac.jp/~yokoo/lecture/DA2_09.pdf)
