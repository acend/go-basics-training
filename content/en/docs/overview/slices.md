---
title: "Slices"
weight: 260
---


## Basics

Slices store multiple items of the same type.

{{<go-playground>}}
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
{{</go-playground>}}


## Slice of structs

We can also store multiple instances of a struct.

{{<go-playground>}}
package main

import "fmt"

type Person struct {
    name string
    age int
}
func main() {
    people := []Person {
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
{{</go-playground>}}


## Appending items

To add items to an existing slice you can use `append`. Notice that `append` does not modify the original slice, but returns a new one. This has to do with how slices are implemented in Go. You do not need to know how this works.

{{<go-playground>}}
package main

import "fmt"

func main() {
    slice := []int{1, 2, 3}
    slice2 := []int{55, 66, 77}
    fmt.Println("Start slice:", slice)
    fmt.Println("Start slice2:", slice2)

    // Add an item to a slice.
    slice = append(slice, 4)
    fmt.Println("Add one item:", slice)

    // Add multiple items
    slice = append(slice, 5, 6, 7)
    fmt.Println("Add multiple items:", slice)

    // Add one slice to another.
    slice = append(slice, slice2...) // same as append(slice, 55, 66, 77)
    fmt.Println("Add one slice:", slice)
}
<!--output-->
Start slice: [1 2 3]
Start slice2: [55 66 77]
Add one item: [1 2 3 4]
Add multiple items: [1 2 3 4 5 6 7]
Add one slice: [1 2 3 4 5 6 7 55 66 77]
{{</go-playground>}}


## Loops

In {{< link "flow_control" >}} we learned about the basic `for` loop. However if we want to loop over all the slice elements, we prefer the following.

Try to always use `range` if you can.

{{<go-playground>}}
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
{{</go-playground>}}


## {{%task%}} Multiple values

Try modifying `Println` and removing the `index` output. In Go it is an error to define a variable and not use it. You can use `_` (underscore) to ignore a return value.

{{%details title="Solution"%}}
Replace `for index, item` with `for _, item`:
{{<go-playground>}}
package main

import "fmt"

func main() {
    slice := []int{2, 4, 8}
    for _, item := range slice {
        fmt.Println(item)
    }
    // We almost never need this
    // This is only here to show what happens when we only read one value
    for index := range slice {
        fmt.Println(index)
    }
}
<!--output-->
2
4
8
0
1
2
{{</go-playground>}}
{{%/details%}}
