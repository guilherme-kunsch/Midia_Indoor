package service

import (
	"context"
	"io"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/joho/godotenv"
)

var s3Client *s3.Client

const bucketName = "pi4"
const region = "auto"

func init() {
	godotenv.Load()
	accessKey := os.Getenv("AWS_ACCESS_KEY_ID")
	secretKey := os.Getenv("AWS_SECRET_ACCESS_KEY")
	awsConfig, err := config.LoadDefaultConfig(context.Background(), config.WithRegion(region),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKey, secretKey, "")))
	if err != nil {
		log.Fatalf("Error ao carregar credencials s3: %s", err.Error())
	}

	// Create S3 service client
	s3Client = s3.NewFromConfig(awsConfig, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(os.Getenv("AWS_ENDPOINT_URL_S3"))
		o.Region = region
	})
}
func UploadFile(fileName string, body io.Reader) error {
	_, err := s3Client.PutObject(context.Background(), &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(fileName),
		Body:   body,
	})
	return err
}

func DeleteFile(fileName string) error {
	_, err := s3Client.DeleteObject(context.Background(), &s3.DeleteObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(fileName),
	})
	return err
}
