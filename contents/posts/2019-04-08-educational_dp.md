---
title: Educational DP Contest / DP まとめコンテストをPython3で解く
description: Educational DP Contest / DP まとめコンテストを解いて、生やした考察やミスりポイント、Tipsを記録していく記事...
tags:
  - 競技プログラミング
  - 雑記
  - Python3
created_at: 2019-04-08
updated_at: 2019-04-28
draft: true
---

[Educational DP Contest / DP まとめコンテスト](https://atcoder.jp/contests/dp/)
をひたすら解いて、生やした考察やミスりポイント、Tipsを記録していく記事。
くさころが文章を書く練習をする記事でもある。
A問題からZ問題まで26問ある。
（解ききるのはいつになるか...）

# A - Frog 1
[A - Frog 1](https://atcoder.jp/contests/dp/tasks/dp_a)

## 解法
### 解法1
貰うDP
```python
n=int(input())
h=list(map(int, input().split()))
dp=[10**10]*n
dp[0]=0
dp[1]=abs(h[0]-h[1])
for i in range(2, n):
    dp[i] = min(dp[i-1]+abs(h[i]-h[i-1]), dp[i-2]+abs(h[i]-h[i-2]))
print(dp[-1])
```
### 解法2
配るDP
```python
n=int(input())
h=list(map(int, input().split()))+[0]*10
dp=[10**10]*(n+10)
dp[0]=0
dp[1]=abs(h[0]-h[1])
for i in range(0, n):
    dp[i+1] = min(dp[i+1], dp[i]+abs(h[i]-h[i+1]))
    dp[i+2] = min(dp[i+2], dp[i]+abs(h[i]-h[i+2]))
print(dp[n-1])
```

## 学び
類題：[C - 柱柱柱柱柱](https://atcoder.jp/contests/abc040/tasks/abc040_c)

# B - Frog 2
[B - Frog 2](https://atcoder.jp/contests/dp/tasks/dp_b)

配るDPで解く。（貰うDPで解けるのか？
```python
n,k=map(int, input().split())
h=list(map(int, input().split()))+[0]*2*k
dp=[10**10]*(n*10)+[10**10]*2*k
dp[0]=0
dp[1]=abs(h[0]-h[1])
for i in range(n):
    for j in range(1,k+1):
        dp[i+j] = min(dp[i+j], dp[i]+abs(h[i]-h[i+j]))
print(dp[n-1])
```
## 学び

類題：[C - Strange Bank](https://atcoder.jp/contests/abc099/tasks/abc099_c)

# C - Vacation
[C - Vacation](https://atcoder.jp/contests/dp/tasks/dp_c)

## 学び

## D
[D - Knapsack 1](https://atcoder.jp/contests/dp/tasks/dp_d)
ナップサック DP。
