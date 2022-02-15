---
title: "Variables"
weight: 210
---

The short assignment statement `:=` declares a variable and assigns a value to it.
The type of variable is inferred from the value (type inference).
```golang
package main

import "fmt"

func main() {
	name := "foo.txt"
	size := 42
	isFile := true

	fmt.Println(name, size, isFile)
}
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
```

The `var` keyword decalres a variable without assigning a value to it.
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
```

If you declare a variable and do not assign a value it is initialized to the zero value of their type.
The zero value is:

* `0` for numeric types
* `false` for booleans
* `""` (empty string) for strings

Commonly used data types are:
* `int` and `uint`
* `float32` and `float64`
* `bool`
* `string`
* `byte` (alias for `uint8`)
