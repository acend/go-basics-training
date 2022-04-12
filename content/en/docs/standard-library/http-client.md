---
title: "HTTP Client"
weight: 530
---

The Go standard library offers a [HTTP package](https://pkg.go.dev/net/http) which provides a server and a client.
In the following sections we learn how we can use the HTTP client.


## Quick start

The following example shows how we can perform a GET request and print the body to the standard output.
```golang{playground=false}
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	resp, err := http.Get("https://google.com")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	_, err = io.Copy(os.Stdout, resp.Body)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

```
The function [http.Get](https://pkg.go.dev/net/http#Get) returns a [http.Response](https://pkg.go.dev/net/http#Response).
The response contains the field `Body` which is an `io.Reader` from which we can read the response.


## http.Client

The shortcut functions like [http.Get](https://pkg.go.dev/net/http#Get) and [http.Post](https://pkg.go.dev/net/http#Post) are convenient but in most of the cases we want more control over our requests (e.g. set a request timeout).

Usually we create our own [http.Client](https://pkg.go.dev/net/http#Client) with appropriate settings. You should always set a `Timeout` otherwise, if a request is blocked it will hang forever. We can use a single HTTP client instance throughout our whole application as it is safe for concurrent use. The client then manages a connection pool for us and we benefit from reusing connections if we do multilple requests to the same host.

We can then use the `Get` method on our http client::
```golang
client = &http.Client{
	Timeout: time.Second * 30,
}

resp, err := client.Get("https://google.com")
```


## Set Headers

To set headers on a request we create a new [http.Request](https://pkg.go.dev/net/http#Request) with [http.NewRequest](https://pkg.go.dev/net/http#NewRequest).
```golang
req, err := http.NewRequest("GET", "http://localhost:8080", nil)

req.Header.Set("Authorization", "Bearer: my-super-secret-token")

resp, err := client.Do(req)
```


## Send Content

To send content in the body of a POST request we pass a `io.Reader` to the `NewRequest` function. The reader could for example be an open file or a buffer.
In the following example we create a [bytes.Buffer](https://pkg.go.dev/bytes#Buffer) from a string.
```golang
body := bytes.NewBufferString("body content")

req, err := http.NewRequest("POST", "http://localhost:8080", body)
if err != nil {
	return err
}

req.Header.Set("Content-Type", "text/plain")

resp, err := client.Do(req)
```


## JSON

Often we want to send a struct serialized as JSON to an endpoint. The following example sends `{"name":"execute"}` as payload.

```golang
type action struct {
	Name string `json:"name"`
}

executeAction := &action{
	Name: "execute",
}

payload, err := json.Marshal(executeAction)
if err != nil {
	return err
}

req, err := http.NewRequest("POST", "http://localhost:8080/run", bytes.NewBuffer(payload))
if err != nil {
	return err
}

req.Header.Set("Content-Type", "application/json")

resp, err := client.Do(req)
```
