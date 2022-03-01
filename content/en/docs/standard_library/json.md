---
title: encoding/json
weight: 520
source:
- https://go.dev/blog/json
---


## Encoding

Go allows us to encode structs by using [json.Marshal](https://pkg.go.dev/encoding/json#Marshal). We can add annotations to the struct if we want to change the field names.

{{<go-playground>}}
package main

func main() {
    type Message struct {
        Name string
        Body string
        Time int64 `json:"unix_time"`
    }
    m := Message{
        Name: "Alice",
        Body: "Hello",
        Time: 1294706395881547000,
    }
    res, err := json.Marshal(m)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%s\n", res)
}
<!--output-->
{"Name":"Alice","Body":"Hello","unix_time":1294706395881547000}
{{</go-playground>}}


## Decoding

Decoding works similiarly with the [json.Unmarshal](https://pkg.go.dev/encoding/json#Unmarshal) function. In addition to the JSON string (as a byte slice) we also pass a pointer to the struct itself. Since we use a pointer the struct can be modified directly and is not returned by `Unmarshal`.

Byte slices are often used for performance reasons. Most functions in the standard library (e.g. reading files) return byte slices.

The backticks around the json string help us pass quotes without escaping them. Otherwise we would have to escape every quote (`"\"Name\" ... "`).

{{<go-playground>}}
package main

func main() {
    type Message struct {
        Name string
        Body string
        Time int64 `json:"unix_time"`
    }
    m := Message{}
    data := []byte(`{"Name":"Alice","Body":"Hello","unix_time":1294706395881547000}`)
    err := json.Unmarshal(data, &m)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(m)
    // Also print struct field names
    fmt.Printf("%+v\n", m)
}
<!--output-->
{Alice Hello 1294706395881547000}
{Name:Alice Body:Hello Time:1294706395881547000}
{{</go-playground>}}


## {{%task%}} Decode API response

Lets use the [Swiss public transport API](https://transport.opendata.ch/) to get the next departures of a specific station.

{{<go-playground>}}
package main

type APIResponse struct {
	Station      Station
	Stationboard []Journey
}
type Station struct {
	Name string
}
type Journey struct {
	To   string
	Stop Stop
}
type Stop struct {
	Delay     int
	Departure string
}

func main() {
	resp, err := http.Get("http://transport.opendata.ch/v1/stationboard?station=Monbijou&limit=3")
	if err != nil {
		log.Fatalln(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	b := APIResponse{}
	err = json.Unmarshal(body, &b)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Printf("%+v\n", b)
}
<!--output-->
2009/11/10 23:00:00 Get "http://transport.opendata.ch/v1/stationboard?station=Monbijou&limit=3": dial tcp: lookup transport.opendata.ch on 169.254.169.254:53: dial udp 169.254.169.254:53: connect: no route to host
{{</go-playground>}}
