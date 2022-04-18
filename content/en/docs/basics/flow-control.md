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


## Switch

If you are testing one variable for multiple conditions with `else if` the code can quickly become confusing. In these cases a switch statement can be used. The last `default` case is equivalent to `else`.

```go
package main
import ("fmt")

func main() {
  dayOfWeek := 3

  switch dayOfWeek {
    case 1:
      fmt.Println("Sunday")
    case 2:
      fmt.Println("Monday")
    case 3:
      fmt.Println("Tuesday")
    case 4:
      fmt.Println("Wednesday")
    case 5:
      fmt.Println("Thursday")
    case 6:
      fmt.Println("Friday")
    case 7:
      fmt.Println("Saturday")
    default:
      fmt.Println("Invalid day")
  }
}
<!--output-->
Tuesday
```


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
