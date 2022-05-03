---
title: "Functions"
weight: 220
---

## Basics

The `func` keyword declares a function.

In the following example we declare the function `add`. It takes two parameters `a` and `b` of type `int` and returns a value of type `int` which is the sum of `a` and `b`.

```golang
package main

import "fmt"

func add(a int, b int) int {
	return a + b
}

func main() {
	result := add(2, 3)
	fmt.Println(result)
}
<!--output-->
5
```


## No Return Value

If a function does not return a result the return type can be left out.

```golang
package main

import "fmt"

func sayHello(name string) {
	fmt.Println("Hello", name)
}

func main() {
	name := "Bob"
	sayHello(name)
}
<!--output-->
Hello Bob
```


## Multiple Return Values

A function can return multiple values. The following example contains a function `sub`, which returns two values:

1. The result of the subtraction of `a` and `b`
2. A boolean which indicates if the result is negative

```golang
package main

import "fmt"

func sub(a int, b int) (int, bool) {
	result := a - b
	isNegative := result < 0
	return result, isNegative
}

func main() {
	result, negative := sub(2, 3)
	fmt.Println(result, negative)
}
<!--output-->
-1 true
```

In Go it is an error to declare variables without using them. If we only need a single value we can discard variables by assigning them to `_`:

```golang
result, _ := sub(2, 3)
```


## Returning Errors

Functions that can fail return error values.
In many other languages exceptions are thrown to indicate error conditions. Go does not have exceptions.

Errors are returned from functions like every other return value. From the function signature we can see if a function can fail or not.

Let's take a look at the function [os.ReadFile](https://pkg.go.dev/os#ReadFile) from the Go standard library. It's signature looks like this:
```golang
func ReadFile(name string) ([]byte, error)
```

In the function signature we see that the last return value is of type `error`. So we know that the function can fail. In the case of `ReadFile` possible errors could be that the file does not exist or that we do not have enough permission to read the file.

If the returned error value is not empty (`nil`) an error has occurred.

```golang
content, err := os.ReadFile("test.txt")
if err != nil {
	// handle error
}
```

In many cases handling the error means:

* Passing the error up to the caller: `return err`
* Logging or printing an error (e.g. print to standard error with [fmt.Fprintln](https://pkg.go.dev/fmt#Fprintln))


```golang
package main

import (
	"fmt"
	"os"
)

func main() {
	fileContent, err := os.ReadFile("test.txt")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Println(fileContent)
}
<!--output-->
open test.txt: no such file or directory
```


## Function As Values

In Go functions are first-class values. This means that you can pass functions around like ordinary values.

```golang
package main

import "fmt"

// run takes a function myfunc and runs it with a and b
func run(a int, b int, myfunc func(int, int) int) int {
	return myfunc(a, b)
}

func main() {
	add := func(a int, b int) int { return a + b }
	sub := func(a int, b int) int { return a - b }

	result1 := run(2, 3, add)
	result2 := run(2, 3, sub)

	fmt.Println(result1, result2)
}
<!--output-->
5 -1
```
