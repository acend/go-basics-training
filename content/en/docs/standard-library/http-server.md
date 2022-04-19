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
        res.Write([]byte("Hello "))
        res.Write(html.EscapeString(r.URL.Path))
}
func main() {
    http.HandleFunc("/hello", HelloHandler)

    // ListenAndServe always returns a non-nil error.
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Try accessing [localhost:8080/hello](http://localhost:8080/hello)

The handler receives two parameters:

* [http.ResponseWriter](https://pkg.go.dev/net/http#ResponseWriter) is an interface with the following methods:
  * `Header()` returns all headers and allows setting new ones.
  * `WriteHeader(statusCode int)` allows setting a status code for the response. It must be called before `Write()` and defaults to `http.StatusOK` if not set. For a full list of status codes see the [documentation](https://pkg.go.dev/net/http#pkg-constants).
  * `Write()` allows us to use all functions that expect an [io.Writer](https://pkg.go.dev/io#Writer) interface (e.g. [fmt.Fprint](https://pkg.go.dev/fmt#Fprint) or [io.WriteString](https://pkg.go.dev/io#WriteString))
* [http.Request](https://pkg.go.dev/net/http#Request) defines the request parameters. Example:
  * Method: GET, POST, PUT etc.
  * Header: request headers
  * Body: request body (typically used with POST requests)
  * Form: form values


### `http.ResponseWriter`

The following is an example how to use `http.ResponseWriter`:

```go {playground=false}
package main

func HelloHandler(w http.ResponseWriter, r *http.Request) {
    // set content type header
    w.Header().Set("Content-Type", "application/json")
    // set status header (400)
    w.WriteHeader(http.StatusBadRequest)
    // respond with a JSON string
    // `fmt.Fprint` expects an `io.Writer` interface
    fmt.Fprint(w, `{"status":"failure"}`)
}
func main() {
    http.HandleFunc("/hello", HelloHandler)

    // ListenAndServe always returns a non-nil error.
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```


### `http.Request`

```go {playground=false}
package main

func HelloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Method: ", r.Method)
    fmt.Fprintln(w, "URL: ", r.URL)
    fmt.Fprintln(w, "Proto: ", r.Proto)
    fmt.Fprintln(w, "Header: ", r.Header)
    fmt.Fprintln(w, "Body: ", r.Body)
    fmt.Fprintln(w, "ContentLength: ", r.ContentLength)
    fmt.Fprintln(w, "Form: ", r.Form)
    fmt.Fprintln(w, "RemoteAddr: ", r.RemoteAddr)
}
func main() {
    http.HandleFunc("/hello", HelloHandler)

    // ListenAndServe always returns a non-nil error.
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Try sending a request with `curl`:

```bash
curl -XPOST -d '{"some":"json"}' localhost:8080/hello
```

The `Body` cannot be printed directly, but it implements [io.Reader](https://pkg.go.dev/io#Reader). We can use other functions that expect an `io.Reader` like [io.ReadAll](https://pkg.go.dev/io#ReadAll).

```go {playground=false}
package main

func HelloHandler(w http.ResponseWriter, r *http.Request) {
    body, err := io.ReadAll(r.Body)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        return
    }
    w.Write(body)
}
func main() {
    http.HandleFunc("/hello", HelloHandler)

    // ListenAndServe always returns a non-nil error.
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```


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

```go {playground=false}
package main

func helloHandler() http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello World")
    }
}

func main() {
    mux := http.NewServeMux()

    // Create sample handler to returns 404
    mux.Handle("/resources", http.NotFoundHandler())

    mux.Handle("/hello/", helloHandler())

    log.Fatal(http.ListenAndServe(":8080", mux))
}
```


## Middeware

The reason that we use `Handle` instead of `HandlerFunc` directly, is for flexibility. We can pass our own variables into the handler. This allows us to chain the handlers and create middleware.

```go {playground=false}
package main

func helloHandler() http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello World")
    }
}

func authorize(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if r.Header.Get("api-key") != "MySecret" {
            w.Write([]byte("Auth Error"))
            return
        }
        next(w, r)
    }
}

func main() {
    http.Handle("/hello/", authorize(helloHandler()))

    log.Fatal(http.ListenAndServe(":8080", nil))
}
```
