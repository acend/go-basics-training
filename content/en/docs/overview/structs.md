---
title: Structs
weight: 220
sources:
- https://golangbot.com/inheritance/
---

Structs are used to group related variables. It seems trivial, but stay with me. Structs are very important and often used.

```go
package main

import "fmt"

type person struct {
    name string
    age int
}

func main() {
    fmt.Println(person{"Christian", 28})
}
```

As soon as structs become larger it makes more sense to specify the struct field names:

```go
package main

import "fmt"

type person struct {
    name string
    age int
}

func main() {
    chrigu := person{
        name: "Christian",
        age: 28,  // note: the comma is required!
    }
    fmt.Println(chrigu)
}
```

Single fields can be accessed and modified by using a dot:

```go
package main

import "fmt"

type person struct {
    name string
    age int
}

func main() {
    chrigu := person{
        name: "Christian",
        age: 28,
    }
    chrigu.age = 29
    fmt.Println(chrigu.age)
}
```

Structs are easy to understand and are useful building blocks for more advanced concepts.

For example we can attach methods to structs:

```go
package main

import "fmt"

type person struct {
    firstName string
    lastName string
    age int
}

func (p person) fullName() {
    // Printf allows us to use placeholders for variables.
    // %v can be used for all variable types.
    // You may also restrict this to %s and %d for strings and digits.
    fmt.Printf("%v %v" p.firstName, p.lastName)
}

func main() {
    chrigu := person{
        firstName: "Christian",
        lastName: "Müller",
        age: 28,
    }
    chrigu.fullName()
}
```

This can be viewed as similiar to classes in object oriented programming. If you are not familiar with Java, you may ignore this analogy.

In comparision with Java Go does not support inheritance. However something similiar can be achieved by using composition:

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
```

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
    // Even though we did not specify a struct field name, we can use the type name
    blogPost1.person.fullName()
    // Since the struct is embedded, we can also directly access its fields!
    blogPost1.fullName()
    fmt.Println(blogPost1.firstName)
}
```

In our code samples above we initialized the struct values directly. Imagine we are writing a library and exposing certain features. We might want to execute some code when a struct is initialized. This can be useful to set default values or check if all fields are correctly set:

```go
package main

import "fmt"

type person struct {
    firstName string
    lastName string
    age int
}

func (p person) fullName() {
    fmt.Printf("%v %v\n", p.firstName, p.lastName)
}

func NewPerson(firstName string, lastName string, age int) person {
    if age < 18 {
        // We could also return an error here, instead of an empty response
        return nil
    }
    return person{
        firstName,
        lastName,
        age,
    }
}

func main() {
    chrigu := NewPerson("Christian", "Müller", 28)
    chrigu.fullName()
```
