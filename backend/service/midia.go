package service

import (
	"context"
	"pi4/database"
	"pi4/models"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

var midiaCollection *mongo.Collection = database.GetCollection(database.MongoDB, "midias")

func SaveMidia(midia models.Midias) (models.Midias, error) {
	midia.CreatedAt = time.Now()
	midia.UpdatedAt = time.Now()
	_, err := midiaCollection.InsertOne(context.Background(), midia)
	return midia, err
}
