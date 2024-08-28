package server

import (
	"fmt"
	"pi4/routes"

	"github.com/labstack/echo/v4"
)

type (
	ServerOptions func(*App)
	App           struct {
		echo *echo.Echo
		port int
	}
)

func WithPort(port int) ServerOptions {
	return func(a *App) {
		a.port = port
	}
}

func New(options ...ServerOptions) *App {
	app := &App{echo: echo.New()}
	for _, opt := range options {
		opt(app)
	}
	return app
}

func (a *App) Start() {
	routes.AddRoutes(a.echo)
	port := fmt.Sprintf(":%d", a.port)
	a.echo.Logger.Fatal(a.echo.Start(port))
}
