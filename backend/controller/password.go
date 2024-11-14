package controller

import (
	"net/http"
	"pi4/models"
	"pi4/service"
	"pi4/utils"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
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
		return utils.ResponseError(c, http.StatusInternalServerError, "Paremetro type tem que ser 'P' ou 'N'")

	}
	savedPassword, err := service.SavePassword(operator, passwordType)
	if err != nil {
		return utils.ResponseError(c, http.StatusInternalServerError, "Erro ao salvar a senha: "+err.Error())
	}

	service.SendMessage("password", "ping")

	return c.JSON(http.StatusCreated, savedPassword)
}

func GetAllPassword(c echo.Context) error {
	passwordType := c.QueryParam("type")
	if passwordType == "" {
		return utils.ResponseError(c, http.StatusInternalServerError, "Erro ao obter paremetros")
	}
	if passwordType != "P" && passwordType != "N" {
		return utils.ResponseError(c, http.StatusInternalServerError, "Paremetro type tem que ser 'P' ou 'N'")
	}
	passwords, err := service.GetAllPassword(passwordType)
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
	passwordType := c.QueryParam("type")
	if (passwordType != "" && passwordType != "P") && (passwordType != "" && passwordType != "N") {
		return utils.ResponseError(c, http.StatusInternalServerError, "Paremetro type tem que ser 'P' ou 'N'")
	}
	currentPassword, err := service.GetCurrentPassword(passwordType)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.JSON(http.StatusOK, models.Password{Password: "N/A"})
		}
		return utils.ResponseError(c, http.StatusInternalServerError, "Erro ao buscar a senha atual: "+err.Error())
	}

	return c.JSON(http.StatusOK, currentPassword)
}

func ResetPasswords(c echo.Context) error {
	passwordType := c.QueryParam("type")
	if (passwordType != "" && passwordType != "P") && (passwordType != "" && passwordType != "N") {
		return utils.ResponseError(c, http.StatusInternalServerError, "Paremetro type tem que ser 'P' ou 'N'")
	}
	if err := service.ResetPassword(passwordType); err != nil {
		return utils.ResponseError(c, http.StatusBadRequest, "Erro ao resetar senhas")
	}
	return c.JSON(http.StatusOK, nil)
}
