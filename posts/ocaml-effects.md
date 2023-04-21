---
title: "代数的効果"
description: ""
topics: ["OCaml"]
category: "Technology"
published: false
eyecatch: ""
date: "2023-04-08T23:16:10.986+09:00"
---

例外は、継続を無視して例外ハンドラに処理を移していると捉えられるっぽい。

```ocaml
type _ Effect.t += Raise : exn -> 'a Effect.t

let raise (e : exn) : 'a = Effect.perform (Raise e)

let try_with (f : unit -> 'a) (h : exn -> 'a) : 'a = 
  Effect.Deep.try_with f () {
    effc = fun (type a) (eff : a Effect.t) -> 
      match eff with
      | Raise e -> Some (fun _ -> h e)
      | _ -> None
  }

exception Invalid_argument

(** [sqrt f] returns the square root of [f].
    @raise Invalid_argument if f < 0. *)
let sqrt f =
  if f < 0.0 then raise Invalid_argument
  else sqrt f

let _ =
  try_with (fun () ->
    let r = sqrt 42.42 in
    Printf.printf "%f\n%!" r;
    let r = sqrt (-1.0) in
    Printf.printf "%f\n" r)
  (fun Invalid_argument -> Printf.printf "Invalid_argument to sqrt\n")

(* Prints:
   6.513064
   Invalid_argument to sqrt *)
```
