---
title: "ASCII Pyramid"
weight: 9100
---

## Task

Create a function which prints an ASCII Pyramid. The function should the height of the pyramid as parameter.

If you call the function with `5` as parameter we should get the following pyramid:
```
    *
   ***
  *****
 *******
*********
```


## Tips

{{%details title="Standard packages"%}}
The package [fmt](https://pkg.go.dev/fmt) contains various print functions.
{{%/details%}}

{{%details title="Standard library functions"%}}
With [fmt.Print](https://pkg.go.dev/fmt#Print) you can print strings:
```golang
// print space
fmt.Print(" ")

// print star
fmt.Print("*")

// print newline
fmt.Print("\n")
```
{{%/details%}}

{{%details title="Logic"%}}
On each line you have to print the appropriate number of spaces and stars:

* spaces: `height - lineNumber`
* stars: `lineNumber * 2 - 1`

{{%/details%}}


## Solution

https://github.com/acend/go-basics-training-examples/blob/master/ascii-pyramid/main.go
