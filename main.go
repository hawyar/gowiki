package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"text/template"

	"github.com/yuin/goldmark"
	meta "github.com/yuin/goldmark-meta"
	"github.com/yuin/goldmark/parser"
)


type Page struct {
	Title string
	Body  []byte
}

func (p *Page) save() error {
	filename := p.Title + ".md"
	return ioutil.WriteFile("content/" + filename, p.Body, 0600)
}

func loadPage(title string) (*Page, error) {
	filename := title + ".md"
	body, err := ioutil.ReadFile("content/" + filename)
	if err != nil {
		return nil, err
	}

	return &Page{Title: title, Body: body}, nil
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/view/"):]
	t, _ := template.ParseFiles("view/" + "template.html")
	p, _ := loadPage(title)
	// send back the page as a HTML file
	t.Execute(w, p)
}

type WikiPageContent struct {
	Title string
	Body  string
	Author string
	Summary string
}

func wikiPageHandler(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/wiki/"):]
	log.Print("generated page > " + title + ".md")
	p, err := loadPage(title)

	if err != nil {
		log.Print(err)
		p = &Page{Title: title, Body: []byte("")}
	}

	
	 markdown := goldmark.New(
        goldmark.WithExtensions(
            meta.Meta,
        ),
    )
    source := p.Body

    var buf bytes.Buffer

    context := parser.NewContext()
	
    if err := markdown.Convert([]byte(source), &buf, parser.WithContext(context)); err != nil {
        panic(err)
    }
    metaData := meta.Get(context)
    frontmatterTitle := metaData["Title"]
	// frontmatterAuthor := metaData["Author"]

    fmt.Print(frontmatterTitle)
	// new wiki page content
	wikiPageContent := WikiPageContent{Title: title, Body: buf.String()}
	
	t, _ := template.ParseFiles("wiki/" + "template.html")
	t.Execute(w, wikiPageContent)
}


func indexHandler(w http.ResponseWriter, r *http.Request) {
	files, _ := ioutil.ReadDir("content")

	// get names of all files in the directory
	fileNames := make([]string, len(files))
	
	for i, file := range files {
		fileNames[i] = file.Name()
	}

	t, _ := template.ParseFiles("static/index.html")
	t.Execute(w, fileNames)
}


func main() {
	server := http.Server{
        Addr: "127.0.0.1:8080",
    }
	
	http.Handle("/", http.FileServer(http.Dir("./static")))

	http.HandleFunc("/wiki/", wikiPageHandler)

	log.Fatal(server.ListenAndServe())
}
