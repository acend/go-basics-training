---
title: Maps
weight: 270
source:
- https://go.dev/blog/maps
---


## Basics

A map maps keys to values. The following example shows how to:

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
    m["route"] = 66
    fmt.Println("route", m["route"])
    fmt.Println("len", len(m))
    delete(m, "route")
    fmt.Println("route", m["route"]) // the zero value is returned, if the item does not exist
    fmt.Println("len", len(m))
}
<!--output-->
route 66
len 1
route 0
len 0
```


## Check if key exists

We can check if a key exists by using the second return value when accessing a key in a map.

```go {hl_lines="9-10"}
package main

import "fmt"

func main() {
    m := map[string]int{
        "route": 66,
    }
    i, ok := m["route"] // Try changing the key
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

```go
package main

import "fmt"

func main() {
    m := map[string]int{
        "route": 66,
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
key route
value 66
```
