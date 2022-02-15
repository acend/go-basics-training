---
title: Getting Started
weight: 10
---
## Goals

* Setup development environment
* Compile and run first Go program


## Setup Development Environment

To develop programs with Go you need the following things:

* Go (compiler / tool chain)
* Editor


### Install Go

To install Go follow the official installation instructions at https://go.dev/doc/install. After the installation you can verify if everything works by running `go version` in a terminal.


### Editor

Of course you need an editor to edit the Go source files. There are no special requirements for the editor so you can use whatever editor you are familiar with.
However, among Go developers certain editors are more popular than others and hence there is more tooling and plugins available for them. According to the [Go Developer Survey 2020](https://go.dev/blog/survey2020-results) the two most popular editors are:

* VS Code (41%)
* GoLand / IntelliJ (35%)

For this course it doesn't matter which editor you use. If you are not sure which editor to choose, we recommend you to use VS Code. It is available for free and provides very good support for Go with the official Go extension provided by the Go project.


#### VS Code (optional)

If you don't use VS Code you can skip this section. This section will briefly describe how to install VS Code and the recommended extension for Go development:

* Download and Install VS Code from https://code.visualstudio.com/
* Start VS Code and open the extensions menu on the left side
* Search for the Go extension and install it

![VS Code Go Extension](vs_code_golang_extension.png)

The first time you open a Go file the Go plugin will show a warning to you that certain tools are missing. Click on "Install All" to install all missing tools. This will take some time.

![VS Code Go Extension Error Message](vs_code_golang_extension_error_message.png)


## Hello World

Now we want to build our first Go program which prints `Hello, World!`.
To create an new Go project we create a new directory and initialize a Go module in it
```shell
mkdir hello
cd hello
go mod init hello
```

Then we create a new file `main.go` and put the following code in it:
```golang
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```

The name of the file doesn't matter but it is common to call the file which contains the main function `main.go`. The only important thing for now is, that we have a package `main` and a function `main()` which is the entrypoint for our program. In a later chapter we will learn more about packages and the project structure in general. To get familiar with the basic syntax of Go, a single package `main` should be enough.

Open a terminal and make sure you are in the `hello/` directory. Then you can run the following commands to build your program and run it:
```shell
go build
# Linux / Mac
./hello

# Windows
.\hello.exe
```