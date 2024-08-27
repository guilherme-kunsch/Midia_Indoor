package main

import (
	"pi4/server"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	server := server.New(server.WithPort(8080))
	server.Start()
}
