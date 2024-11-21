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
	e.GET("/", controller.Healthchecker)
	e.GET("/html/:id", controller.GetHtmlContent)
	midia := e.Group("/midia")
	{
		midia.GET("/file/:name", controller.GetFile)
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
	password := e.Group("/password")
	{
		password.GET("", controller.GetAllPassword)
		password.POST("", controller.SavePassword)
		password.GET("/cinco", controller.GetFivePassword)
		password.GET("/atual", controller.GetCurrentPasswordHandler)
		password.DELETE("/reset", controller.ResetPasswords)
	}
}
