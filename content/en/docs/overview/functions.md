---
title: "Functions"
weight: 220
---

## Goals

* Learn how to use functions
* Returning errors from functions
* Run cleanup with defer
* Functions with variadic arguments


## Basics

```golang
package main

func add(a int, b int) int {
	return a + b
}

func main() {
	result := add(2, 3)
	fmt.Println(result)
}
```


## Errors

```golang
package main

import (
	"os"
	"fmt"
)

func main() {
	fileContent, err := os.ReadFile("test.txt")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	fmt.Println(fileContent)
	defer f.Close()
}
```


## Defer

```
package main

import (
	"os"
	"fmt"
)

func main() {
	file, err := os.Open("test.txt")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer file.Close()
	// do stuff with file
```


## Variadic

```
func sum(nums ...int) int {
	result := 0
	for _, i := range nums {
		res += i
	}
	return result
}
```
