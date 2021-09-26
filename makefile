run:
	go run main.go

build:
	go build main.go

watch:
	air main.go handler.go

build-docs:
	cd docs && npm run build && npm run export