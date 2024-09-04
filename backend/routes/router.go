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
		AllowCredentials: false,
		AllowMethods:     []string{http.MethodDelete, http.MethodGet, http.MethodPost, http.MethodPatch},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		MaxAge:           86400,
	}))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.GET("/", controller.Healthchecker)
	midia := e.Group("/midia")
	{
		midia.POST("/upload", controller.Upload)
		midia.POST("/upload/html", controller.UploadHtmlContent)
		midia.GET("/:id", controller.GetMidia)
		midia.GET("", controller.GetMidias)
		midia.DELETE("/:id", controller.DeleteMidia)
	}
	playlist := e.Group("/playlist")
	{
		playlist.POST("", controller.CreatePlaylist)
		playlist.GET("/:id", controller.GetPlaylist)
		playlist.GET("", controller.GetPlaylists)
		playlist.PATCH("/:id", controller.UpdatePlaylist)
		playlist.DELETE("/:id", controller.DeletePlaylist)
	}
	device := e.Group("/device")
	{
		device.POST("", controller.SaveDevice)
		device.GET("/:id", controller.GetDevice)
		device.GET("", controller.GetAllDevices)
		device.PATCH("/:id", controller.UpdateDevice)
		device.DELETE("/:id", controller.DeleteDevice)
	}
	play := e.Group("/play")
	{
		play.GET("/:id", controller.PlayContent)
	}
}
