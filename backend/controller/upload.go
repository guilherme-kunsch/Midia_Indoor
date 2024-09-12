package controller

import (
	"io"
	"net/http"
	"os"
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
	fileType := strings.Split(file.Header.Get("Content-Type"), "/")[0]
	fileHashName := utils.NewId()
	fileExtension := filepath.Ext(file.Filename)
	fileOldName := strings.Split(file.Filename, ".")[0]
	fileName := slug.Make(fileOldName) + "_" + fileHashName + fileExtension
	if err := service.UploadFile(fileName, openedFile); err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	url := os.Getenv("FILE_URL") + fileName
	midia := models.Midia{ID: fileHashName, FileName: fileName, FileUrl: url, FileOriginalName: fileOldName, FileType: fileType}
	midia, err = service.SaveMidia(midia)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "error ao salvar midia")
	}
	return c.JSON(http.StatusOK, midia)
}

func UploadHtmlContent(c echo.Context) error {
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
	fileHashName := utils.NewId()
	fileExtension := filepath.Ext(file.Filename)
	fileOldName := strings.Split(file.Filename, ".")[0]
	fileName := slug.Make(fileOldName) + "_" + fileHashName + fileExtension
	if err := service.UploadFile(fileName, openedFile); err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	url := "https://pi4.fly.storage.tigris.dev/" + fileName
	return c.JSON(http.StatusOK, map[string]string{"location": url})
}

func GetHtmlContent(c echo.Context) error {
	id := c.Param("id")
	midia, err := service.GetMidia(id)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	resp, err := http.Get(midia.FileUrl)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, err.Error())
	}
	return c.HTML(http.StatusOK, string(b))
}
