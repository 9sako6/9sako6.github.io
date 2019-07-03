---
title:
description:
tags:
  - 
created_at: 2019-07-03
updated_at: 
draft: true
---
そもそも、特異メソッドを定義する方法には
- 特異メソッド形式
  - `def instance_name.method_name`のようにして定義する方法
- 特異クラス形式
  - `class << instance_name`で特異クラスのインスタンスメソッドとして定義する方法
がある。

特異メソッド形式による定義の例：

`def instance_name.method_name`というのはこういう意味。

```ruby
class Bar
  def Bar.hoge
    "hoge"
  end
end
```

```ruby
# 普通はselfを使う
class Bar
  def self.hoge
    "hoge"
  end
end
```

```ruby
# class ClassNameという記法は
# ClassNameというグローバル定数に
# Classクラスのインスタンスを作成して代入するという意味
# なのでこんな書き方もある
Bar = Class.new

def Bar.hoge
  "hoge"
end
```

特異クラス形式による定義の例：

```ruby
```