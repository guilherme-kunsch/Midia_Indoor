package controller

import (
	"net/http"
	"pi4/service"
	"pi4/utils"

	"github.com/labstack/echo/v4"
)

func GetMidia(c echo.Context) error {
	id := c.Param("id")
	midia, err := service.GetMidia(id)
	if err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "Midia não encontrada")
	}
	return c.JSON(http.StatusOK, midia)
}

func GetMidias(c echo.Context) error {
	midias, err := service.GetMidias()
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, midias)
}

func DeleteMidia(c echo.Context) error {
	id := c.Param("id")
	midia, err := service.GetMidia(id)
	if err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "midia não encontrada")
	}
	if service.DeleteFile(midia.FileName) != nil {
		return utils.ResponseError(c, http.StatusNotFound, "error ao deletar arquivo")
	}
	if service.DeleteMidia(id) != nil {
		return utils.ResponseError(c, http.StatusNotFound, "error ao deletar arquivo")
	}
	return c.String(http.StatusOK, "Midia deletada")
}
