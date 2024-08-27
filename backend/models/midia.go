package models

import "time"

type (
	Midias struct {
		ID        string    `json:"id"`
		FileName  string    `json:"file_name"`
		CreatedAt time.Time `json:"created_at"`
		UpdatedAt time.Time `json:"updated_at"`
	}
)
