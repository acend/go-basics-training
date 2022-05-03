---
title: "Exercise: Robot"
weight: 9150
---


## Overview

Imagine we have a robot which moves around on a coordinate system.
The robot starts at the position `0,0`.

For the robot we have a list of instructions in the following form:

```
right 3
up 1
left 5
right 4
down 2
up 2
```

Each line is one instruction. An instruction consists of a direction and a number which describes how far we move into this direction. After each instruction the robot is in a new position.

With the instructions from the example above we would do the following steps:

* The first instruction `right 3` moves the robot to the position `3,0`
* `up 1` moves the robot to the position `3,1`
* `left 5` -> `-2,1`
* `right 4` -> `2,1`
* `down 2` -> `2,-1`
* `up 2` -> `2,1`

In the example above we visited 6 positions (`3,0`, `3,1`, `-2,1`, `2,1`, `2,-1`, `2,1`).
The furthest distance to the left we visited was `-2`. The furthest distance to the right we visited was `3`.


## Tasks

Read all instructions from the file [input.txt](./input.txt) and perform the appropriate actions with the robot.

Answer the following questions:

1. What is the end position of the robot?
2. Which is the distance furthest to the left, which the robot visited?
3. Which is the distance furthest to the right, which the robot visited?
4. Which position did we visit most often?


## Tips

Try to solve the exercise only with the 6 example instructions first. Do not solve all tasks at once. Try to find the end position first and then try to extend your solution for the other tasks.

To read the file you can use [os.ReadFile](https://pkg.go.dev/os#ReadFile) which gives you the content of the whole file as a `[]byte`.
```golang
rawData, err := os.ReadFile(fileName)
if err != nil {
	return err
}
```

You can iterate over each line by splitting the whole content at newlines:
```golang
for _, line := range strings.Split(string(rawData), "\n") {
	// parse line into an instruction
}
```

The [strings](https://pkg.go.dev/strings) package does contain a lot of other useful functions to work with strings (eg. [strings.Cut](https://pkg.go.dev/strings#Cut) or [strings.Fields](https://pkg.go.dev/strings#Fields)).

You can convert a string into an integer using [strconv.Atoi](https://pkg.go.dev/strconv#Atoi) from the [strconv](https://pkg.go.dev/strconv) package.

You can represent directions (`up`, `right`, etc.) as integers:

```golang
const (
	UP    = 0
	RIGHT = 1
	DOWN  = 2
	LEFT  = 3
)
```

Keep related state together in a struct.

For example an instruction could look like this:

```golang
type Instruction struct {
	Direction int
	Distance  int
}
```

And a postion could look like this:
```golang
type Position struct {
	X int
	Y int
}

func (p *Position) Move(direction int, distance int) {
	// update coordinates accordingly
}
```
