---
title: "HTTP Server"
weight: 9250
---


## General

1. Run a server and implement a handler which returns `pong` on the endpoint `/ping`.
2. Create a middleware to log every request. Log the path, method, duration and the IP of the client of the request.

Your log should look similar to this:
```
2022/04/11 10:03:08 remote=192.168.1.143 path=/foo method=GET duration=13.765874ms
```

Tips:

* Consider using the [log](https://pkg.go.dev/log) package from the standard library
* You can measure time using the [time](https://pkg.go.dev/time) package:

```golang
start := time.Now()

// time consuming action

duration := time.Now().Sub(start)
```


## User API

* Create a JSON REST-like API where you can create, list, get and delete users.

The API should provide the following endpoints:

* `POST /user`: create a user
* `GET /user`: returns all users
* `GET /user/<ID>`: returns a single user by ID
* `DELETE /user/<ID>`: delete user by ID

The user should look at least like this:
```
{
    "name": "john",
    "full_name": "John Doe",
    "followers": 13
}
```

You can decide how you would like to store the users. One option would be to store them only in memory for example in a map `map[int]User`. Another option would be to store serialize the users into a file (e.g. with JSON).

* Create the appropriate client implementation to create users

For this you could write a CLI tool which takes the username as argument and the full name and the followers as option:

```
./usercli alice
./usercli bob -full "Bob Miller" -followers 34
```

* Add HTTP basic authentication to the whole user API

You can do this best if you wrap the API handlers in a appropriate middleware. For the authentication you can use a static username password pair like `admin` and `secret`. You can also try to make them configurable using flags or environment variables.

* Implement a fallback machanism on the get user by id endpoint (`GET /user/<ID>`) if a user does not exist. In that case try to fetch the user from a third party source like Github, Gitlab. If the users does exist there save it into your internal store and return that user.

