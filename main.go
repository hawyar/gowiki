package main

import (
	"context"
	"embed"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"
	"runtime/pprof"

	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"golang.org/x/oauth2"
	githubOAuth2 "golang.org/x/oauth2/github"
)

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



var config = &oauth2.Config{
		ClientID:     loadEnv("GITHUB_CLIENT_ID"),
		ClientSecret: loadEnv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  "http://localhost:8080/github/callback",
		Endpoint:     githubOAuth2.Endpoint,
	}

func main() {

	e := echo.New()

	docsHttpFs := http.FS(loadDocs())
	fsServer := http.FileServer(docsHttpFs)
	e.GET("/*", echo.WrapHandler(fsServer))


    // Login route
    e.GET("api/github", githubLoginHandler)

    // Github callback
    e.GET("github/callback", githubCallbackHandler)

    // Route where the authenticated user is redirected to
    // http.HandleFunc("/loggedin", func(w http.ResponseWriter, r *http.Request) {
    //     loggedinHandler(w, r, "")
    // })
	e.GET("/api", handleAPI)


	fmt.Println("http://localhost:8080")
	e.Logger.Fatal(e.Start(":8080"))
}

func githubLoginHandler(c echo.Context) error {
	url := config.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func githubCallbackHandler(c echo.Context) error {

	ctx := context.Background()
	code := c.QueryParam("code")

	// exchange the code for a token
	token, err := config.Exchange(ctx, code)


	if err != nil {
		return c.String(http.StatusInternalServerError, "failed to get token")
	}

	// use the same context to the github API
	client := config.Client(ctx, token)
	
	resp, err := client.Get("https://api.github.com/user")

	if err != nil {
		return c.String(http.StatusInternalServerError, "failed to get profile")
	}

	defer resp.Body.Close()

	contents, err := io.ReadAll(resp.Body)
	if err != nil {
		return c.String(http.StatusInternalServerError, "failed to read response")
	}

	return c.String(http.StatusOK, string(contents))
}



func loadEnv(key string) string {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}


func handleAPI(c echo.Context) error {
	profile := pprof.Lookup("allocs")
	return profile.WriteTo(c.Response().Writer, 1)
}