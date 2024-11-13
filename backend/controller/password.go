package controller

import (
	"net/http"
	"pi4/service"
	"pi4/utils"

	"github.com/labstack/echo/v4"
)

func SavePassword(c echo.Context) error {
	operator := c.QueryParam("op")
	passwordType := c.QueryParam("type")
	if passwordType == "" || operator == "" {
		return utils.ResponseError(c, http.StatusInternalServerError, "Erro ao obter paremetros")
	}
	if operator != "add" && operator != "sub" {
		return utils.ResponseError(c, http.StatusInternalServerError, "Paremetro op tem que ser 'add' ou 'sub'")
	}
	if passwordType != "P" && passwordType != "N" {
		if operator != "add" && operator != "sub" {
			return utils.ResponseError(c, http.StatusInternalServerError, "Paremetro type tem que ser 'P' ou 'N'")
		}
	}
	savedPassword, err := service.SavePassword(operator, passwordType)
	if err != nil {
		return utils.ResponseError(c, http.StatusInternalServerError, "Erro ao salvar a senha: "+err.Error())
	}

	// service.SendMessage("password", "ping")

	return c.JSON(http.StatusCreated, savedPassword)
}

func GetAllPassword(c echo.Context) error {
	passwords, err := service.GetAllPassword()
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Error ao buscar todas as senhas")
	}
	return c.JSON(http.StatusOK, passwords)
}

func GetFivePassword(c echo.Context) error {
	passwords, err := service.GetFivePassword()
	if err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Error ao buscar todas as senhas")
	}
	return c.JSON(http.StatusOK, passwords)
}

func GetCurrentPasswordHandler(c echo.Context) error {
	currentPassword, err := service.GetCurrentPassword()
	if err != nil {
		return utils.ResponseError(c, http.StatusInternalServerError, "Erro ao buscar a senha atual: "+err.Error())
	}

	return c.JSON(http.StatusOK, currentPassword)
}

func ResetPasswords(c echo.Context) error {
	if err := service.ResetPassword(); err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Erro ao resetar senhas")
	}
	return c.JSON(http.StatusOK, nil)
}
