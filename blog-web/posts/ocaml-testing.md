---
title: "ppx_deriving と ppx_expect"
description: ""
topics: ["OCaml"]
category: "Technology"
published: false
eyecatch: ""
date: "2023-04-21T21:04:47.568+09:00"
---


```ocaml
open Css

let%test_module "parse" =
  (module struct
    let () = Printexc.record_backtrace false

    let%expect_test "parse a universal selector" =
      "* {font-size: 14px;}" |> parse |> Node.show_stylesheet |> print_endline;
      [%expect
        {|
          (Stylesheet
             [(Rule ([Universal_selector],
                 [(Declaration ("font-size", (Size (14., Px))))]))
               ])
        |}]

    let%expect_test "parse a tag selector" =
      "body {font-size: 14px;}" |> parse |> Node.show_stylesheet
      |> print_endline;
      [%expect.unreachable]
      [@@expect.uncaught_exn {| (Css__Parser.Unknown_selector) |}]

    let%expect_test "parse a id selector" =
      "#foo {font-size: 14px;}" |> parse |> Node.show_stylesheet
      |> print_endline;
      [%expect.unreachable]
      [@@expect.uncaught_exn {| (Css__Parser.Unknown_selector) |}]

    let%expect_test "parse a class selector" =
      ".alert {color: red;}" |> parse |> Node.show_stylesheet |> print_endline;
      [%expect
        {|
          (Stylesheet
             [(Rule ([(Class_selector "alert")],
                 [(Declaration ("color", (Keyword "red")))]))
               ])
        |}]

    let%expect_test "parse a RGB value" =
      ".alert {background-color: #aaBB99;}" |> parse |> Node.show_stylesheet
      |> print_endline;
      [%expect
        {|
          (Stylesheet
             [(Rule ([(Class_selector "alert")],
                 [(Declaration ("background-color", (Rgb (170, 187, 153))))]))
               ])
        |}]

    let%expect_test "parse empty declaration" =
      ".foo {}" |> parse |> Node.show_stylesheet |> print_endline;
      [%expect {| (Stylesheet [(Rule ([(Class_selector "foo")], []))]) |}]

    let%expect_test "parse multiple declarations" =
      {|
        .foo {
          display: none;
          color: #191919;
          font-size: 14px;
        }
      |}
      |> parse |> Node.show_stylesheet |> print_endline;
      [%expect
        {|
          (Stylesheet
             [(Rule ([(Class_selector "foo")],
                 [(Declaration ("display", (Keyword "none")));
                   (Declaration ("color", (Rgb (25, 25, 25))));
                   (Declaration ("font-size", (Size (14., Px))))]
                 ))
               ])
        |}]

    let%expect_test "parse multiple class selectors" =
      {|
        .foo,.bar {
          display: flex;
          color: red;
        }
      |}
      |> parse |> Node.show_stylesheet |> print_endline;
      [%expect
        {|
          (Stylesheet
             [(Rule ([(Class_selector "foo"); (Class_selector "bar")],
                 [(Declaration ("display", (Keyword "flex")));
                   (Declaration ("color", (Keyword "red")))]
                 ))
               ])
        |}]
  end)
  ```
