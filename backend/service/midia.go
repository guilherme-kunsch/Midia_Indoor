package service

import (
	"context"
	"pi4/database"
	"pi4/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var midiaCollection *mongo.Collection = database.GetCollection(database.MongoDB, "midias")

func SaveMidia(midia models.Midia) (models.Midia, error) {
	midia.CreatedAt = time.Now()
	midia.UpdatedAt = time.Now()
	_, err := midiaCollection.InsertOne(context.Background(), midia)
	return midia, err
}

func GetMidia(id string) (midia models.Midia, err error) {
	err = midiaCollection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&midia)
	return
}

func GetMidias() ([]models.Midia, error) {
	cursor, err := midiaCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var midias []models.Midia
	err = cursor.All(context.Background(), &midias)
	return midias, err
}

func DeleteMidia(id string) error {
	return midiaCollection.FindOneAndDelete(context.Background(), bson.M{"_id": id}).Err()
}
