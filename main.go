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
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/oauth2"
	githubOAuth2 "golang.org/x/oauth2/github"
)

//go:embed docs/dist
//go:embed docs/dist/_next
//go:embed docs/dist/_next/static/chunks/pages/*.js
//go:embed docs/dist/_next/static/*/*.js
var docs embed.FS

func loadDocs() fs.FS {
	// Load the Next.js app's `dist` folder.
	nextFs, err := fs.Sub(docs, "docs/dist")
	if err != nil {
		log.Fatal(err)
	}
	return nextFs
}

var config = &oauth2.Config{
	ClientID:     loadEnv("GITHUB_CLIENT_ID"),
	ClientSecret: loadEnv("GITHUB_CLIENT_SECRET"),
	RedirectURL:  "http://localhost:8080/github/callback",
	Endpoint:     githubOAuth2.Endpoint,
}

// eventully pull all these from github and jira api

type Org struct {
	Name string `json:"name" xml:"name"`
	Desc string `json:"desc" xml:"desc"`
}

type User struct {
	Name  string `json:"name" xml:"name"`
	Email string `json:"email" xml:"email"`
}

func main() {

	e := echo.New()

	docsHttpFs := http.FS(loadDocs())
	docsFs := http.FileServer(docsHttpFs)

	e.GET("/*", echo.WrapHandler(docsFs))

	// prepend the `/api` prefix to catch requests from the Next.js app
	e.GET("api/github", githubLoginHandler)
	e.GET("github/callback", githubCallbackHandler)
	e.GET("/api", handleAPI)

	e.GET("/api/me", func(c echo.Context) error {

		u := &User{
			Name:  "testing",
			Email: "test@testing.com",
		}

		o := &Org{
			Name: "Consens Networks",
			Desc: "Organziation description goes here",
		}
		return c.JSON(http.StatusOK, map[string]interface{}{
			"user": u,
			"org":  o,
		})
	})

	fmt.Println("http://localhost:8080")
	e.Logger.Fatal(e.Start(":8080"))
}

func githubLoginHandler(c echo.Context) error {
	url := config.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

// func createTable(db *sql.DB) error {
// 	_, err := db.Exec(`
// 		create table if not exists github_token (
// 			access_token text
// 		)
// 	`)
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }

func githubCallbackHandler(c echo.Context) error {
	ctx := context.Background()
	code := c.QueryParam("code")

	fmt.Println("code", code)

	token, err := config.Exchange(ctx, code)

	fmt.Println("token", token)

	if err != nil {
		return err
	}

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

	fmt.Println(string(contents))

	return c.Redirect(http.StatusTemporaryRedirect, "/docs")
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
