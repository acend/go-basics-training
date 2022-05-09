---
title: "HTTP Server"
weight: 9250
---


## Part 1: Ping and Logger


### Tasks

1. Run a server and implement a handler which returns `pong` on the endpoint `/ping`.
2. Create a middleware to log every request. Log the path, method, duration and the IP of the client of the request.

Your log should look similar to this:
```
2022/04/11 10:03:08 remote=192.168.1.143 path=/foo method=GET duration=13.765874ms
```


### Tips

See {{<link "http-server" >}}.

{{%details title="Standard library packages"%}}

* Consider using the [log](https://pkg.go.dev/log) package from the standard library
* You can measure time using the [time](https://pkg.go.dev/time) package:

{{%/details%}}

{{%details title="Measure duration"%}}
```golang
start := time.Now()

// perform action

duration := time.Now().Sub(start)
```
{{%/details%}}


## Part 2: User API


### Tasks

Create a JSON REST API where you can create, list and delete users.

The API should provide the following endpoints:

* `POST /user`: create a user
* `GET /user`: returns all users
* `GET /user/<ID>`: returns a single user by ID
* `DELETE /user/<ID>`: delete user by ID

The user should look like this:
```
{
    "name": "john",
    "full_name": "John Doe",
    "followers": 13
}
```

You can decide how you would like to store the users. One option would be to store them only in-memory for example in a map `map[int]User`. Another option would be to store serialize the users into a file (e.g. with JSON).


### Tips

See {{<link "http-server" >}}.


## Part 3: User API Client


### Tasks

Create CLI tool to list, create and delete users:

```bash
# create user
./usercli create bob
./usercli create bob "Bob Meier"
./usercli create bob "Bob Meier" 34

# list all users
./usercli get 

# show specific user
./usercli get bob

# delete user
./usercli delete bob
```


### Tips

Take a look at the [github-info-client](https://github.com/acend/go-basics-training-examples/tree/master/github-info-client) example to get an idea on how to implement this.


## Solutions

* Part 1: Ping and Log Middleware: https://github.com/acend/go-basics-training-examples/tree/master/http-server
* Part 2 + 3: User API: https://github.com/acend/go-basics-training-examples/tree/master/user-api
