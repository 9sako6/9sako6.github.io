let port () =
  match Sys.getenv_opt "PORT" with
  | Some port -> int_of_string port
  | None -> 8080

let hostname () =
  match Sys.getenv_opt "HOSTNAME" with
  | Some host -> host
  | None -> "localhost"

let () =
  Dream.run ~port:(port ()) ~interface:(hostname ()) (fun _ ->
    Dream.html "Hello, world!")

