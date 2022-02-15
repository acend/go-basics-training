---
title: "Functions"
weight: 220
---

## Basics

With the `func` keyword you can declare a function. In the following example we declare the function `add`. It takes two parameters `a` and `b` of type `int` and returns a value of type `int` which is the sum of `a` and `b`.

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
```


## No Return Value

If a function does not return a result the return type can be left out.

```golang
package main

import "fmt"

func sayHello(name) {
	fmt.Printf("Hello %s", name)
}

func main() {
	name := "Pingu"
	sayHello(name)
}
```


## Multiple Return Values

A function can return multiple values. The following example contains a function `sub`, which return two values:

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
```

If we don't need a certain return value we can discard it by assigning it to `_`:
```golang
	result, _ := sub(2, 3)
```


## Returning Errors
{{% alert title="Note" color="primary" %}}
In this section we only cover the basics on error handling. There is a seperate chapter *Error handling** which covers the topic in more depth.
{{% /alert %}}

If a function can fail it returns an error value as its last return value.
In many other languages exceptions are thrown to indicate an error condition. Go does not have exceptions. Errors are retunred from functions like every other value.

Let's take a look at the function `os.ReadFile` from the Go standard library. It's signature looks like this:
```golang
func ReadFile(name string) ([]byte, error)
```

It returns the content and an error. Ignore the content and its type `[]byte` for now and just focus on the error. The signature tells us that something in the function can go wrong (file does not exist, no permission to read file, etc.).

```golang
package main

import (
	"os"
	"fmt"
)

func main() {
	fileContent, err := os.ReadFile("test.txt")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	fmt.Println(fileContent)
	defer f.Close()
}
```


## Defer

```
package main

import (
	"os"
	"fmt"
)

func main() {
	file, err := os.Open("test.txt")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer file.Close()
	// do stuff with file
```


## Variadic

```
func sum(nums ...int) int {
	result := 0
	for _, i := range nums {
		res += i
	}
	return result
}
```
