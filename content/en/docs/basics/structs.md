---
title: Structs
weight: 240
---


## Basics

Structs are used to group related variables called fields. In that respect structs in Go are similar to classes or objects in other languages.


### Declare Struct Type

This statement declares a new struct type called `User`. This struct contains three fields. The name of the user (`string`), the number of failed login attempts (`int`) and if the user is locked (`bool`):
```golang
type User struct {
	Name         string
	FailedLogins int
	Locked       bool
}
```


### Create Instance

A new struct instance can be created using a struct literal:
```golang
myUser := User{
	Name:         "admin",
	FailedLogins: 0,
	Locked:       false,
}
```

When createing a new instance you don't have to specify all struct fields. If a field is not set it is initialized to the zero value of its type.

The following example creates the same struct as the previous example.
The field `FailedLogins` is set to `0` and `Locked` is set to `false` since `0` and `false` are the zero values of `int` and `bool`.
```golang
myUser := User{
	Name: "admin",
}
```


### Access Struct Fields

The individual fields of a struct are accessed using a dot:

```golang
// say hello to the user
fmt.Printf("hello %s", myUser.Name)

// increase the number of failed login attempts
myUser.FailedLogins += 1

// lock to user
myUser.Locked = true
```

Here you see a full example:

```go
package main

type User struct {
	Name         string
	FailedLogins int
	Locked       bool
}

func main() {
	myUser := User{
		Name: "admin",
	}

	fmt.Println(myUser)

	myUser.FailedLogins += 1

	if myUser.FailedLogins > 0 {
		myUser.Locked = true
	}

	fmt.Println(myUser)
}
<!--output-->
{admin 0 false}
{admin 1 true}
```


## Structs As Function Arguments

Structs can be passed to functions like any other value.
If we pass a struct to a function it gets copied.
```golang
func Print(user User) {
	fmt.Println(user.Name)
}
```

If we want to change a struct within a function we have to pass a pointer to a struct to the function.
Otherwise within the function we would only change the copy.
Even if we do not change a struct within a function we often just pass a pointer

Consider a function `Reset` which should reset the failed login attempts and unlock a user.
For this function instead of expecting a user `User` which would only be copy we expect a pointer to a user (`*User`) as argument:
```
func Reset(user *User) {
	user.FailedLogins = 0
	user.Locked = false
}
```

As we learnt in chapter {{<link "pointers">}} we can obtain a pointer to a value by preceding it with `&`:
```golang
Reset(&myUser)
```

We can also directly obtain a pointer to a user `*User` on creation as follows:
```golang
myUser := &User{
	Name: "admin",
}

Reset(myUser)
```

Full example:

```go
package main

type User struct {
	Name         string
	FailedLogins int
	Locked       bool
}

func Print(user User) {
	fmt.Println(user.Name, user.Locked)
}

func Reset(user *User) {
	user.FailedLogins = 0
	user.Locked = false
}

func main() {
	// myUser gets type *User because we use &User{} for initialization
	myUser := &User{
		Name: "admin",
	}

	// with *myUser we dereference the *User to obtain a User
	Print(*myUser)

	myUser.Locked = true

	Print(*myUser)

	Reset(myUser)

	Print(*myUser)
}
<!--output-->
admin false
admin true
admin false
```


## Constructors

Go does not have constructors. It is common to use a function `NewXxx` where `Xxx` is the struct name.

```golang
package main

type person struct {
       Name string
       Age int
}

func NewPerson(name string, age int) person {
       return person{
               Name: name,
               Age: age,
       }
}

func main() {
       pers := NewPerson("Ursli", 45)
       fmt.Println(pers)
}
<!--output-->
{Ursli 45}
```


## Methods

Instead of passing structs to functions we can attach methods to structs.
In the previous example we passed a `User` or a `*User` to a function.
Sometimes it is more convient to call such a function as method directly on the variable:
```golang
myUser.Reset()

// instead of
Reset(myUser)
```

A method declaration looks like a function declaration.
The only difference is that you specify to which struct you want to attach the method between the `func` keyword and the argument list:
```golang
func (user *User) Reset() {
	user.FailedLogins = 0
	user.Locked = false
}
```

Full example:

```go
package main

type User struct {
	Name         string
	FailedLogins int
	Locked       bool
}

func (user User) Print() {
	fmt.Println(user.Name, user.Locked)
}

func (user *User) Reset() {
	user.FailedLogins = 0
	user.Locked = false
}

func main() {
	myUser := &User{
		Name:   "admin",
		Locked: true,
	}

	myUser.Print()

	myUser.Reset()

	myUser.Print()
}
<!--output-->
admin true
admin false
```


## Nested Structs

In comparision with other languages Go does not support inheritance. However something similiar can be achieved by using composition:

```go
package main

import "fmt"

type person struct {
    firstName string
    lastName string
    age int
}

type blogPost struct {
    title string
    content string
    author person
}

func (p person) fullName() {
    // Printf allows us to use placeholders for variables.
    // %v can be used for all variable types.
    // You may also restrict this to %s and %d for strings and digits.
    fmt.Printf("%v %v\n", p.firstName, p.lastName)
}

func main() {
    chrigu := person{
        firstName: "Christian",
        lastName: "Müller",
        age: 28,
    }
    blogPost1 := blogPost{
        // we do not need to specify the struct field names
        "Inheritance in Go",
        "Go supports composition instead of inheritance",
        chrigu,
    }
    blogPost1.author.fullName()
}
<!--output-->
Christian Müller
```


## Embedding

Multiple structs can also be combined. This is called embedding. Notice that we are using the `person` struct directly in `blogPost` without giving it a struct field name:


```go
package main

import "fmt"

type person struct {
    firstName string
    lastName string
    age int
}

type blogPost struct {
    title string
    content string
    person
}

func (p person) fullName() {
    fmt.Println(p.firstName, p.lastName)
}

func main() {
    chrigu := person{
        firstName: "Christian",
        lastName: "Müller",
        age: 28,
    }
    blogPost1 := blogPost{
        // we do not need to specify the struct field names
        "Inheritance in Go",
        "Go supports composition instead of inheritance",
        chrigu,
    }
    // Even though we did not specify a struct field name, we can use the type name
    blogPost1.person.fullName()
    // Since the struct is embedded, we can also directly access its fields!
    blogPost1.fullName()
    fmt.Println(blogPost1.firstName)
}
<!--output-->
Christian Müller
Christian Müller
Christian
```
