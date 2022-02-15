---
title: "Tests"
weight: 400
---

## Writing Tests

```golang
package main

import "testing"

func TestAdd(t *testing.T) {
	exp := 5

	res := Add(2, 3)
	
	if res != exp {
		t.Fatalf("got=%d, want=%d", res, exp)
	}
}
```


## Running tests

```shell
go test

go test ./...

# single test

# no cache
```


## Tricks


### Compare structs and slices

TODO reflect.DeepEqual


### Table driven tests

TODO


## Coverage

TODO


## Best practices

* mitchellh https://www.youtube.com/watch?v=8hQG7QlcLBk)


## Libraries

* https://github.com/stretchr/testify
