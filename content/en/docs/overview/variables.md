---
title: "Variables"
weight: 210
---

Go is a statically typed language. This means that each variable gets a type on declaration which can't be changed later.

Commonly used data types are:

* `int` and `uint`
* `float32` and `float64`
* `bool`
* `string`
* `byte` (alias for `uint8`)
* `error` to return errors from functions

The short assignment statement `:=` declares a variable and assigns a value to it.
The type of variable is inferred from the value (type inference).

```golang
package main

import "fmt"

func main() {
	// type string infrerred from "foo.txt"
	name := "foo.txt"

	// type int inferred from 42
	size := 42

	// type bool inferred from true
	isFile := true

	fmt.Println(name, size, isFile)
}
<!--output-->
foo.txt 42 true
```

Once a variable is declared you can assign values to it with the regular assignment `=`.

```golang
package main

import "fmt"

func main() {
	name := "foo.txt"

	name = "bar.csv"

	fmt.Println(name)
}
<!--output-->
bar.csv
```

The `var` keyword declares a variable without assigning a value to it.
```golang
package main

import "fmt"

func main() {
	// single variable
	var name string

	// multiple variables
	var (
		size int
		isFile bool
	)

	fmt.Println(name, size, isFile)
}
<!--output-->
 0 false
```

If you declare a variable and do not assign a value it is initialized with the zero value of their type.

The zero value are:

* `0` for numeric types
* `false` for booleans
* `""` (empty string) for strings
