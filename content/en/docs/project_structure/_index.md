---
title: "Project Structure"
weight: 300
---


## Basics

A Go project usually consists of exactly one module.
Every directory within the project is a package.
Hence a module is a collection a packages.

So usually we can say:

* Module = Project = Git Repository
* Package = Directory


## Module path

To create a new Go project in the current directory we initialize a new module with by running `go mod init <module-path>`.
If we want to create a new project named `myproject` we would do the following steps:

```
mkdir myproject
cd myproject/
go mod init myprojct
```

The module path which is passed to `go mod init` is used to identify the module. It is the root for all the packages in your module.
Usually a name like `myproject` is fine.
If you plan to create a library which will be used by other Go projects, the module path should point to the place where the code can be fetched.
Typically this would be something like:

```
go mod init github.com/myuser/myproject
```

Depending on the purpose of your project your module path should be:

* Application: it can be a simple name like `myproject` or a full name like `github.com/myuser/myproject`
* Libraries: it has to be a full name like `github.com/myuser/myproject`

For the following exmaples we assume that we choose `github.com/myuser/myproject` as our module path.
On running `go mod init` a file `go.mod` gets created. In it we can see the module path of the current package.

* `go.mod`

```
module github.com/myuser/myproject

go 1.17
```


## Packages

Every directory within your module is package.
All files within the directory belong to the same package and are one compilation unit.
This means that if you have multiple files in a directory they all see the variables, function definitions etc. from each other.

`./main.go`
```golang
package main

func main() {
	fmt.Println(otherFunc())
}

```

`./other.go`
```golang
package main

func otherFunc() string {
	return "hello from otherFunc"
}
```


## Imports


### Standard Library

The Go standard library provides many useful packages. For more information see the documentation at: https://go.dev/pkg

Common packages in the standard library are:

* `fmt`: Formatted I/O with functions analogous to C's printf and scanf.
* `os`:  Operating system functionality (opening files, ...)
* `net/http`: HTTP client and server
* `encoding/json`: Encoding and decoding of JSON

Packages from the standard library you can import in every file without depending on external dependencies.
```golang
package main

import (
	"fmt"
	"os"
)

func main() {
	content, err := os.ReadFile("test.txt")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Println(content)
}
```


### Packages From Same Project

Assume the module path of your project is `github.com/myuser/myproject`.
In your project you have a directory `./user` which contains a file `def.go`

`./user/def.go`
```golang
package user

type User struct {
	Name string
}

func NewUser(name string) *User {
	return &User{
		Name: name,
	}
}
```

Then you can use the `user` package in another package of your project as follows:

`cmd/show/main.go`
```golang
package main

import (
	"fmt"

	"github.com/myuser/myproject/user"
)

func createAdminUser() *user.User {
	return user.NewUser("admin")
}

func main() {
	admin := createAdminUser()
	fmt.Println(admin)
}
```


### External Libraries

TODO
