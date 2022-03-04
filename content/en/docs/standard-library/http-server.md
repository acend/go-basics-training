---
title: HTTP Server
weight: 540
---


## Basics

Go allows us to start a simple HTTP server with minimal code:

<!-- I could not get ListenAndServe to work in the playground -->
```go {playground=false}
package main

func HelloHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
}
func main() {
    http.HandleFunc("/hello", HelloHandler)

    // ListenAndServe always returns a non-nil error.
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Try accessing http://localhost:8080/hello

The handler receives two parameters:

* [http.ResponseWriter](https://pkg.go.dev/net/http#ResponseWriter) is an interface with the following methods:
  * TODO
  * `Header()`
  * `Write()`
* [http.Request](https://pkg.go.dev/net/http#Request) defines the request parameters. Example:
  * Method: GET, POST, PUT etc.
  * Header: request headers
  * Body: request body (typically used with POST requests)
  * Form: form values


## Route groups

We can group routes by using [http.NewServeMux](https://pkg.go.dev/net/http#NewServeMux).

```go {playground=false}
package main

func HelloHandlerV1(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello v1")
}

func HelloHandlerV2(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello v2")
}

func main() {
    v1mux := http.NewServeMux()
    v1mux.HandleFunc("/hello", HelloHandlerV1)

    v2mux := http.NewServeMux()
    v2mux.HandleFunc("/hello", HelloHandlerV2)

    http.Handle("/v1/", v1mux)
    http.Handle("/v2/", v2mux)

    log.Fatal(http.ListenAndServe(":8080", nil))
}
```


## `http.Handle`

In the last example you might have noticed that we use [http.Handle](https://pkg.go.dev/net/http#Handle). `Handle` expects an interface [http.Handler](https://pkg.go.dev/net/http#Handler) as the second parameter. If you look at the interface you might notice a resemblence to the `HelloHandler` function signature above.

```go
type  Handler interface {
    ServeHTTP(ResponseWriter, *Request)}
```

The above example is a shortcut for the following.

```go
type myHandler struct {
    // ...
}

func (h myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte(`hello world`))
}

func main() {
    http.Handle("/hello", myHandler{})
    http.ListenAndServe(":8080", nil)
}
```

By returning a function we can shorten the code.

TODO: Why do we do this?

```go {playground=false}
package main

func helloHandler() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello World")
    })
}

func main() {
    mux := http.NewServeMux()

    // Create sample handler to returns 404
    mux.Handle("/resources", http.NotFoundHandler())

    mux.Handle("/hello/", helloHandler())

    log.Fatal(http.ListenAndServe(":8080", mux))
}
```
