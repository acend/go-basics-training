---
title: Error Handling
draft: true
weight: 700
---

## Basics

Errors can be created with [errors.New](https://pkg.go.dev/errors#New). It is also possible to use [fmt.Errorf](https://pkg.go.dev/fmt#Errorf) to create a new error, if you want to use a format string.

```go
package main

func main() {
    err := errors.New("an error has occurred")
    if err != nil {
        fmt.Println(err)
    }

    // Creating errors with format strings
    const name, id = "bueller", 17
	err = fmt.Errorf("user %q (id %d) not found", name, id)
    if err != nil {
        fmt.Println(err)
    }
}
<!--output-->
an error has occurred
user "bueller" (id 17) not found
```


## More than strings

Normally it is enough to know that we have an error. Then we can either `return` the error or log it. By default errors are unstructured strings.

{{% details title="Optional: Advanced error handling" %}}

The `error` interface is very simple:

```go
type error interface {
	Error() string
}
```

The only requirement of an error is to implement the `Error()` function. You can implement custom error structs, that contain structured data. The [fs.PathError](https://pkg.go.dev/io/fs#PathError) in the standard library is a good example:

```go
type PathError struct {
	Op   string // The operation (e.g. open)
	Path string // The path to the file
	Err  error  // Description of the problem
}

func (e *PathError) Error() string {
    return e.Op + " " + e.Path + ": " + e.Err.Error()
}
```

You might notice that [fs.PathError](https://pkg.go.dev/io/fs#PathError) contains another `error`. This makes it possible to chain multiple errors. To access a "nested" error we can use `Unwrap()`:

```go
func (e *PathError) Unwrap() error {
    return e.Err
}
```

Here is an example how we can use a `fs.PathError` in our code. Notice that we are checking if the `error` is a `fs.PathError` with [errors.As](https://pkg.go.dev/errors#As):

```go
package main

func main() {
	if _, err := os.Open("non-existing"); err != nil {
		var pathError *fs.PathError
		if errors.As(err, &pathError) {
			fmt.Println("Failed at path:", pathError.Path)
			fmt.Println(err)
			fmt.Println(pathError.Unwrap())
		} else {
			fmt.Println(err)
		}
	}
}
<!--output-->
Failed at path: non-existing
open non-existing: no such file or directory
no such file or directory
```

There is also an [errors.Is](https://pkg.go.dev/errors#Is) function that checks if any `error` in the chain matches.
{{% /details %}}
