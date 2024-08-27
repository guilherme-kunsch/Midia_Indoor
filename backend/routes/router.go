package routes

import (
	"pi4/controller"

	"github.com/labstack/echo/v4"
)

func AddRoutes(e *echo.Echo) {
	e.GET("/", controller.Healthchecker)
	midia := e.Group("/midia")
	{
		midia.POST("/upload", controller.Upload)
		midia.GET("", controller.ListMidias)
		midia.GET("/:id", controller.GetMidia)
		midia.GET("/file/:id", controller.GetFile)
	}
}
