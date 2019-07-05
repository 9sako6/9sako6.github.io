---
title: Rubyのinclude, extendの違いをここで理解しよう
description: いつもこんがらがるinclude, extendの違いについて、ここでマスターする。さらに、これらを用いる利点について述べる。
tags:
  - Ruby
created_at: 2019-07-03
updated_at: 
draft: false
---

ざっくり言うとそれぞれ次のことをする。

- `include`
  - モジュールのインスタンスメソッドが**インスタンスメソッド**として使えるようになる
  - 定数も引き継がれる

- `extend`
  - モジュールのインスタンスメソッドが**特異メソッド**として使えるようになる

では、具体例を交えながらより詳しく見ていく。

## include
`Module#include`は引数で指定したモジュールのインスタンスメソッド、定数をレシーバのクラス（もしくはモジュール）に引き継ぐ。`mix-in`とも呼ばれる。要は他のモジュールを継承するようなことをする。

```ruby
module Hoge
  Version = "1.0"
  def hoge
    "hoge"
  end
end
```

`mix-in`用のモジュール`Hoge`を定義した。定数`Version`とインスタンスメソッド`hoge`をもつ。これを`Bar`クラスに`include`する。

```ruby
class Bar
  include Hoge
end

b = Bar.new
Bar::Version # => 1.0
b.hoge       # => hoge
```

`Hoge`モジュールを`Bar`クラス内で`include`すると、`Bar`クラスのインスタンス`b`から`hoge`を呼べるようになる。また、定数`Version`も`Bar`クラスに引き継がれる。

## extend
`Object#extend`は引数で指定したモジュールのインスタンスメソッドをレシーバの特異メソッドとして追加する。

インスタンスに`extend`するパターンと、クラス内で`extend`するパターンがある。（どちらもやってることは同じで、表記が違うように見えるだけ。）

`a`インスタンスの特異メソッドとして、`Greet#greet`を追加してみる。

```ruby
module Greet
  def greet
    "hello"
  end
end

a = "hoge"
a.extend(Greet)
a.greet # => hello
```

`Greet`モジュールのインスタンスメソッド`greet`を、`a`から呼べるようになった。


次に、`Foo`クラスの特異メソッドとして、`Greet#greet`を追加してみる。

```ruby
module Greet
  def greet
    "hello"
  end
end

class Foo
  extend Greet # この文脈におけるレシーバはselfである
end

Foo.greet # => hello
```

`Greet`モジュールのインスタンスメソッド`greet`が、`Foo`クラスの特異メソッドとして追加された。

## extendはなにがうれしいの？
- コードの見通しがよくなる場合がある
- モジュール単位でまとまったメソッドを使いまわせる

あたりか。
「コードの見通しがよくなる場合がある」というのは、`extend`すれば例えばクラス内にごちゃごちゃ特異メソッドの定義を書かなくてもよくなることを意味する。

`Bar`クラスに特異メソッドを定義する場合を考える。

```ruby
class Bar
  class << self
    def greet
      "hello"
    end

    def jp_greet
      "konnichiwa"
    end
  end

  def bar1
    # 処理
  end

  def bar2
    # 処理
  end
  attr_accessor :b1, :b2
end
```

特異メソッド定義もインスタンスメソッド定義その他も混在している。
単に記述を分割してもいいが、次のように`extend`を使う方がスマートだろう。

```ruby
module Greet
  def greet
    "hello"
  end

  def jp_greet
    "konnichiwa"
  end
end

class Bar
  extend Greet

  def bar1
    # 処理
  end

  def bar2
    # 処理
  end
  attr_accessor :b1, :b2
end
```

`Greet`モジュールを定義し、それを`extend`して`Bar`クラスの特異メソッドとした。こうしておけばさっきより見通しがいいし、なにより`Greet`モジュールを使い回すことができる。これが`extend`のうれしいポイントである。

## まとめ

- `include`
  - クラスやモジュールに、他のモジュールのインスタンスメソッド、定数を引き継ぐ
  - 引数に指定できるのはモジュールだけ

- `extend`
  - インスタンスに、他のモジュールのインスタンスメソッドを特異メソッドとして追加する
  - 引数に指定できるのはモジュールだけ



## 参考
- [Ruby 2.6.0 リファレンスマニュアル > ライブラリ一覧 > 組み込みライブラリ > Moduleクラス > include](https://docs.ruby-lang.org/ja/latest/method/Module/i/include.html)
- [Ruby 2.6.0 リファレンスマニュアル > ライブラリ一覧 > 組み込みライブラリ > Objectクラス > extend](https://docs.ruby-lang.org/ja/latest/method/Object/i/extend.html)
- [Ruby 初級者のための class << self の話 (または特異クラスとメタクラス)](https://magazine.rubyist.net/articles/0046/0046-SingletonClassForBeginners.html)