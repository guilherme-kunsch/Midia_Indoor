package models

import "time"

type Password struct {
	Password  string    `json:"password" bson:"password"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}
