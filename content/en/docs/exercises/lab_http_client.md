---
title: "HTTP Client"
weight: 9200
---

## Overview

We will write a small CLI tool that gets the follower count and the full name of a specific Github user.

Information about a Github user we can obtain from the Github REST API under `https://api.github.com/users/<user>`.
Besides many other information a call to https://api.github.com/users/mitchellh returns the following information:
```
{
  "login": "mitchellh",
  ...
  "name": "Mitchell Hashimoto",
  ...
  "followers": 9973,
  ...
}
```

The Github API limits the number of unauthenticated requests per IP to 60 per hour. So it is likely that you get a HTTP response code of 429 (Too Many Requests) and no answer.

To send more requests from one IP you have to [generate a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)(you don't have to select any permission/scope) and send it as part of the `Authorization` header:
```
Authorization: Bearer <your token>
```


## Tasks

1. Create CLI tool `github-info` which takes a username as argument and prints the users full name and the number of followers.
2. Read the personal access token from the environment variable `GITHUB_TOKEN` and send it with the API request.
3. Github returns info about the ratelimiting in the HTTP headers of the response. Add an option `-debug` which shows the number of remaining requests (header `x-ratelimit-remaining`).

The result should look similar to this:
```
$ ./github-info mitchellh
name: Mitchell Hashimoto
followers: 9973
```

After task 3 with debug flag:
```
$ ./github-info -debug mitchellh
remaining requests: 48
name: Mitchell Hashimoto
followers: 9973
```


## Tips

Check out the examples in {{<link "http-client" >}} and {{<link "json" >}}.

{{%details title="Standard library packages"%}}

* To get arguments from the command line see [os](https://pkg.go.dev/os) or [flag](https://pkg.go.dev/flag)
* [net/http](https://pkg.go.dev/net/http)
  * Especially take a look at [http.Response](https://pkg.go.dev/net/http#Response) because we have to check the HTTP status code and read information from the response headers.
* [encoding/json](https://pkg.go.dev/encoding/json)

{{%/details%}}

{{%details title="Parse flags and arguments"%}}

```golang
debug := false

flag.BoolVar(&debug, "debug", debug, "show additional information about rate limiting")

flag.Parse()

if flag.NArg() < 1 {
	// missing arugments
}

userName := flag.Arg(0)
```

{{%/details%}}


## Solution

https://github.com/acend/go-basics-training-examples/tree/master/http-client
