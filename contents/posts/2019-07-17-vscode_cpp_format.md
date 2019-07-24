---
title: "VSCode C++整形時の行頭カッコやめたい"
description: "デフォルトでは{の前に改行が入って嫌なので設定を変える。そのやり方。"
tags:
  - C++
  - VSCode
created_at: 2019-07-17
updated_at: 2019-07-20
draft: true
---

VSCodeに[C++拡張](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)を入れていると、
`Ctrl+Alt+F`でコードを整形できる。（環境によってキーバインドは違うかもしれない）

デフォルトでは`{`の前に改行が入り、このように整形される。
```c++
void f()
{
    // your code
}
```

`{`の前に改行が入るのが嫌なので下のようにしたい。

```c++
void f() {
    // your code
}
```

下記の通りに辿って`settings.json`を開く。

![設定](/posts_images/2019-07-17-vscode_cpp_format/1.png)

![settings.json](/posts_images/2019-07-17-vscode_cpp_format/2.png)


`BreakBeforeBraces: Attach`を加えると目的の整形ができるようになる。

```json
"C_Cpp.clang_format_style": "{ BreakBeforeBraces: Attach, IndentWidth: 4 }"
```

Googleスタイルを使う手もある。

```json
"C_Cpp.clang_format_style": "{ BasedOnStyle: Google, IndentWidth: 4 }"
```



# 参考
[vscodeのC++用コード整形設定(clang-formatの設定)](https://fastapple.hatenablog.com/entry/vscode/clang-format)