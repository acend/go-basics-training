---
title: Testing
weight: 400
sources:
- https://dave.cheney.net/2013/06/30/how-to-write-benchmarks-in-go
---


## Writing Tests

Tests are defined as functions in the following form:

```go
func TestXxx(t *testing.T)
```

The tests reside in the same directory as the source code. The test files end with `_test.go`. The code in these files is not compiled into the binary when building the project. For demonstration purposes we put the function and test in the same code block. These are usually in a different file (e.g. `calculator.go` and `calculator_test.go`).

```go
package main
import "testing"

func Add(a, b int) int {
    return a + b
}

func TestAdd(t *testing.T) {
	expected := 5

	got := Add(2, 3)

	if got != expected {
		t.Fatalf("expected %d, got %d", expected, got)
	}
}
<!--output-->
=== RUN   TestAdd
--- PASS: TestAdd (0.00s)
PASS
```


## Test failures

There are two methods to output test failures:

* `t.Error` prints the error without stopping the current test
* `t.Fatal` aborts the current test

Both variants also support template strings by appending `f`:

```go
if got != expected {
    t.Fatalf("Wrong output returned. Got: %v Expected: %v", got, expected)
}
```

Try and be explicit with your error messages. It should be clear:

* What is being tested
* What was received
* What was expected


## Running tests

```shell
# Run all tests in the currenty directory
go test

# Run all tests in the current directory and all subdirectories
go test ./...

# Run a single test
go test -run TestAdd

# Clean the cache, so that all tests are rerun
go clean -testcache
```


## Compare structs and slices

It should be noted that comparing structs with `==` only works for simple cases. As soon as the struct contains pointers or slices a different method has to be used. There are two variants:

* [reflect.DeepEqual](https://pkg.go.dev/reflect#DeepEqual) is older and in the standard library. However it has less features (e.g. no `Diff` function) and cannot compare things like `time` in different time zones.
* [go-cmp](https://pkg.go.dev/github.com/google/go-cmp/cmp) is a new library that makes comparing and printing the output easy. It should only be used for tests and never in production code. We recommend using this library.

```go
package main

import (
  "fmt"
  "github.com/google/go-cmp/cmp"
  "reflect"
  "testing"
)

func TestEqual(t *testing.T) {
    type Role struct {
        Name string
    }
	type User struct {
		Name string
        Role *Role
	}
    user1 := User{Name: "Andrea"}
    user2 := User{Name: "Andrea"}
	fmt.Println("Compare simple struct:", user1 == user2)

    user1.Role = &Role{"admin"}
    user2.Role = &Role{"admin"}
	fmt.Println("Compare struct with pointer", user1 == user2)
	fmt.Println("Compare complex structs with reflect", reflect.DeepEqual(user1, user2))
	fmt.Println("Compare complex structs with go-cmp", cmp.Equal(user1, user2))

    user2.Role = &Role{"user"}
    fmt.Print("Diff of two structs with go-cmp", cmp.Diff(user1, user2))
}
<!--output-->
=== RUN   TestEqual
Compare simple struct: true
Compare struct with pointer false
Compare complex structs with reflect true
Compare complex structs with go-cmp true
Diff of two structs with go-cmp  main.User{
  	Name: "Andrea",
- 	Role: &main.Role{Name: "admin"},
+ 	Role: &main.Role{Name: "user"},
  }
--- PASS: TestEqual (0.00s)
PASS
```


## Table driven tests

Instead of writing many small tests, we prefer to group tests that test a single function. This is achieved by putting all the test cases in a single "table". The table contains input and expected output. We then loop over the table and check if the function returns the expected output.

```go
package main
import "testing"

func Add(a, b int) int {
    return a + b
}

func TestAdd(t *testing.T) {
    // Define a struct
    type TestCase struct {
        arg1 int
        arg2 int
        expected int
    }
    // Define the different inputs and expected outputs
    cases := []TestCase{
        TestCase{
            arg1: 2,
            arg2: 3,
            expected: 5,
        },
        TestCase{
            arg1: 20,
            arg2: 30,
            expected: 50,
        },
        TestCase{
            arg1: 2,
            arg2: -3,
            expected: -1,
        },
    }
    // Loop through the test cases
	for _, tc := range cases {
		got := Add(tc.arg1, tc.arg2)
		if got != tc.expected {
			t.Errorf("Add(%d, %d): expected %d, got %d", tc.arg1, tc.arg2, tc.expected, got)
		}
	}
}
<!--output-->
=== RUN   TestAdd
--- PASS: TestAdd (0.00s)
PASS
```


## Subtests

A single test can be run with `go test -run TestAdd`. However with table driven tests, we cannot run a single test case from the table. The `testing` package allows us to `Run` another test within our test. The format is:

```go
t.Run("test name", func(t *testing.T) {
    // The test comes here
})
```

```go
package main
import "testing"

func Add(a, b int) int {
    return a + b
}

func TestAdd(t *testing.T) {
    t.Run("Add(2,3)", func(t *testing.T) {
	    expected := 5

	    got := Add(2, 3)

	    if got != expected {
	    	t.Fatalf("expected %d, got %d", expected, got)
	    }
    })
    t.Run("Add(2,-3)", func(t *testing.T) {
	    expected := -1

	    got := Add(2, -3)

	    if got != expected {
	    	t.Fatalf("expected %d, got %d", expected, got)
	    }
    })
}
<!--output-->
=== RUN   TestAdd
=== RUN   TestAdd/Add(2,3)
=== RUN   TestAdd/Add(2,-3)
--- PASS: TestAdd (0.00s)
    --- PASS: TestAdd/Add(2,3) (0.00s)
    --- PASS: TestAdd/Add(2,-3) (0.00s)
PASS
```

Now a single test can be run:

```bash
go test -v -run 'TestAdd/Add\(2,3\)'
```

We need to escape the parentheses, because the value is interpreted as a regex. The `-v` flag makes the command output more verbose.


## {{%task%}} Table driven tests with subtests

Subtests are normally used for table driven tests. Try rewriting the above example of table driven tests to use subtests. Add a field `name` to the `TestCase` struct and use it for the subtest name.

TODO: add solution


## Coverage

The test coverage tells us how much of our code is tested.

```bash
go test -cover
```

To see exactly which lines are not tested, run the following:

```bash
# Generates coverage report
go test -coverprofile=coverage.out
# Opens browser with detailed report
go tool cover -html=coverage.out
```


## {{%task%}} Coverage

Lets see what happens if we change our `Add` function and generate a new coverage report:

```go
func Add(a, b int) int {
    if a > 50 {
        return 50
    }
    return a + b
}
```

After adding a test case for `a > 50` the coverage should be 100% again.


## Benchmarks

To test the performance of function we can write benchmarks. These are also placed in the `_test.go` files and follow the format:

```go
func BenchmarkXxx(b *testing.B) {
    for n := 0; n < b.N; n++ {
        // Call a function here
    }
}
```

The code under test must be executed `b.N` times.
