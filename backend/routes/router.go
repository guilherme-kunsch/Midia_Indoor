package routes

import (
	"pi4/controller"

	"github.com/labstack/echo/v4"
)

func AddRoutes(e *echo.Echo) {
	e.GET("/", controller.Healthchecker)
	e.POST("/upload", controller.Upload)
}
