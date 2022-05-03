---
title: "ics ファイルの仕様 RFC5545 iCalendar"
description: ""
topics: []
published: false
eyecatch: ""
date: "2022-05-03T16:18:15.994+09:00"
---

[RFC 5545 - Internet Calendaring and Scheduling Core Object Specification (iCalendar)](https://datatracker.ietf.org/doc/html/rfc5545)
[RFC Reader - An online reader for IETF RFCs](https://www.rfcreader.com/#rfc5545)

スケジュール情報を表現するためのデータ形式。

- MUST, REQUIRED, SHALL
  - 定義が仕様の絶対的な要件であることを意味する。
- MUST NOT, SHALL NOT
  - 定義が仕様の絶対的な禁止事項であることを意味する。
- SHOULD, RECOMMENDED
  - ある特定の状況において、ある項目を無視する正当な理由が存在する場合がある。しかし、無視する前に、意味を十分に理解し、慎重に検討する必要がある。
- SHOULD NOT, NOT RECOMMENDED
  - ある特定の状況において、ある振る舞いが許容される、あるいは有用である正当な理由が存在する場合がある。しかし、その振る舞いを実行する前に、意味を十分に理解し、慎重に検討する必要がある。
- MAY, OPTIONAL
  - ある項目がオプションであることを意味する。とはいえ、あるオプションを含まない実装は、オプションを含む実装と相互運用できるように準備されなければならない。同様に、あるオプションを含む実装は、オプションを含まない実装と相互運用できるように準備されなければならない。

[RFC 2119 - Key words for use in RFCs to Indicate Requirement Levels](https://datatracker.ietf.org/doc/html/rfc2119)

ABNF

# iCalendar ファイル

- MIME　タイプは　`text/calenar`
- 拡張子は .ics
- 中身はプレーンテキスト
- 文字コード UTF-8
- 改行コードは CRLF

.ics ファイルの例です。1997年の革命記念日パーティの予定が記述されています。
`BEGIN:XXX`, `END:XXX` といった開始と終了の記述で挟まれている点が XML や HTML に似ています。

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:19970610T172345Z-AF23B2@example.com
DTSTAMP:19970610T172345Z
DTSTART:19970714T170000Z
DTEND:19970715T040000Z
SUMMARY:Bastille Day Party
END:VEVENT
END:VCALENDAR
```

この例は有効な ics ファイルであり、Google Calendar にインポートすると次の予定が生えます。

![bastille_day_party](/images/bastille_day_party.png)

# 登場人物

iCalendar を構成するいくつかの登場人物を紹介します。iCalendar が表現するスケジュール情報は、これらが組み合わさって構成されています。
イベントを定義するためのデータ構造や、タイムゾーンを定義するためのデータ構造などがあります。 大まかには次の通りです。

- iCalenadr Object
  - HTML でいうところの　`<html></html>` のような、iCalendar のルート要素
  - 中には後述する Calendar component が格納されている
  - iCalendar の仕様のバージョンや、ファイル作成者などのメタ情報も含む
  - `VCALENDAR` で表される
- Calendar component
  - 次に述べるような、Event, To-DO 等を Calendar component と呼ぶ
- Event Component
  - `VEVENT` で表される
- To-Do Component
- Journal Component
- Free/Busy Component
  - `VFREEBUSY`
- Time Zone Component
  - `VTIMEZONE`
- Alarm Component

以降の章では、各々について詳細に説明していきます。

# iCalendar Object

[https://datatracker.ietf.org/doc/html/rfc5545#section-3.4](https://datatracker.ietf.org/doc/html/rfc5545#section-3.4)

`VCALENDAR`

iCalendar Object と呼ばれるオブジェクトです。`<html></html>` のような、iCalendar のルート要素です。ABNF
による定義は以下の通りです。

```abnf
       icalstream = 1*icalobject

       icalobject = "BEGIN" ":" "VCALENDAR" CRLF
                    icalbody
                    "END" ":" "VCALENDAR" CRLF
```

<!-- `icalstream` は `icalobject` の1回以上の繰り返しです。 `icalobject` は、`BEGIN:VCALENDAR` と
`END:VCALENDAR` の間に `icalbody` をもちます。 -->

```abnf
       icalbody   = calprops component

       calprops   = *(
                  ;
                  ; The following are REQUIRED,
                  ; but MUST NOT occur more than once.
                  ;
                  prodid / version /
                  ;
                  ; The following are OPTIONAL,
                  ; but MUST NOT occur more than once.
                  ;
                  calscale / method /
                  ;
                  ; The following are OPTIONAL,
                  ; and MAY occur more than once.
                  ;
                  x-prop / iana-prop
                  ;
                  )

       component  = 1*(eventc / todoc / journalc / freebusyc /
                    timezonec / iana-comp / x-comp)

       iana-comp  = "BEGIN" ":" iana-token CRLF
                    1*contentline
                    "END" ":" iana-token CRLF

       x-comp     = "BEGIN" ":" x-name CRLF
                    1*contentline
                    "END" ":" x-name CRLF
```

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:19970610T172345Z-AF23B2@example.com
DTSTAMP:19970610T172345Z
DTSTART:19970714T170000Z
DTEND:19970715T040000Z
SUMMARY:Bastille Day Party
END:VEVENT
END:VCALENDAR
```

# Time Zone Component

```text
BEGIN:VTIMEZONE
TZID:Asia/Tokyo
X-LIC-LOCATION:Asia/Tokyo
BEGIN:STANDARD
TZOFFSETFROM:+0900
TZOFFSETTO:+0900
TZNAME:JST
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
```
