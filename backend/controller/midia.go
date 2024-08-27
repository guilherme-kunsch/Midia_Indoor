package controller

import (
	"net/http"
	"path/filepath"
	"pi4/models"
	"pi4/service"
	"pi4/utils"
	"strings"

	"github.com/gosimple/slug"
	"github.com/labstack/echo/v4"
)

func Upload(c echo.Context) error {
	file, err := c.FormFile("file")
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	if file == nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Arquivo não pode ser nulo")
	}
	openedFile, err := file.Open()
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	fileHash := utils.NewId()
	fileExtension := filepath.Ext(file.Filename)
	fileOldName := strings.Split(file.Filename, ".")[0]
	fileName := slug.Make(fileOldName) + "_" + fileHash + fileExtension
	if err := service.UploadFile(fileName, openedFile); err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	url := "https://pi4.fly.storage.tigris.dev/" + fileName
	midia := models.Midias{ID: fileHash, FileName: fileName, FileOriginalName: file.Filename, FileUrl: url}
	midia, err = service.SaveMidia(midia)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, midia)
}

func ListMidias(c echo.Context) error {
	midias, err := service.ListMidias()
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, midias)
}

func GetMidia(c echo.Context) error {
	id := c.Param("id")
	midia, err := service.GetMidia(id)
	if err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "midia não encontrada")
	}
	return c.JSON(http.StatusOK, midia)
}

func GetFile(c echo.Context) error {
	id := c.Param("id")
	midia, err := service.GetMidia(id)
	if err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "midia não encontrada")
	}
	file, err := service.GetFile(midia.FileName)
	if err != nil {
		return utils.ResponseError(c, http.StatusNotFound, "error ao baixar arquivo")
	}
	return c.Blob(http.StatusOK, "", file)
}
