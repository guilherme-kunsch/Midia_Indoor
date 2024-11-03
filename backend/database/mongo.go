package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoDB *mongo.Client = NewMongoDB()

func NewMongoDB() *mongo.Client {
	if os.Getenv("ENV") == "dev" {
		err := godotenv.Load()

		if err != nil {
			fmt.Println("Error loading .env file but don't worry, we are using the environment variables.")
		}
	}
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file but don't worry, we are using the environment variables.")
	}
	fmt.Println("MONGODB_URI from .env:", os.Getenv("MONGODB_URI"))
	mongoUri := os.Getenv("MONGODB_URI")
	fmt.Println(mongoUri)
	ctx, cancelRetry := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if err != nil {
		log.Fatal("Error connecting to MongoDB: ", err)
	}
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")
	defer cancelRetry()
	return client
}

func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("mastigadores").Collection(collectionName)
	return collection
}
