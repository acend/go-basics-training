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
	name := "Pingu"
	sayHello(name)
}
<!--output-->
Hello Pingu
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

{{% alert title="Note" color="primary" %}}
This section only covers the basics. Chapter {{<link "error-handling">}} covers the topic in more depth.
{{% /alert %}}

Functions that can fail return error values.
In many other languages exceptions are thrown to indicate error conditions. Go does not have exceptions.

Errors are returned from functions like every other return value.

Let's take a look at the function `ReadFile` from the `os` package in the Go standard library. It's signature looks like this:
```golang
func ReadFile(name string) ([]byte, error)
```

In the function signature we see that the last return value is of type `error`. So we know that the function could fail. In the case of `ReadFile` possible errors could be that the file does not exist or that we do not have enough permission to read the file.

If the returned error value is not empty (`nil`) an error has occurred.

```golang
content, err := os.ReadFile("test.txt")
if err != nil {
	// handle error
}
```

In many cases handling the error means:

* Passing the error up to the caller: `return err`
* Logging an error and aborting the running action: e.g. `log.Fatal(err)`


```golang
package main

func main() {
	fileContent, err := os.ReadFile("test.txt")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(fileContent)
}
<!--output-->
2009/11/10 23:00:00 open test.txt: no such file or directory
```


{{%details title="Optional: Function As Values"%}}

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
	result2 := sub(2, 3)
	fmt.Println(result1, result2)
}
<!--output-->
5 -1
```

{{%/details%}}
