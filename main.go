package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"

	"github.com/labstack/echo"
)

// credits:
// https://github.com/dstotijn/golang-nextjs-portable

//go:embed docs/dist
//go:embed docs/dist/_next
//go:embed docs/dist/_next/static/chunks/pages/*.js
//go:embed docs/dist/_next/static/*/*.js
var nextFS embed.FS

func loadDocs() fs.FS {
	// Load the Next.js app's `dist` folder.
	distFS, err := fs.Sub(nextFS, "docs/dist")
	if err != nil {
		log.Fatal(err)
	}
	return distFS
}

func main() {

	e := echo.New()
	
	docsHttpFs := http.FS(loadDocs())
	fsServer := http.FileServer(docsHttpFs)
	e.GET("/*", echo.WrapHandler(fsServer))

	


	e.Logger.Fatal(e.Start(":3000"))
}
