package service

import (
	"context"
	"pi4/database"
	"pi4/models"
	"pi4/utils"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

var deviceCollection *mongo.Collection = database.GetCollection(database.MongoDB, "device")

func SaveDevice(device models.Device) (models.Device, error) {
	device.ID = utils.NewId()
	device.CreatedAt = bson.Now()
	device.UpdatedAt = bson.Now()
	_, err := deviceCollection.InsertOne(context.Background(), device)
	return device, err
}

func GetDevice(id string) (device models.Device, err error) {
	err = deviceCollection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&device)
	return
}

func GetAllDevices() ([]models.Device, error) {
	cursor, err := deviceCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var devices []models.Device
	err = cursor.All(context.Background(), &devices)
	return devices, err
}

func UpdateDevice(id string, device models.Device) (models.Device, error) {
	device.UpdatedAt = bson.Now()
	device.ID = id
	err := deviceCollection.FindOneAndUpdate(context.Background(), bson.M{"_id": id}, bson.M{"$set": bson.M{"id": id, "name": device.Name, "playlist_id": device.PlaylistID, "updated_at": bson.Now()}}, options.FindOneAndUpdate().SetReturnDocument(1)).Decode(&device)
	if err != nil {
		return models.Device{}, err
	}
	SendMessage(id, "update")
	return device, nil
}

func DeleteDevice(id string) error {
	err := deviceCollection.FindOneAndDelete(context.Background(), bson.M{"_id": id}).Err()
	if err != nil {
		return err
	}
	SendMessage(id, "delete")
	return nil

}
