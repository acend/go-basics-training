---
title: Maps
weight: 270
---


## Basics

A map maps keys to values. In other languages it is also called hash map or dictionary. The following example shows how to:

* initialize a map with an empty map literal
* set a value by key
* get a value by key
* delete a key
* get the length of the map

```go
package main

import "fmt"

func main() {
    m := map[string]int{}
    m["john"] = 66
    fmt.Println("john", m["john"])
    fmt.Println("len", len(m))
    delete(m, "john")
    fmt.Println("john", m["john"]) // the zero value is returned, if the item does not exist
    fmt.Println("len", len(m))
}
<!--output-->
john 66
len 1
john 0
len 0
```


## Check if key exists

We can check if a key exists by using the second return value when accessing a key in a map.

```go {hl_lines="9-10"}
package main

import "fmt"

func main() {
    m := map[string]int{
        "john": 66,
    }
    i, ok := m["john"] // Try changing the key
    if !ok {
        fmt.Println("The key does not exist in the map")
    }
    fmt.Println("i", i)
    fmt.Println("ok", ok)
}
<!--output-->
i 66
ok true
```


## Looping over elements

And range over all the elements:

<!-- Disable output comparison, because map iteration order is not specified -->
```go {compareOutput=false}
package main

import "fmt"

func main() {
    m := map[string]int{
        "john": 66,
        "another": 50,
    }
    for key, value := range m {
      fmt.Println("key", key)
      fmt.Println("value", value)
    }
}
<!--output-->
key another
value 50
key john
value 66
```
