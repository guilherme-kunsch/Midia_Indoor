package models

import "time"

type (
	Playlist struct {
		ID        string    `json:"id" bson:"_id"`
		Name      string    `json:"name" bson:"name"`
		MidiasId    []string `json:"midias_id" bson:"midias_id"`
    Midias []Midia `json:"midias" bson:"midias,omitempty"`
		CreatedAt time.Time `json:"created_at" bson:"created_at"`
		UpdatedAt time.Time `json:"updated_at" bson:"updated_at"`
	}
	Content struct {
		MidiaID  string `json:"midia_id" bson:"midia_id"`
		FileName string `json:"file_name" bson:"file_name"`
	}
)
