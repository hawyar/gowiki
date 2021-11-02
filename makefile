
BUILD=build

dev:
	air main.go

docs:
	cd docs && npm run build && npm run export

caddy:
	caddy run

server:
	go build -o $(BUILD)/main main.go

run:
	$(BUILD)/main


