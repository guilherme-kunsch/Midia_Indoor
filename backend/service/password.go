package service

import (
	"context"
	"pi4/database"
	"pi4/models"

	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

var passwordCollection *mongo.Collection = database.GetCollection(database.MongoDB, "password")

func SavePassword(password models.Password) (models.Password, error) {
	_, err := passwordCollection.InsertOne(context.Background(), password)
	if err != nil {
		return models.Password{}, err
	}

	return password, nil
}

func GetAllPassword() ([]models.Password, error) {
	cursor, err := passwordCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var password []models.Password
	err = cursor.All(context.Background(), &password)
	return password, err
}
