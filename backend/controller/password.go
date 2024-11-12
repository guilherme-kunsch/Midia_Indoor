package controller

import (
	"net/http"
	"pi4/models"
	"pi4/service"
	"pi4/utils"

	"github.com/labstack/echo/v4"
)

func SavePassword(c echo.Context) error {
	var body models.Password

	if err := c.Bind(&body); err != nil {
		return utils.ResponseError(c, http.StatusUnprocessableEntity, err.Error())
	}

	savedPassword, err := service.SavePassword(body)
	if err != nil {
		return utils.ResponseError(c, http.StatusInternalServerError, "Erro ao salvar a senha: "+err.Error())
	}

	service.SendMessage("password", "password")

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
