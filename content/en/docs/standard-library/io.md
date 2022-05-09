---
title: "Input/Output"
weight: 510
source:
- https://medium.com/learning-the-go-programming-language/streaming-io-in-go-d93507931185
---

## Basics

```go
package main

import (
    "fmt"
    "os"
    "log"
)

func main() {
    const filename = "/tmp/file.txt"

    err := os.WriteFile(filename, []byte("Hello, file system\n"), 0644)
    if err != nil {
        log.Fatal(err)
    }

    content, err := os.ReadFile(filename)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("%s", content)
}
<!--output-->
Hello, file system
```


## Reader/Writer

The above example of reading a file loads the whole file into memory. This can cause problems when we are dealing with large files. To solve this problem, we can load chunks of data and place them into a buffer.

The Go standard library provides the Reader and Writer interface for reading and writing data in a streaming fashion.
The various reader and writer implementations are then often used together with the primitives from the [io](https://pkg.go.dev/io) package (e.g. [io.Copy](https://pkg.go.dev/io#Copy)).


The [io.Writer](https://pkg.go.dev/io#Writer) interface expects a slice of bytes and returns the amount of bytes that were written and an error.

```go
type Writer interface {
    Write(p []byte) (n int, err error)
}
```

The [io.Reader](https://pkg.go.dev/io#Reader) interface expects an byte slice. This slice is used as a buffer. It returns the amount of bytes that were read and an error.

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

Here is an example were we copy data from a [bytes.Buffer](https://pkg.go.dev/bytes#Buffer) to a file ([os.File](https://pkg.go.dev/os#File)).
We create the buffer from a string using [bytes.NewBufferString](https://pkg.go.dev/bytes#NewBufferString).
Then we open the file with [os.Create](https://pkg.go.dev/os#Create).
With [io.Copy](https://pkg.go.dev/io#Copy) we copy all bytes from the buffer to the file.

```go
package main

import (
	"bytes"
	"fmt"
	"io"
	"os"
)

func main() {
	// buffer implements io.Reader and is our source
	buffer := bytes.NewBufferString("Some file content")

	// file implements io.Writer and is our destination
	file, err := os.Create("./io.txt")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer file.Close()

	// reades bytes from buffer and writes them to file
	n, err := io.Copy(file, buffer)
	fmt.Printf("%d bytes written\n", n)
}
<!--output-->
17 bytes written
```
