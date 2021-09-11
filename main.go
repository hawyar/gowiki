package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
)

type quickAccess struct {
	Name string `json: "name"`
	Ref  string `json: "ref"`
	Icon string `json: "icon"`
}

type nav struct {
	Name string `json: "name"`
	Ref  string `json: "ref"`
}

func main() {
	engine := html.New("./views", ".html")

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Static("/", "./public")

	QuickAccess := []quickAccess{
		{
			Name: "Current Sprint",
			Ref:  "https://consensusnetworks.atlassian.net/jira/software/projects/HEAL/boards/3",
			Icon: "svg/jira.svg",
		},
		{
			Name: "HealthNet GraphQL Docs",
			Ref:  "https://healthnet-graphql-docs.herokuapp.com/",
			Icon: "svg/graphql.svg",
		},
		{
			Name: "Whitepaper",
			Ref:  "https://github.com/hawyar/gatsby-graphcms-starter",
			Icon: "svg/book.svg",
		},
	}

	nav := []nav{
		{
			Name: "Introduction",
			Ref:  "https://github.com/hawyar",
		},
		{
			Name: "videohive",
			Ref:  "https://videohive.net/user/hawyar/portfolio",
		},
		{
			Name: "dribbble",
			Ref:  "https://dribbble.com/Hawyar",
		},
	}

	about := "HealthNet, is a HIPAA-compliant Platform-as-a-Service that medical IoT (IoMT) devices can plug into for highly traceable data management, security, and provenance, while leveraging EHR integration capabilities."



	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{
			"Title":    "Consensus Networks",
			"Header": "Consensus Networks",
			"QuickAccess": QuickAccess,
			"About": about,
			"Nav": nav,
		})
	})

	log.Fatal(app.Listen(":3000"))
}
