package main

import (
	"context"
	"database/sql"
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


	// prepend the `/api` prefix to catch requests from the Next.js app
    e.GET("api/github", githubLoginHandler)

    e.GET("github/callback", githubCallbackHandler)

    // Route where the authenticated user is redirected to
    // http.HandleFunc("/loggedin", func(w http.ResponseWriter, r *http.Request) {
    //     loggedinHandler(w, r, "")
    // })
	e.GET("/api", handleAPI)

	e.GET("/api/me", handlUser)


	fmt.Println("http://localhost:8080")
	e.Logger.Fatal(e.Start(":8080"))
}

func githubLoginHandler(c echo.Context) error {
	url := config.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func getToken(db *sql.DB) (string, error) {
	var token string
	err := db.QueryRow("select access_token from github_token").Scan(&token)
	if err != nil {
		return "", err
	}
	return token, nil
}

func insertToken(db *sql.DB, token string) error {
	stmt, err := db.Prepare("insert into github_token (access_token) values (?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(token)
	if err != nil {
		return err
	}
	return nil
}

func createTable(db *sql.DB) error {
	_, err := db.Exec(`
		create table if not exists github_token (
			access_token text
		)
	`)
	if err != nil {
		return err
	}
	return nil
}


func githubCallbackHandler(c echo.Context) error {

	ctx := context.Background()
	code := c.QueryParam("code")

	token, err := config.Exchange(ctx, code)

	if err != nil {
		return c.String(http.StatusInternalServerError, "failed to get token")
	}

	// insert token into database
	db, err := sql.Open("sqlite3", "./db.sqlite3")
	if err != nil {
		return c.String(http.StatusInternalServerError, "failed to open database")
	}
	defer db.Close()
	

	err = insertToken(db, token.AccessToken)

	if err != nil {
		return c.String(http.StatusInternalServerError, "failed to insert token")
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
		
	// if user exists then redirc to /loggedin
	// else create user and redirect to /loggedin
	
	return c.Redirect(http.StatusTemporaryRedirect, "/")
}

func handlUser(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"name": "John Doe",
	})

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