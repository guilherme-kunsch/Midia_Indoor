package controller

import (
	"net/http"
	"pi4/models"
	"pi4/service"
	"pi4/utils"

	"github.com/labstack/echo/v4"
)

func CreatePlaylist(c echo.Context) error {
	var body models.Playlist
	if err := c.Bind(&body); err != nil {
		return utils.ResponseError(c, http.StatusUnprocessableEntity, err.Error())
	}
	playlist, err := service.CreatePlaylist(body)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, playlist)
}

func GetPlaylist(c echo.Context) error {
	id := c.Param("id")
	playlist, err := service.GetPlaylist(id)
	if err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "Playlist não encontrada")
	}
	return c.JSON(http.StatusOK, playlist)
}

func GetPlaylists(c echo.Context) error {
	playlists, err := service.GetPlaylists()
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Error ao achar playlists")
	}
	return c.JSON(http.StatusOK, playlists)
}

func UpdatePlaylist(c echo.Context) error {
	id := c.Param("id")
	var body models.Playlist
	if err := c.Bind(&body); err != nil {
		return utils.ResponseError(c, http.StatusUnprocessableEntity, err.Error())
	}
	playlist, err := service.UpdatePlaylist(id, body)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Error ao encontrar playlist")
	}
	return c.JSON(http.StatusOK, playlist)
}

func DeletePlaylist(c echo.Context) error {
	id := c.Param("id")
	if err := service.DeletePlaylist(id); err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Error ao encontrar playlist")
	}
	return c.JSON(http.StatusNoContent, nil)
}
