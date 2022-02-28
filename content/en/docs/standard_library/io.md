---
title: "Input/Output"
weight: 510
source:
- https://medium.com/learning-the-go-programming-language/streaming-io-in-go-d93507931185
---

## Basics

{{<go-playground>}}
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
{{</go-playground>}}


## Directory listing

{{<go-playground>}}
package main

import (
    "fmt"
    "log"
    "os"
)

func main() {
    files, err := os.ReadDir(".")
    if err != nil {
        log.Fatal(err)
    }

    for _, file := range files {
        fmt.Println(file.Name())
    }
}
<!--output-->
.dockerenv
bin
dev
etc
home
lib
lib64
proc
root
sys
tmp
tmpfs
usr
var
{{</go-playground>}}


## Reader/Writer

The above example of reading a file loads the whole file into memory. This can cause problems when we are dealing with large files. To solve this problem, we can load chunks of data and place them into a buffer.

The Go standard library provides an interface for reading and writing. The functions we saw above also use these interfaces.


### Writer

The [io.Writer](https://pkg.go.dev/io#Writer) interface expects a slice of bytes and returns the amount of bytes that were written.

```go
type Writer interface {
    Write(p []byte) (n int, err error)
}
```

Here is an example using [os.File](https://pkg.go.dev/os#File), which implements the [io.Writer](https://pkg.go.dev/io#Writer) interface.

{{<go-playground>}}
package main

func main() {
    content := "Some file content"
    file, err := os.Create("./io.txt")
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    defer file.Close()

    n, err := file.Write([]byte(content))
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    if n != len(content) {
        fmt.Println("failed to write data")
        os.Exit(1)
    }
    fmt.Println("file write done")
}
<!--output-->
file write done
{{</go-playground>}}


### Reader

The [io.Reader](https://pkg.go.dev/io#Reader) interface expects an empty byte slice. This slice is used as a buffer and returned as soon as it is filled.

TODO: slice -> pointer

The amount of bytes that were read and an error are also returned.

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

{{<go-playground>}}
package main

func main() {
    file, err := os.Open("./io.txt")
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    defer file.Close()

    p := make([]byte, 4)
    for {
        n, err := file.Read(p)
        if err == io.EOF {
            break
        }
        fmt.Print(string(p[:n]))
    }
}
<!--output-->
open ./io.txt: no such file or directory
{{</go-playground>}}
