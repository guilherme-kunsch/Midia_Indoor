package models

import "time"

type (
	Device struct {
		ID         string    `json:"id" bson:"_id"`
		Name       string    `json:"name" bson:"name"`
		PlaylistID string    `json:"playlist_id" bson:"playlist_id"`
		CreatedAt  time.Time `json:"created_at" bson:"created_at"`
		UpdatedAt  time.Time `json:"updated_at" bson:"updated_at"`
	}
)
