package service

import (
	"context"
	"fmt"
	"pi4/database"
	"pi4/models"
	"pi4/utils"

	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

var playlistCollection *mongo.Collection = database.GetCollection(database.MongoDB, "playlist")

func validateMidia(midias []models.Content) error {
	for _, midia := range midias {
		err := midiaCollection.FindOne(context.Background(), bson.M{"_id": midia.MidiaID}).Err()
		if err == mongo.ErrNoDocuments {
			return fmt.Errorf("Midia com id -> '%s' não encontrada", midia.MidiaID)
		}
	}
	return nil
}
func CreatePlaylist(playlist models.Playlist) (models.Playlist, error) {
	err := validateMidia(playlist.Midias)
	if err != nil {
		return models.Playlist{}, err
	}
	playlist.ID = utils.NewId()
	playlist.CreatedAt = bson.Now()
	playlist.UpdatedAt = bson.Now()
	_, err = playlistCollection.InsertOne(context.Background(), playlist)
	return playlist, err
}

func GetPlaylist(id string) (playlist models.Playlist, err error) {
	err = playlistCollection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&playlist)
	return
}

func GetPlaylists() ([]models.Playlist, error) {
	cursor, err := playlistCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	var playlists []models.Playlist
	err = cursor.All(context.Background(), &playlists)
	return playlists, err
}

func UpdatePlaylist(id string, playlist models.Playlist) (models.Playlist, error) {
	err := validateMidia(playlist.Midias)
	if err != nil {
		return models.Playlist{}, err
	}
	playlist.ID = id
	playlist.UpdatedAt = bson.Now()
	err = playlistCollection.FindOneAndUpdate(context.Background(), bson.M{"_id": id}, bson.M{"$set": playlist}).Err()
	return playlist, err
}

func DeletePlaylist(id string) error {
	err := playlistCollection.FindOneAndDelete(context.Background(), bson.M{"_id": id}).Err()
	return err
}
