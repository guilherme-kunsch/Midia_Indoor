package models

import "time"

type Password struct {
	ID        string    `json:"id" bson:"_id"`
	Password  string    `json:"password" bson:"password"`
	Type      string    `json:"type" bson:"type"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}
