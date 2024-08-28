package models

import "time"

type (
	Midias struct {
		ID               string    `json:"id" bson:"_id"`
		FileName         string    `json:"file_name" bson:"file_name"`
		FileOriginalName string    `json:"file_original_name" bson:"file_original_name"`
		FileUrl          string    `json:"file_url" bson:"file_url"`
		CreatedAt        time.Time `json:"created_at" bson:"created_at"`
		UpdatedAt        time.Time `json:"updated_at" bson:"updated_at"`
	}
)