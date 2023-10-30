---
title: "Joke API"
weight: 9151
---

## Task

Try and solve the following. Every task has links to relevant documentation.


### API Client

1. Begin with the following [main.go](main.txt) which requests a joke from https://official-joke-api.appspot.com/random_joke and decodes it into a Go struct.
2. Refactor the HTTP request into another [function](/docs/basics/functions/) that returns `joke, error`
3. Update the code to also [decode](/docs/standard-library/json/) and print the punchline
4. [Delay](https://pkg.go.dev/time#Sleep) the punchline by a few seconds
5. Make the delay configurable with a `--delay 10` [flag](https://pkg.go.dev/flag)

{{%details title="Some tips regarding flags"%}}
We recommend using [flag.IntVar](https://pkg.go.dev/flag#IntVar), instead of [flag.Int](https://pkg.go.dev/flag#Int). Both variants work, but with [flag.IntVar](https://pkg.go.dev/flag#IntVar) you end up with a normal variable, instead of a [pointer](/docs/basics/pointers/). You may also try using [flag.DurationVar](https://pkg.go.dev/flag#DurationVar).

To learn more about the `*int` type, see {{< link "content/en/docs/basics/pointers.md" >}}.

Do not forget to run [flag.Parse()](https://pkg.go.dev/flag#Parse) after defining the flags.
{{%/details%}}
{{%details title="Error: mismatched types int and time.Duration"%}}
When solving the last task, you might receive the error: `mismatched types int and time.Duration`. This is because you cannot multiply different types. You must first convert the value to the same type.

```go
i := 42
f := float64(i)
u := uint(f)
d := time.Duration(u)
```

For more information why `5 * time.Second` works see:
https://stackoverflow.com/a/49498375
{{%/details%}}

### API Server

6. Write another program that [reads](https://pkg.go.dev/os#ReadFile) a [json file](https://github.com/15Dkatz/official_joke_api/blob/master/jokes/index.json) and picks a [random](https://pkg.go.dev/math/rand#Intn) joke. You will need to use [slices](/docs/basics/slices)
7. Implement a [HTTP Server](/docs/standard-library/http-server/) that serves the picked joke
8. Update your program from part one so that you can configure the URL (maybe as another flag) and query your own API


### Add jokes

9. Extend your HTTP Server that you can send a joke to it which gets [persisted](/docs/standard-library/io/) (POST request)
10. Extend your program from part one that it supports adding new jokes. For this ask the user to enter a joke on the command line (standard input) and [send](/docs/standard-library/http-client/) it to your own API.

{{%details title="Prompt for input on the command line (standard input)"%}}
With the [bufio](https://pkg.go.dev/bufio) package we can read from the standard input ([os.Stdin](https://pkg.go.dev/os#Stdin)) until a certain character occurs:

```golang
line, err := bufio.NewReader(os.Stdin).ReadString('\n')
```

The [strings](https://pkg.go.dev/strings) package contains various functions to work with strings. For example [strings.TrimSpace](https://pkg.go.dev/strings#TrimSpace) to remove whithspace characters (spaces, newlines, etc.) from strings.

```golang
line = strings.TrimSpace(line)
```
{{%/details%}}


## Solution

[Client](https://github.com/acend/go-basics-training-examples/tree/master/joke-api-client)

[Server](https://github.com/acend/go-basics-training-examples/tree/master/joke-api-server)

[Full Combined](https://github.com/acend/go-basics-training-examples/tree/master/joke-api-full)
