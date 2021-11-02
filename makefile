
watch:
	air main.go

docs:
	cd docs && npm run build && npm run export

caddy:
	caddy run

build:
	make docs && go build -o bin/main main.go

run:
	make build && bin/main