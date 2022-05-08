---
title: Generics
weight: 650
---

The Go 1.18 release (February 2022) adds support for generics.
In the following section, we will take a look at the new language feature but we will not cover every detail.


## Why do we need Generics

Imagine you implement a function `contains` to check wheter a certain item is in a list:
```golang
func contains(list []int, item int) bool {
	for _, current := range list {
		if current == item {
			return true
		}
	}
	return false
}
```

The function above only works for slices of the type `int`. If you need the same logic for strings you have to implement a new function which would look exactly the same apart from the types in the function signature. If the function is in the same package you also have to choose a different name.
```golang
func containsString(list []string, item string) bool {
	for _, current := range list {
		if current == item {
			return true
		}
	}
	return false
}
```

Since Go 1.18 we can write the `contains` function in a generic way:
```golang
package main

import "fmt"

func contains[T comparable](items []T, item T) bool {
	for _, current := range items {
		if item == current {
			return true
		}
	}
	return false
}

func main() {
	numbers := []int{1,2,4,5}
	fmt.Println(contains(numbers, 1))
	fmt.Println(contains(numbers, 3))

	names := []string{"bob", "alice"}
	fmt.Println(contains(names, "alice"))
	fmt.Println(contains(names, "eve"))
}
<!--output-->
true
false
true
false
```


## Other examples


### Max Function

In this example we create a `max` function which returns the bigger of two values. To specify the constraint we use the `Ordered` interface from the [constraints](https://pkg.go.dev/golang.org/x/exp/constraints#Ordered) package:
```golang
package main

import (
	"golang.org/x/exp/constraints"
)

func max[T constraints.Ordered](a, b T) T {
	if a > b {
		return a
	}
	return b
}

func main() {
	fmt.Println(max(13, 42))
	fmt.Println(max(3.14, 2.71))
}
<!--output-->
42
3.14
```


### Generic struct

We can also use generics to parametrize structs:
```golang
type LinkedList[T any] struct {
	head *Node[T]
}

type Node[T any] struct {
	item T
	next *Node[T]
}
```


## Links

Official Go resources about the topic:

* [An Introduction To Generics](https://go.dev/blog/intro-generics)
* [Tutorial: Getting started with generics](https://go.dev/doc/tutorial/generics)
* [When To Use Generics](https://go.dev/blog/when-generics)
* [Type Parameters Proposal](https://go.googlesource.com/proposal/+/HEAD/design/43651-type-parameters.md)


Other blog posts about the topic:

* [Generics can make your Go code slower](https://planetscale.com/blog/generics-can-make-your-go-code-slower)
* [Faster sorting with Go generics](https://eli.thegreenplace.net/2022/faster-sorting-with-go-generics)
