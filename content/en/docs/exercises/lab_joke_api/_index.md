---
title: "Joke API"
weight: 9151
---

Try and solve the following. Every task has links to relevant documentation.

### Request an API
1. Begin with the following [main.go](main.txt) which requests a joke from https://official-joke-api.appspot.com/random_joke and decodes it into a Go struct.
2. Refactor the HTTP request into another [function](/docs/basics/functions/) that returns `joke, error`
3. Update the code to also [decode](/docs/standard-library/json/) and print the punchline
4. [Delay](https://pkg.go.dev/time#Sleep) the punchline by a few seconds
5. Make the delay configurable with a `--delay 10` [flag](https://pkg.go.dev/flag)

### Build an API
6. Write another program that [reads](https://pkg.go.dev/os#ReadFile) a [json file](https://github.com/15Dkatz/official_joke_api/blob/master/jokes/index.json) and picks a [random](https://pkg.go.dev/math/rand#Intn) joke
7. Implement a [HTTP Server](/docs/standard-library/http-server/) that serves the picked joke
8. Add a new endpoint that expects a joke and [persists](/docs/standard-library/io/) it
9. Update your program from part one so that you can configure the URL (maybe as another flag) and query your own API

### Add jokes
10. Extend your HTTP Server that you can send a joke to it which gets persisted (POST request)
11. Extend your program from part one that it supports adding new jokes. For this ask the user to enter a joke on the command line (standard input) and [send](/docs/standard-library/http-client/) it to your own API.


## Tips

{{%details title="Project structure"%}}
You cannot have multiple `main` functions in a single directory. If you want to create multiple binaries, these must be separated into different directories. By convention the directory equals the binary name and is located under `cmd/` (e.g. `cmd/request-joke/main.go`).
{{%/details%}}

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
