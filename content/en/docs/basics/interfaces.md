---
title: "Interfaces"
weight: 280
---


## Basics

Interfaces are used to express general behaviour across multiple types.
Interface types are defined as a set of method signatures.
All types which implement this set of methods implement the defined interface.

As an example we define the interface `Stringer`:
```golang
type Stringer interface {
	String() string
}
```

All types that implement the method `String()` and return a `string` implement the `Stringer` interface.
Types implicitly implement an interface if they implement the required methods. This is different to many other language where we have to explicitly specify that a certain type implements an inteface (e.g. in Java with `implements`).


In the following example `User` and `Group` implement the `Stringer` interface.
The `PrintAll` function expects a slice of `Stringer`s. This way we can pass users, groups and every other type which implements the `Stringer` interface to the `PrintAll` function.
In the main function we then initialize a user and a group and put them both into a slice of `Stringer`s which we then pass to the `PrintAll` function.


```go
package main

import "fmt"

// interface type Stringer
type Stringer interface {
	String() string
}

// concrete type User
type User struct {
	Username string
}

func (u *User) String() string {
	return u.Username
}

// concrete type Group
type Group struct {
	Groupname string
}

func (g *Group) String() string {
	return g.Groupname
}

// a function which takes a list of Stringers
func PrintAll(items []Stringer) {
	for _, item := range items {
		// the only thing we know about the items is that they have a method String()
		text := item.String()
		fmt.Println(text)
	}
}

func main() {
	user1 := &User{
		Username: "andrea",
	}

	group1 := &Group{
		Groupname: "admins",
	}

	myItems := []Stringer{user1, group1}

	PrintAll(myItems)
}
<!--output-->
andrea
admins
```


## Any (Empty Interface)

The interface `any` is an alias for the empty interface `interface{}`. This alias got introduced in Go 1.18. Before we just wrote `interface{}` instead.

As the name says the empty interface does not contain any method signatures.
Hence all types implement the empty interface.

{{% alert title="Note" color="primary" %}}
Usually you should avoid using `any`, because then you have to check the types yourself in the code during runtime and the compiler no longer helps you during the compile time. We still mention it here because in rare cases it can be useful and it is used in a couple of places in the standard library.
{{% /alert %}}


Any is used by functions which can handle any or at least multiple types.
An example for this is the [Marshal](https://pkg.go.dev/encoding/json#Marshal) function from the `encoding/json` package which serializes a type into its JSON representation.

Its function signature looks as follows:
```golang
func Marshal(v any) ([]byte, error)
```

It takes any type and returns the serialized data (`[]byte`) or an error (`error`) if something went wrong during the serialization.


## Type Assertion 🌶️

With a type assertion we can obtain the underlying concrete type of an interface type during runtime.
In the following example we have a variable of type `Stringer`. `Stringer` is an interface type. With type assertion we can check if the variable is a `User`. If the variable is a `User` then `ok` is `true` and the `User` is returned.

```golang {hl_lines="23"}
package main

import "fmt"

type Stringer interface {
	String() string
}

type User struct {
	Username string
}

func (u *User) String() string {
	return u.Username
}

func main() {
	var myStringer Stringer = &User{
		Username: "simone",
	}

	// type assertion
	user, ok := myStringer.(*User)

	if ok {
		fmt.Println(user.Username)
	} else {
		fmt.Println("myStringer is not of type User")
	}
}
<!--output-->
simone
```


## Type Switch 🌶️

With a type switch we can check of which type a certain interface type is:

```golang {hl_lines="6"}
package main

import "fmt"

func printType(item any) {
	switch val := item.(type) {
	case int:
		fmt.Println("type is int")
	case []int:
		fmt.Printf("int list with length %d\n", len(val))
	default:
		fmt.Println("unexpected type")
	}
}

func main() {
	printType(1)
	printType([]int{1,2,3,4})
	printType(true)
}
<!--output-->
type is int
int list with length 4
unexpected type
```

