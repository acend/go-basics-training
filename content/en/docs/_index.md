---
title: Labs
weight: 2
menu:
  main:
---

## Lab Introduction

{{<go-playground>}}
package main

import (
    "time"
    "fmt"
)

func main() {
    fmt.Println("hello6\nworld")
    time.Sleep(10)
    fmt.Println("hello7")
}
<!--output-->
hello6
world
hello7
{{</go-playground>}}

{{<go-playground>}}
package main

import (
    "fmt"
)

func main() {
    fmt.Println("world")
}
<!--output-->
world
{{</go-playground>}}

{{<go-playground>}}
fmt.Println("test")
{{</go-playground>}}
