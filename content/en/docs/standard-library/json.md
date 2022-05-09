---
title: JSON
weight: 520
---


## Encoding

Go allows us to encode structs to json by using [json.Marshal](https://pkg.go.dev/encoding/json#Marshal).

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type User struct {
	Name      string
	FullName  string
	Followers int
}

func main() {
	user := User{
		Name:      "Alice",
		FullName:  "Alice Nyffenegger",
		Followers: 44,
	}

	output, err := json.Marshal(user)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	fmt.Printf("%s\n", output)
}
<!--output-->
{"Name":"Alice","FullName":"Alice Nyffenegger","Followers":44}
```

{{% alert title="Note" color="primary" %}}

Other packages (e.g. [json](https://pkg.go.dev/encoding/json)) cannot access the struct fields if they are lower case. Be sure to make them public by upper casing the first letter.

{{% /alert %}}


### Tags

Often the names in your struct and the names you want in the serialized JSON are not the same. With tags you can map certain struct fields to other field names in the JSON representation:

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type User struct {
	Name      string `json:"short_name"`
	FullName  string `json:"name"`
	Followers int    `json:"followers"`
}

func main() {
	user := User{
		Name:      "Alice",
		FullName:  "Alice Nyffenegger",
		Followers: 44,
	}

	output, err := json.Marshal(user)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	fmt.Printf("%s\n", output)
}
<!--output-->
{"short_name":"Alice","name":"Alice Nyffenegger","followers":44}
```


## Decoding

Decoding works similiarly with the [json.Unmarshal](https://pkg.go.dev/encoding/json#Unmarshal) function. In addition to the JSON data (as a byte slice `[]byte`) we also pass a pointer to the struct itself. Since we use a pointer the struct can be modified directly and is not returned by `Unmarshal`.

With backticks we can create multiline strings or strings which contain a lot of quotes (`"`) like JSON data.

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type User struct {
	Name      string `json:"short_name"`
	FullName  string `json:"name"`
	Followers int    `json:"followers"`
}

func main() {
        input := `{"short_name":"Alice","name":"Alice Nyffenegger","followers":44}`

	user := User{}

	err := json.Unmarshal([]byte(input), &user)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	fmt.Printf("%s %s %d\n", user.Name, user.FullName, user.Followers)
}
<!--output-->
Alice Alice Nyffenegger 44
```
