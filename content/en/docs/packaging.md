---
title: Packaging
weight: 800
---


## Basics

Go binaries are statically linked. That means all dependencies are included within the binary.

```bash
go build main.go
```

The binary will only work on the same platform that built it (e.g. 64bit Linux). Go allows us to easily generate binaries compatible with other architectures:

```bash
GOOS=linux GOARCH=arm64 go build main.go
GOOS=windows GOARCH=amd64 go build main.go
```


## Docker

The `Dockerfile` uses [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/) so that the resulting image is small and secure. The image is built with the full [Golang Docker image](https://hub.docker.com/_/golang) and the resulting binary is copied into the [Distroless image](https://github.com/GoogleContainerTools/distroless).

```dockerfile
FROM golang:1.17 AS build
WORKDIR /src
# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
# Build the executable
RUN CGO_ENABLED=0 go build -o /app ./main.go

FROM gcr.io/distroless/static
USER nonroot:nonroot
# Copy compiled app
COPY --from=build --chown=nonroot:nonroot /app /app
ENTRYPOINT ["/app"]
```

You might also see images online that are built with [scratch](https://hub.docker.com/_/scratch/). Scratch is a Docker image that contains absolutely nothing by default. We recommend using Distroless, because it already includes things like timezone data, user support and root certificates. The image is used by popular projects like [Kubernetes](https://github.com/kubernetes/enhancements/blob/master/keps/sig-release/1729-rebase-images-to-distroless/README.md#background).


## Quality Control


### Go Vet

`go vet` starts where the compiler ends by identifying subtle issues in your code. It’s good at catching things where your code is technically valid but probably not working as intended.

```bash
go vet main.go
# test all files
go vet ./...
```

Unreachable code is an example of something `go vet` would find. The program compiles and run without errors.

```go {compareOutput=false}
package main

func main() {
    fmt.Println("Before return")
    return
    fmt.Println("After return")
}
<!--output-->
./main.go:8:2: unreachable code
```


### Linting

There are a few community tools that go even further and add many more checks:

* https://golangci-lint.run/
* https://staticcheck.io/


### Testing

We already covered testing in chapter {{<link "testing">}}. Tests are important to ensure everything works.

Race conditions can occur when two pieces of code run concurrently. They are usually hard to debug and cause mysterious failures. To find race conditions Go offers a handy `-race` flag, which can be added to any Go command:

```bash
go test -race mypkg    # test the package
go run -race mysrc.go  # compile and run the program
go build -race mycmd   # build the command
go install -race mypkg # install the package
```


## Versioning

Go packages follow [Semantic Versioning](https://semver.org/).

Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards compatible manner, and
3. PATCH version when you make backwards compatible bug fixes.

Public Go packages should be [backwards compatible](https://github.com/golang/go/wiki/Modules#semantic-import-versioning).


## Releasing

TODO
https://goreleaser.com/


## Github Actions

TODO
