---
title: "Structs"
weight: 240
---

## Goals

* Use structs
* Constructors
* Methods


## Create new struct type

```golang
package main

type Person struct {
	Name string
	Age int
}

func main() {
	pers := Person{
		Name: "Sepp",
		Age: 42,
	}

	fmt.Println(pers.Name)
	fmt.Println(pers.Age)
}
```


## Constructors

Go does not have constructurs. Its common to use a function `NewXxx` where `Xxx` is the struct name.

```golang
package main

import (
	"os"
	"fmt"
)

type Person struct {
	Name string
	Age int
}

func NewPerson(name string, age int) Person {
	return Person{
		Name: name,
		Age: age,
	}
}

func main() {
	pers := NewPerson("Ursli", 45)
}
```


## Methods

```
package main

import (
	"os"
	"fmt"
)

type Person struct {
	Name string
	Age int
	Kids []Person
}

func (p *Person) GetOlder(years int) {
	p.Age += years
}

// same as
func GetOlder1(p *Person, years int) {
	p.Age += years
}

func main() {
	pers := NewPerson("Ursli", 45)
	fmt.Println(pers)
	pers.GetOlder(2)
	fmt.Println(pers)

	GetOlder1(pers, 3)
	fmt.Println(pers)
}
```
