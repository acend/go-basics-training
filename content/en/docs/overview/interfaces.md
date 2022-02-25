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

All type which implement the method `String()` which returns a `string` implement the `Stringer` interface.
Types implicitly implement an interface if they implement the required methods. Other than in for example Java we don't have to explicitly specify that a certain type implements an inteface (`implements`).


In the following example `User` and `Group` implement the `Stringer` interface.
The `PrintAll` function expects a slice of `Stringer`s. This way we can pass users, groups and every other type which implements the `Stringer` interface to the `PrintAll` function.
In the main function we then initialize a user and a group and put them both into a slice of `Stringer`s which we then pass to the `PrintAll` function.


{{<go-playground>}}
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
{{</go-playground>}}


## Empty Interface

A special interface is the empty interface `interface {}`.
As the name says the empty interface does not contain any method signatures.
Hence all types implement the empty interface.

Empty interfaces are used by functions which can handle unknown types.
An example for this is the `Marshal` function from the `encoding/json` package which serializes a type into its JSON representation.

Its function signature looks as follows:
```golang
func Marshal(v interface{}) ([]byte, error)
```

It takes any type (`interface{}`) and returns the serialized data (`[]byte`) or an error (`error`) if something went wrong during the serialization.

Since a function which takes an empty interface as input does not know of which type an input is they use reflection and type assertion (see next part) to handle the input.

{{%optional title="Type Assertion"%}}
With type assertion we can obtain the underlaying concrete type of an interface type.
In the following example we have a variable of type `Stringer`. `Stringer` is an interface type. With type assertion we can check if the variable is a `User`. If the variable is a `User` then `ok` is `true` and the `User` is also returned. 

{{<go-playground hl_lines="23">}}
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
{{</go-playground>}}

{{%/optional%}}

