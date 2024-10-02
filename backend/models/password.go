package models

type (
	Password struct {
		Type     string `json:"type" bson:"type"`
		Password string `json:"password" bson:"password"`
	}
)
