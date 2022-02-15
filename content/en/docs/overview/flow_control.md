---
title: "Flow control"
weight: 250
---

## Goals

* Conditional (if/else)
* Loop


## If / Else

```golang
```


## Loops

We look at more loops in the chapter slices and maps.


### For - classical

```
package main

import "fmt"

func main() {
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}
}
```


### While equivalent

```
package main

import "fmt"

func main() {
	i := 0
	for i < 10 {
		fmt.Println(i)
		i++
	}
}
```
