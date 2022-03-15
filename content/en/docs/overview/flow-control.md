---
title: Flow control
weight: 220
---

## Basics

Conditionals in Go are similiar to other programming languages. Notice that there are no round brackets surrounding the condition.

```go
package main

import "fmt"

func main() {
  x := 10
  if x >= 5 {
    fmt.Println("X is greater or equal to 5")
  } else {
    fmt.Println("X is smaller than 5")
  }
}
<!--output-->
X is greater or equal to 5
```

Multiple logical conditions can be combined with `&&` (AND) and `||` (OR).

{{% details title="Optional: One-line if statement" %}}
You can also define variables that are only available within the conditional scope. This is often used if a function only returns one argument (e.g. `err`).

```go {hl_lines="15"}
package main

import (
  "fmt"
  "os"
)

func sub(a int, b int) (int, bool) {
    result := a - b
    isNegative := result < 0
    return result, isNegative
}

func main() {
    if _, negative := sub(2, 3); negative == true {
        fmt.Println("Negative results are not allowed! Negative:", negative)
        os.Exit(1)
    }
    // The variable `negative` is not available here
}
<!--output-->
Negative results are not allowed! Negative: true
```
{{% /details %}}


## Loops

The examples below show the basic loop constructs. We will look at an additional variant in the chapter {{<link "slices">}}.


### For - classical

```go
package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }
}
<!--output-->
0
1
2
3
4
```


### While equivalent

```go
package main

import "fmt"

func main() {
    i := 0
    for i < 5 {
        fmt.Println(i)
        i++
    }
}
<!--output-->
0
1
2
3
4
```
