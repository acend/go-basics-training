---
title: "Slices"
weight: 260
---


## Basics

With a slice literal (e.g. `[]int{1, 2, 3}`) and the short assignment we we can initialize a new slice.
Slices store multiple items of the same type.

```golang
package main

import "fmt"

func main() {
    q := []int{2, 3, 5, 7, 11, 13}
    fmt.Println(q)
    fmt.Println("Length of slice:", len(q))
}
<!--output-->
[2 3 5 7 11 13]
Length of slice: 6
```


## Slice of structs

We can also store multiple instances of a struct.

```go
package main

import "fmt"

type Person struct {
    name string
    age int
}
func main() {
    people := []Person{
        {name: "Christoph", age: 48},
        {name: "Susanne", age: 35},
        {name: "Peter", age: 29},
    }
    fmt.Println(people)
    fmt.Println(people[1])
}
<!--output-->
[{Christoph 48} {Susanne 35} {Peter 29}]
{Susanne 35}
```


## Appending items

To add items to an existing slice you can use `append`. Notice that `append` does not modify the original slice, but returns a new one.

```go
package main

import "fmt"

func main() {
    list := []int{1, 2, 3}
    fmt.Println("Initial slice:", list)

    // Add an item to a slice.
    list = append(list, 4)
    fmt.Println("Add one item:", list)

    // Add multiple items
    list = append(list, 5, 6, 7)
    fmt.Println("Add multiple items:", list)
}
<!--output-->
Initial slice: [1 2 3]
Add one item: [1 2 3 4]
Add multiple items: [1 2 3 4 5 6 7]
```


## Loops

In {{<link "flow-control" >}} we learned about the basic `for` loop. However if we want to loop over all the slice elements, we prefer to use `range`.
With `range` we can iterate over all items of a slice.

```go
package main

import "fmt"

func main() {
    slice := []int{2, 4, 8}
    for index, item := range slice {
        fmt.Println(index, item)
    }
}
<!--output-->
0 2
1 4
2 8
```

In many cases we discard the index with `_` because we only need the actual item:

```go
package main

import "fmt"

func main() {
    slice := []int{2, 4, 8}
    for _, item := range slice {
        fmt.Println(item)
    }
}
<!--output-->
2
4
8
```


## Links

* [SliceTricks](https://github.com/golang/go/wiki/SliceTricks) contains various examples (delete an item from slice, push to a slice, pop from a slice, etc.)
