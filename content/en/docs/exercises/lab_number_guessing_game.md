---
title: "Number Guessing Game"
weight: 9150
---

## Task

Write a number guessing game. At the start create a random number.
Then ask the user to enter a number on the command line (standard input) until the user guesses the correct number.

If the user enters the string `exit` the program should exit.

The output could look like in the following example. In the example the user enters the numbers 5, 7 and 6.
```
guess number between 0 and 9
guess number: 5
wrong number. try again.
guess number: 7
wrong number. try again.
guess number: 6
correct
```


## Tips

{{%details title="Read line"%}}
With the [bufio](https://pkg.go.dev/bufio) package we can read from the standard input ([os.Stdin](https://pkg.go.dev/os#Stdin)) until a certain character occurs:

```golang
line, err := bufio.NewReader(os.Stdin).ReadString('\n')
```

The [strings](https://pkg.go.dev/strings) package contains various functions to work with strings. For example [strings.TrimSpace](https://pkg.go.dev/strings#TrimSpace) to remove whithspace characters (spaces, newlines, etc.) from strings.

```golang
line = strings.TrimSpace(line)
```
{{%/details%}}

{{%details title="Random number"%}}
The function [rand.Intn](https://pkg.go.dev/math/rand#Intn) returns a random integer. Before we use one of the random functions we have to seed the random number generator, otherwise we would always get the same number. As seed we can use the current time as nano seconds provided by the [time](https://pkg.go.dev/time#Time.UnixNano) package.

```golang
rand.Seed(time.Now().UnixNano())

// 0 <= randomNumber < 10
randomNumber := rand.Intn(10)
```

{{%/details%}}

{{%details title="Convert string to int"%}}
The package [strconv](https://pkg.go.dev/strconv) implements conversions to and from string representations of basic data types like `int` or `float64`.

With [strconv.Atoi](https://pkg.go.dev/strconv#Atoi) you can convert a string into a `int`.
```golang
number, err := strconv.Atoi("8")
if err != nil {
	// handle failed conversion
}
```
{{%/details%}}


## Solution

https://github.com/acend/go-basics-training-examples/blob/master/number-guessing/main.go
