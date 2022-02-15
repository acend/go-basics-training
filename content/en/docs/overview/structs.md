---
title: Structs
weight: 220
---

Structs are used to group related variables.

TODO: write one more introduction sentence

```go
package main

import "fmt"

type Person struct {
    name string
    age int
}

func main() {
    fmt.Println(Person{"Christian", 28})
}
```

As soon as structs become larger it makes more sense to specify the struct field names:

```go
package main

import "fmt"

type Person struct {
    name string
    age int
}

func main() {
    chrigu := Person{
        name: "Christian",
        age: 28,
    }
    fmt.Println(chrigu)
}
```

Single fields can be accessed and modified by using a dot:

```go
package main

import "fmt"

type Person struct {
    name string
    age int
}

func main() {
    chrigu := Person{
        name: "Christian",
        age: 28,
    }
    chrigu.age = 29
    fmt.Println(chrigu.age)
}
```

TODO:

* composition not inheritance
* no constructors -> constructor function (NewXxx)
* methods
* embedding
