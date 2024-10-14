package main

import (
	"fmt"
	"pi4/server"

	"github.com/joho/godotenv"
)

func init() {
}

func main() {
	if err := godotenv.Load(".env"); err != nil {
		fmt.Println(err)
	}
	server := server.New(server.WithPort(8080))
	server.Start()
}
