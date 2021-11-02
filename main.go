package main

import (
	"context"
	"embed"
	"encoding/json"
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
	"github.com/michaeljs1990/sqlitestore"
	"golang.org/x/oauth2"
	githubOAuth2 "golang.org/x/oauth2/github"
)

//go:embed docs/dist
//go:embed docs/dist/_next
//go:embed docs/dist/_next/static/chunks/pages/*.js
//go:embed docs/dist/_next/static/*/*.js
var docs embed.FS

// sqlite store
var store *sqlitestore.SqliteStore

func loadDocs() fs.FS {
	// load the Next.js app's `dist` folder.
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
	Login     string `json:"login" xml:"login"`
	Id        int    `json:"id" xml:"id"`
	AvatarURL string `json:"avatar_url" xml:"avatar_url"`
	HtmlUrl   string `json:"html_url" xml:"html_url"`
}

func init() {
	var err error
	store, err = sqlitestore.NewSqliteStore("./database", "sessions", "/", 3600, []byte("<SecretKey>"))
	if err != nil {
		panic(err)
	}
}

func main() {

	e := echo.New()

	docsHttpFs := http.FS(loadDocs())
	docsFs := http.FileServer(docsHttpFs)

	e.GET("/*", echo.WrapHandler(docsFs))
	e.GET("/api", handleAPI)

	e.GET("api/github", githubLoginHandler)
	e.GET("github/callback", githubCallbackHandler)

	e.GET("/api/me", func(c echo.Context) error {

		session, err := store.Get(c.Request(), "auth")

		fmt.Println("session", session)

		if err != nil {
			return c.JSON(http.StatusUnauthorized, "")
		}

		user := session.Values["user"]

		if user == nil {
			return c.JSON(http.StatusUnauthorized, "")
		}

		fmt.Println("user", user)
		return c.JSON(http.StatusOK, user)
	})

	fmt.Println("http://localhost:8080")

	port := ":8080"
	e.Logger.Fatal(e.Start(port))
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

	token, err := config.Exchange(ctx, code)

	if err != nil {
		return c.Redirect(http.StatusTemporaryRedirect, "/")

	}
	user, err := getUserFromGithub(token.AccessToken)

	if err != nil {
		return c.Redirect(http.StatusTemporaryRedirect, "/")
	}

	session, err := store.Get(c.Request(), "auth")

	if err != nil {
		return c.Redirect(http.StatusTemporaryRedirect, "/")
	}

	session.Values["user"] = user

	err = session.Save(c.Request(), c.Response())

	if err != nil {
		return c.Redirect(http.StatusTemporaryRedirect, "/")
	}

	return c.Redirect(http.StatusTemporaryRedirect, "/")

}

func getUserFromGithub(token string) (*User, error) {
	ctx := context.Background()
	client := config.Client(ctx, &oauth2.Token{AccessToken: token})

	resp, err := client.Get("https://api.github.com/user")

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	contents, err := io.ReadAll(resp.Body)

	fmt.Println("contents", string(contents))

	if err != nil {
		return nil, err
	}

	user := &User{}

	err = json.Unmarshal(contents, user)

	if err != nil {
		return nil, err
	}

	return user, nil
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
