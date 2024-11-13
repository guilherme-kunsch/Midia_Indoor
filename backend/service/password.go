package service

import (
	"context"
	"pi4/database"
	"pi4/models"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

var passwordCollection *mongo.Collection = database.GetCollection(database.MongoDB, "password")

func SavePassword(password models.Password) (models.Password, error) {
	password.CreatedAt = time.Now() // Adiciona a data e hora atual

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

func GetFivePassword() ([]models.Password, error) {
	findOptions := options.Find()
	findOptions.SetLimit(5)

	cursor, err := passwordCollection.Find(context.Background(), bson.M{}, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var passwords []models.Password

	for cursor.Next(context.Background()) {
		var password models.Password
		if err := cursor.Decode(&password); err != nil {
			return nil, err
		}
		passwords = append(passwords, password)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return passwords, nil
}

func GetCurrentPassword() (models.Password, error) {
	var password models.Password

	err := passwordCollection.FindOne(
		context.Background(),
		bson.M{},
		options.FindOne().SetSort(bson.M{"createdAt": -1}),
	).Decode(&password)

	if err != nil {
		return models.Password{}, err
	}

	return password, nil
}
