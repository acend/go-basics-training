---
title: "HTTP Client"
weight: 9200
---

## Overview

We will write a small CLI tool that gets the amount of followers a specific Github user has.


## Tasks

1. Get `https://github.com/acend` and print the raw response to the terminal (standard output).
2. Do the same request and save it to a file `index.html`.
3. Create CLI tool `github-info` which takes a username as argument and prints the users full name and the number of followers
    * Use [os.Args](https://pkg.go.dev/os#pkg-variables) to access the arguments
    * You can fetch users from `https://api.github.com/users/<user>`
    * If you run `./github-info mitchellh` the output should be something like `Mitchell Hashimoto has XXX followers`
4. The Github API limits the number of unauthenticated requests per IP to 60 per hour. Read the Github Token from the environment variable `GITHUB_TOKEN` and send the token with every request.
    * See [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) on how to obtain a token. To authenticate your self you don't have to select any permission/scope.
5. Github returns info about the ratelimiting in the HTTP headers of the response. Add an option `-debug` which shows the number of remaining requests (header `x-ratelimit-remaining`).
    * Use [flag](https://pkg.go.dev/flag) to parse the flags
    * See [flag.Args](https://pkg.go.dev/flag#Args)


## Solution

https://github.com/acend/go-basics-training-examples/tree/master/http-client
