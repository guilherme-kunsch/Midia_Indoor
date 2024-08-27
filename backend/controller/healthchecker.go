package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func Healthchecker(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"Mastiga": "Dores",
	})
}
