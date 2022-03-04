---
title: "Pointers"
weight: 230
---

## Basics

In addition to the basic data types Go also have pointers.
A pointer contains a memory address of an actual value or `nil` if they do not point to anything.
The zero value of a pointer is `nil`.

Pointer types are indicated with a star.
For example:

* The type `*int` is a pointer to an `int`
* The type `*bool` is a pointer to a `bool`

Concerning pointers you mainly have to remember two operations. How to create a pointer to a value and how go obtain a value from a pointer:

| Operation | Example | Code | Description |
| - | - | - | - |
| **Value To Pointer** | `int` to `*int` | `myPointer = &myInt` | With the `&` operator you can create a pointer to a value |
| **Value From Pointer** | `*int` to `int` | `myInt = *myPointer` | With the `*` operator we can obtain the actual value from a pointer (**dereference**)


```golang
package main

import "fmt"

func main() {
	// declare myPointer as *int. Initially it is nil (zero value)
	var myPointer *int

	// myInt is of type int
	myInt := 42

	// Value To Pointer
	// myPointer becomes pointer to myInt
	myPointer = &myInt

	// Value From Pointer
	// Change myInt through myPointer. We can not assign an int to a *int hence we
	// have to dereference myPointer with * to assign a new number
	*myPointer = 12

	fmt.Println(myInt)
	fmt.Println(*myPointer)
}
<!--output-->
12
12
```

If you dereference a pointer you should always be sure that it is not `nil`. Otherwise your program crashes with an error `invalid memory address or nil pointer dereference` (same as NullPointerException in Java).


## Why Use Pointers

With pointers we can pass values to a function by reference.
This way we can pass a value to a function without copying it.
Further the function can change the value through the pointer and does not have to return the changed value.
This is often used with struct types, which we will get to know in the next chapter.

```golang
package main

import "fmt"

func increment(i *int) {
	// that we can increment the number we need an int
	// to obtain an int from *int we dereference it with *
	*i = *i + 1
}

func main() {
	// myNumber is of type int
	myNumber := 42

	increment(&myNumber)
	fmt.Println(myNumber)
}
<!--output-->
43
```
