---
title: HTTP Server
weight: 540
---


## Quick start

Go allows us to start a simple HTTP server with minimal code:

<!-- I could not get ListenAndServe to work in the playground -->
```go {playground=false}
package main

import (
	"fmt"
	"net/http"
	"os"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello World")
}

func main() {
	http.HandleFunc("/hello", helloHandler)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
```

Now you can access <http://localhost:8080/hello> .


## http.Handler

The [http.Handler](https://go.pkg.dev/net/http#Handler) interface is the basic building block of all HTTP servers.

```golang
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}
```

The ServeHTTP method has two parameters:

* [http.ResponseWriter](https://pkg.go.dev/net/http#ResponseWriter) is an interface with the following methods:
  * `Header()` returns all headers and allows setting new ones.
  * `WriteHeader(statusCode int)` allows setting a status code for the response. It must be called before `Write()` and defaults to `http.StatusOK` if not set. For a full list of status codes see the [documentation](https://pkg.go.dev/net/http#pkg-constants).
  * `Write()` allows us to use all functions that expect an [io.Writer](https://pkg.go.dev/io#Writer) interface (e.g. [fmt.Fprint](https://pkg.go.dev/fmt#Fprint) or [io.WriteString](https://pkg.go.dev/io#WriteString))
* [http.Request](https://pkg.go.dev/net/http#Request) defines the request parameters. Example:
  * Method: GET, POST, PUT etc.
  * Header: request headers
  * Body: request body (typically used with POST requests)
  * Form: form values

So a minimal handler would look like this:
```golang
type myHandler struct {}

func (h *myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "hello")
}
```

With the function [http.HandlerFunc](https://pkg.go.dev/net/http#HandlerFunc) we can transform a function with the following signature into a http.Handler.
```
func myHandlerFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "hello")
}

handler := http.HandlerFunc(myHandlerFunc)
```


### `http.ResponseWriter`

The following is an example how to use `http.ResponseWriter`:

```go {playground=false}
package main

import (
	"fmt"
	"net/http"
	"os"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	// set content type header
	w.Header().Set("Content-Type", "text/plain")

	// set status header (400)
	w.WriteHeader(http.StatusBadRequest)

	// respond with an error message
	// `fmt.Fprint` expects an `io.Writer` interface
	fmt.Fprint(w, "invalid request")
}

func main() {
	http.HandleFunc("/hello", helloHandler)

	// ListenAndServe always returns a non-nil error.
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
```


### `http.Request`

```go {playground=false}
package main

import (
	"fmt"
	"net/http"
	"os"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
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
	http.HandleFunc("/hello", helloHandler)

	// ListenAndServe always returns a non-nil error.
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
```


## Receive Data

The field `Body` in the [http.Request](https://pkg.go.dev/net/http#Request) implements [io.Reader](https://pkg.go.dev/io#Reader). We can use functions that expect an `io.Reader` like [io.ReadAll](https://pkg.go.dev/io#ReadAll) to read the body.

```go {playground=false}
package main

import (
	"io"
	"log"
	"net/http"
)

func echoHandler(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	w.Write(body)
}

func main() {
	http.HandleFunc("/echo", echoHandler)

	// ListenAndServe always returns a non-nil error.
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Try sending a request with `curl`:

```bash
curl -d 'body' http://localhost:8080/hello
```


## Middeware

A common pattern is to wrap one handler within another handler. This could for example be used for logging or authentication. For this we pass our actual handler (inner handler) to the middleware.

```go {playground=false}
package main

import (
	"fmt"
	"log"
	"net/http"
)

func secretHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "top secret")
	}
}

func authMiddleware(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user, password, _ := r.BasicAuth()
		if !(user == "admin" && password == "secret") {
			code := http.StatusUnauthorized
			http.Error(w, http.StatusText(code), code)
			return
		}
		next.ServeHTTP(w, r)
	}
}

func main() {
	http.Handle("/secret", authMiddleware(secretHandler()))

	log.Fatal(http.ListenAndServe(":8080", nil))
}
```
