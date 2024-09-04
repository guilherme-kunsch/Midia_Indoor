package controller

import (
	"net/http"
	"pi4/models"
	"pi4/service"
	"pi4/utils"

	"github.com/labstack/echo/v4"
)

//	func PlayContent(c echo.Context) error {
//		id := c.Param("id")
//		device, err := service.GetDevice(id)
//		if err != nil {
//			return utils.ResponseError(c, http.StatusBadRequest, err.Error())
//		}
//		playlist, err := service.GetPlaylist(device.PlaylistID)
//		if err != nil {
//			return utils.ResponseError(c, http.StatusBadRequest, err.Error())
//		}
//		var contents []models.Midia
//		for _, content := range playlist.Midias {
//			midia, _ := service.GetMidia(content.MidiaID)
//			contents = append(contents, midia)
//		}
//		websocket.Handler(func(ws *websocket.Conn) {
//			defer ws.Close()
//			for {
//				err := websocket.Message.Send(ws, "Hello cliente")
//				if err != nil {
//					c.Logger().Error(err)
//				}
//			}
//		}).ServeHTTP(c.Response(), c.Request())
//		return nil
//	}
func PlayContent(c echo.Context) error {
	id := c.Param("id")
	device, err := service.GetDevice(id)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	playlist, err := service.GetPlaylist(device.PlaylistID)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	var contents []models.Midia
	for _, content := range playlist.Midias {
		midia, _ := service.GetMidia(content.MidiaID)
		contents = append(contents, midia)
	}
	return c.JSON(http.StatusOK, contents)
}
