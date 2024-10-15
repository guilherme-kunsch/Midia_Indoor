ARG GO_VERSION=1.22
FROM golang:${GO_VERSION}-alpine as build

WORKDIR /app

COPY . .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o /bin/pi-api

FROM alpine:3.14

WORKDIR /

COPY --from=build /bin/pi-api /pi-api

EXPOSE 8080

ENTRYPOINT ["./pi-api"]
