---
title: Concurrency
weight: 600
---


## Goroutines

To run multiple functions concurrently we can start Goroutines.
You can think of a Goroutine as a lightweight thread managed by the Go runtime.

```golang
package main

import "fmt"

func print(word string) {
	for i := 0; i < 5; i++ {
		fmt.Println(word)
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	go print("hello")
	print("world")
}
<!--output-->
world
hello
world
hello
hello
world
world
hello
hello
world
```

When the main function returns, the program exits. It does not wait for other (non-main) goroutines to complete.
If we would run both invocations of print in a goroutine the program would most likely not output anything at all, because it would be terminated before the goroutines are started.
```golang
	go print("hello")
	go print("world")
```
{{% alert title="Note" color="primary" %}}
Be aware that all goroutines run in the same address space. So if two goroutines want to modify the same variable the access must be synchronized.
{{% /alert %}}

To synchronize goroutines we can use channels or the primitives from the [sync](https://pkg.go.dev/sync) package.


## Package sync


### sync.WaitGroup

With [sync.WaitGroup](https://pkg.go.dev/sync#WaitGroup) we can wait for a collection of goroutines to finish.
The following example downloads multiple URLs concurrently:
```golang {compareOutput=false}
package main

import (
	"net/http"
	"io"
	"os"
)

func main() {
	urls := []string{
		"https://google.com",
		"https://golang.org",
		"https://pkg.go.dev",
	}

	results := make([][]byte, len(urls))

	wg := &sync.WaitGroup{}

	for i, url := range urls {
		// we add one for each go routine
		wg.Add(1)
		go func(i int, url string) {
			// wg.Done() will decrease the couner of the WaitGroup by one
			defer wg.Done()

			resp, err := http.Get(url)
			if err != nil {
				return
			}

			results[i], _ = io.ReadAll(resp.Body)
		}(i, url)
	}

	// wait until the WaitGroup counter becomes zero
	wg.Wait()

	for i, result := range results {
		fmt.Printf("%s, size=%d", urls[i], len(result))
	}
}
<!--output-->
https://google.com, size=0https://golang.org, size=0https://pkg.go.dev, size=0
```


### sync.Mutex

In the following example we increase a counter from from ten goroutines 100 times.
Since all goroutines modify the same variable (`counter`) we have to synchronize the access.
For this we can use [sync.Mutex](https://pkg.go.dev/sync#Mutex) which provides us a mutual exclusion lock.

```
package main

import (
	"fmt"
	"sync"
)

func main() {
	counter := 0

	wg := &sync.WaitGroup{}
	mu := &sync.Mutex{}

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			for j := 0; j < 100; j++ {
				mu.Lock()
				counter++
				mu.Unlock()
			}
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Println(counter)
}
```
If you would remove the lock in the example above, in most of the cases the programm would not print `10000` becuase the access to `counter` is no synchronized.


## Channels

A unique language feature of Go are channels. Channels allow you the pass data between goroutines in a concurrent-safe way. They are often used as a concurrency synchronization technique.
You can think of a channel as a typed message queue. A producer can write data of a certain type into it (e.g. `int`) and a consumer can read from the channel.

We use the builtin function `make` to create a new channel. The following example creates a channel for numbers (`int`):
```golang
ch := make(chan int)
```

Then we can send values to and read values from the channel: the channel:

| Operation | Code | Description |
| - | - | - |
| **Send to channel** |  `ch <- 4` | Send the value `4` to the channel. |
| **Read from channel** |  `myInt := <-ch` | Read a value from the channel and assign it to `myInt`. |

Send and read operations on a channel are blocking. So we always need a goroutine on the other end which will send or read.

```golang
package main

import "fmt"

func main() {
	ch := make(chan int)

	// we send the channel within a goroutine. otherwise the program would block here.
	go func() { ch <- 4 }()

	// read from the channel
	myInt := <-ch
	fmt.Println(myInt)
}
<!--output-->
4
```


### Buffered Channels

We can initialize a buffered channel if we pass an additional parameter to make:
```golang
ch := make(chan int, 10)
```

This way a send will only block if the buffer is full. In the following example we don't need a goroutine to send the value, because the first two values we write go into the buffer.
```golang
package main

import "fmt"

func main() {
	// initialize an int channel with a buffer size of 2
	ch := make(chan int, 2)

	// send does not block and values go into buffer
	ch <- 1
	ch <- 2

	// read values from channel
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
<!--output-->
1
2
```


### close and for-range

With the builtin function `close` a producer can close a channel to signal the consumers that no more data will be sent.
Consumers can use `range` to read values from a channel until it is closed.
```golang
package main

import "fmt"

func main() {
	ch := make(chan int)

	// start producer
	go func() {
		for i := 0; i < 10; i++ {
			// send to channel
			ch <- i
		}
		// close the channel. this will break the for loop below
		close(ch)
	}()

	// read from channel
	for item := range ch {
		fmt.Println(item)
	}
}
<!--output-->
0
1
2
3
4
5
6
7
8
9
```


### select

With `select` we can wait on multiple read or write operations on channels. A select blocks until one of the operations could be performed.

In the following example we have a calculation function which takes a long time. In the select block we wait on the result of the calculation function. Another select arm runs [time.After](https://pkg.go.dev/time#After) with a timeout. The `time.After` function returns a channel on which a value is sent after the time has elapsed. This way we either get back the result from the calculation or we run into the timeout. You can change the timeout value to see how the behavoiur changes:
```golang
package main

import (
	"fmt"
	"time"
)

func calculation(input int, result chan int) {
	// expensive calculation
	time.Sleep(time.Second * 2)
	output := input + 42

	result <- output
}

func main() {
	result := make(chan int)
	timeout := time.Second * 1

	go calculation(13, result)

	// wait on result or timeout
	select {
	case v := <-result:
		fmt.Printf("result %d\n", v)
	case <-time.After(timeout):
		fmt.Println("calculation timed out")
	}
}
<!--output-->
calculation timed out
```

Further we can define a default action which is executed if all channels in the select are blocked. This allows us to implement a non blocking read or write on a channel.
```golang
package main

import "fmt"

func nonBlockingRead(ch chan int) {
	select {
	case v := <-ch:
		fmt.Println(v)
	default:
		fmt.Println("blocked")
	}
}

func main() {
	ch := make(chan int, 1)

	// prints blocked becuase there is nothing to read
	nonBlockingRead(ch)

	ch <- 42

	// prints 42
	nonBlockingRead(ch)
}
<!--output-->
blocked
42
```


### Channel as Semaphore

In the following example we use a buffered channel as a sempahore to limit the number of functions which run concurrently:
```golang
package main

import (
	"fmt"
	"sync"
	"time"
)

func calc(input int) {
	fmt.Printf("start calculation for %d\n", input)
	time.Sleep(time.Second * 2)
	fmt.Printf("calculation for %d finished\n", input)
}

func main() {
	wg := &sync.WaitGroup{}
	semaphore := make(chan struct{}, 3)
	workItems := []int{1, 2, 3, 4, 5}

	for _, workItem := range workItems {
		wg.Add(1)
		semaphore <- struct{}{}
		go func(workItem int) {
			defer wg.Done()
			calc(workItem)
			<-semaphore
		}(workItem)
	}
	wg.Wait()
}
<!--output-->
start calculation for 3
start calculation for 2
start calculation for 1
calculation for 1 finished
start calculation for 4
calculation for 2 finished
start calculation for 5
calculation for 3 finished
calculation for 5 finished
calculation for 4 finished
```
