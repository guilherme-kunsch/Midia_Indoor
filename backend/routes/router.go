package routes

import (
	"net/http"
	"pi4/controller"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func AddRoutes(e *echo.Echo) {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"*"},
		AllowCredentials: true,
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		MaxAge:           86400,
		Skipper: func(c echo.Context) bool {
			return c.Request().Method == http.MethodOptions
		},
	}))
	e.GET("/", controller.Healthchecker)
	midia := e.Group("/midia")
	{
		midia.POST("/upload", controller.Upload)
		midia.GET("/:id", controller.GetMidia)
		midia.GET("", controller.GetMidias)
		midia.DELETE("/:id", controller.DeleteMidia)
	}
}
