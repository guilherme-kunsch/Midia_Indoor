package service

import (
	"context"
	"fmt"
	"pi4/database"
	"pi4/models"
	"pi4/utils"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

var passwordCollection *mongo.Collection = database.GetCollection(database.MongoDB, "password")

func SavePassword(operator, passwordType string) (models.Password, error) {
	v := 1
	if operator == "sub" {
		v = -1
	}

	var password models.Password

	err := passwordCollection.FindOne(
		context.Background(),
		bson.M{"type": passwordType},
		options.FindOne().SetSort(bson.M{"createdAt": -1}),
	).Decode(&password)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			passwordValue := passwordType + "001"
			password = models.Password{
				ID:        utils.NewId(),
				Password:  passwordValue,
				Type:      passwordType,
				CreatedAt: time.Now(),
			}
			if _, err := passwordCollection.InsertOne(context.Background(), password); err != nil {
				return password, err
			}
			return password, nil
		} else {
			return password, err
		}
	}

	passwordValue := password.Password[1:]
	passwordInt, err := strconv.Atoi(passwordValue)
	if err != nil {
		return password, err
	}
	passwordInt += v

	if passwordInt < 10 {
		passwordValue = fmt.Sprintf("%s00%d", passwordType, passwordInt)
	} else if passwordInt < 100 {
		passwordValue = fmt.Sprintf("%s0%d", passwordType, passwordInt)
	} else {
		passwordValue = fmt.Sprintf("%s%d", passwordType, passwordInt)
	}
	password.Password = passwordValue

	updateResult, err := passwordCollection.UpdateOne(
		context.Background(),
		bson.M{"password": passwordValue},
		bson.M{"$set": bson.M{"createdAt": time.Now()}},
	)

	if err != nil {
		return password, err
	}

	if updateResult.MatchedCount == 0 {
		password.CreatedAt = time.Now()
		password.ID = utils.NewId()
		_, err = passwordCollection.InsertOne(context.Background(), password)
		if err != nil {
			return password, err
		}
	}

	return password, nil
}

func GetAllPassword(passwordType string) ([]models.Password, error) {
	cursor, err := passwordCollection.Find(context.Background(), bson.M{"type": passwordType})
	if err != nil {
		return nil, err
	}
	var password []models.Password
	err = cursor.All(context.Background(), &password)
	return password, err
}

func GetFivePassword() ([]models.Password, error) {
	findOptions := options.Find().SetSort(bson.M{"createdAt": -1})
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

func GetCurrentPassword(passwordType string) (models.Password, error) {
	var password models.Password
	filter := bson.M{}
	if passwordType != "" {
		filter["type"] = passwordType
	}
	err := passwordCollection.FindOne(
		context.Background(),
		filter,
		options.FindOne().SetSort(bson.M{"createdAt": -1}),
	).Decode(&password)

	if err != nil {
		return models.Password{}, err
	}

	return password, nil
}

func ResetPassword(passwordType string) error {
	filter := bson.M{}
	if passwordType != "" {
		filter["type"] = passwordType
	}
	_, err := passwordCollection.DeleteMany(context.Background(), filter)
	return err
}
