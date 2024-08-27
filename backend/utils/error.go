package utils

import "github.com/labstack/echo/v4"

func ResponseError(c echo.Context, status int, err string) error {
	return c.JSON(status, map[string]string{"error": err})
}
