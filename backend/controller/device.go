package controller

import (
	"net/http"
	"pi4/models"
	"pi4/service"
	"pi4/utils"

	"github.com/labstack/echo/v4"
)

func SaveDevice(c echo.Context) error {
	var body models.Device
	if err := c.Bind(&body); err != nil {
		return utils.ResponseError(c, http.StatusUnprocessableEntity, err.Error())
	}
	if body.PlaylistID != "" {
		playlist, _ := service.GetPlaylist(body.PlaylistID)
		if playlist.ID == "" {
			return utils.ResponseError(c, http.StatusNotFound, "Playlist não encontrada")
		}
	}
	device, err := service.SaveDevice(body)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Error ao salvar dispositivo")
	}
	return c.JSON(http.StatusOK, device)
}

func GetDevice(c echo.Context) error {
	id := c.Param("id")
	device, err := service.GetDevice(id)
	if err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "Dispositivo não encontrado")
	}
	return c.JSON(http.StatusOK, device)
}

func GetAllDevices(c echo.Context) error {
	devices, err := service.GetAllDevices()
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Error ao buscar todos os dispositivos")
	}
	return c.JSON(http.StatusOK, devices)
}

func UpdateDevice(c echo.Context) error {
	id := c.Param("id")
	var body models.Device
	if err := c.Bind(&body); err != nil {
		return utils.ResponseError(c, http.StatusUnprocessableEntity, err.Error())
	}
	if body.PlaylistID != "" {
		playlist, _ := service.GetPlaylist(body.PlaylistID)
		if playlist.ID == "" {
			return utils.ResponseError(c, http.StatusNotFound, "Playlist não encontrada")
		}
	}
	device, err := service.UpdateDevice(id, body)
	if err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "Dispositivo não encontrado")
	}
	return c.JSON(http.StatusOK, device)
}

func DeleteDevice(c echo.Context) error {
	id := c.Param("id")
	if err := service.DeleteDevice(id); err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "Dispositivo não encontrado")
	}
	return c.JSON(http.StatusOK, "Deletado com sucesso")
}
