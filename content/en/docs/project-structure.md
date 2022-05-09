---
title: Project Structure
weight: 300
---


## Basics

A Go project usually consists of exactly one module.
Every directory within the project is a package.
Hence a module is a collection of packages.

So usually we can say:

* Module = Project = Git Repository
* Package = Directory


## Module path

To create a new Go project in the current directory we initialize a new module by running `go mod init <module-path>`.
If we want to create a new project named `myproject` we would do the following steps:

```
mkdir myproject
cd myproject/
go mod init myprojct
```

The module path which is passed to `go mod init` is used to identify the module itself. It is the root for all the packages in your module.
Usually a name like `myproject` is fine.
If you plan to create a library which will be used by other Go projects, the module path should point to the location where the code is located.

Typically this would be something like this, which points to Github or another remote location:

```
go mod init github.com/myuser/myproject
```

For the following exmaples we assume that we choose `github.com/myuser/myproject` as our module path.
On running `go mod init` a file `go.mod` gets created. In it we can see the module path of the current package.

`go.mod`
```
module github.com/myuser/myproject

go 1.17
```


## Packages

Every directory within your project is a package.
All files within a directory belong to the same package and hence must have the same package clause at the top.
A package is a compilation unit. Identifiers in one file of a package can be seen in every other file of the same package.


In the following example we have two files in a directory. They both belong the the package `main`.
We can use the function `otherFunc()` in the file `./main.go` which is defined in the file `other.go` because the files are in the same package.

`./main.go`
```golang {playground=false}
package main

func main() {
	fmt.Println(otherFunc())
}

```

`./other.go`
```golang {playground=false}
package main

func otherFunc() string {
	return "hello from otherFunc"
}
```


### Package Name

In most cases the name of the directory and the package name are the same.

Assume we have a directory `./app` in our `github.com/myuser/myproject` module. In this case the package name would be `app`.
Files in the directory `./app` would all have the same package clause at the top:

`./app/run.go`
```golang
package app

// ...
```

`./app/app.go`
```golang
package app

// ...
```


### Main Package

A common exception where the package name is not the same as the directory name is the package `main`. If you want to build an executable binary from the package, we have to call the package `main`.

The `main` package must contain a function `main()` which is the entrypoint for the executable.

```golang
package main

func main() {
	// program entrypoint
}
```

You can not import a package main from other packages.


## Imports

To use functions, variables, types, etc. (identifiers) from other packages we can import them by their import path using the import keyword:

```golang {playground=false}
package main

import (
	// imports package fmt from the Go standard library
	"fmt"

	// import package app from our own module
	"github.com/myuser/myproject/app"
)

func main() {
	// use exported function Calc() from our own app package
	number := app.Calc(23)

	// use exported function Println from the fmt package
	fmt.Println(number)
}
```

We can only use exported identifiers from the imported packages.
Identifiers of a package are exported if the first character of an identifier is a Unicode upper case letter.

Assume we have a directory `./app` in your `github.com/myuser/myproject` module. In this case the package name would be `github.com/myuser/myproject/app`.
In the directory we have file `calc.go` with some functions and variables:

`./app/calc.go`
```golang
package app

// exported variable
var MagicNumber = 12

// exported function
func Calc(i int) int {
	return addOne(i)
}

// private function
func addOne(i int) int {
	return i + 1
}
```

In this case only the function `Calc()` and the variable `MagicNumber` can be used from other packages.
The function `addOne()` can not be used becuase it is not exported.

We can divide the imports into three categories:

* Standard Library
* Imports from package in same project
* Imports from external projects


### Standard Library

The Go standard library provides many useful packages. For more information see the documentation at: https://pkg.go.dev/std

Common packages in the standard library are:

* [fmt](https://pkg.go.dev/fmt): Formatted I/O with functions analogous to C's printf and scanf.
* [os](https://pkg.go.dev/os):  Operating system functionality (opening files, ...)
* [net/http](https://pkg.go.dev/net/http): HTTP client and server
* [encoding/json](https://pkg.go.dev/encoding/json): Encoding and decoding of JSON

You can import packages from the standard library in every file without depending on external dependencies.
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
	fmt.Printf("%s", content)
}
<!--output-->
open test.txt: no such file or directory
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
```golang {playground=false}
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

External packages are imported like internal packages. The only difference is that the root does not point to our own module `github.com/myuser/myproject`.

Further, before we can use an external package we have to download it using `go get`.

In the following example we create a function which generates UUIDs. For this we are using a UUID library from Google [github.com/google/uuid](https://pkg.go.dev/github.com/google/uuid).

```bash
# run this in the root of your project
go get github.com/google/uuid
```

```golang
package main

import (
	"fmt"

	"github.com/google/uuid"
)

func generateUUID() string {
	return uuid.NewString()
}

func main() {
	fmt.Println(generateUUID())
}
<!--output-->
3e87369c-76fd-4e73-b86c-cc46f46996e5
```

Instead of getting the dependency beforehand with `go get` you can also just add the code and then run `go mod tidy`.
