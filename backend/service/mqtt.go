package service

import (
	"fmt"
	"os"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/joho/godotenv"
)

var mqttClient mqtt.Client

func init() {
  godotenv.Load()
  opts := mqtt.NewClientOptions()
  opts.AddBroker(os.Getenv("MQTT_URL"))
  opts.SetClientID("pi")
  opts.SetUsername(os.Getenv("MQTT_USER"))
  opts.SetPassword(os.Getenv("MQTT_PASSWORD"))
  opts.OnConnect = func(c mqtt.Client) {
    fmt.Println("Connected")
  }
  opts.OnConnectionLost = func(c mqtt.Client, err error) {
    fmt.Printf("Connection Lost: %s", err.Error())
  }
  client := mqtt.NewClient(opts)
  if token := client.Connect(); token.Wait() && token.Error() != nil {
    panic(token.Error())
  }
  mqttClient = client
}

func SendMessage(topic, message string) {
  token := mqttClient.Publish(topic, 1, false, message)
  token.Wait()
  if token.Error() != nil {
    fmt.Println(token.Error())
    return
  }
  fmt.Printf("Messangem: %s, enviada ao topico %s\n", message, topic)
}
