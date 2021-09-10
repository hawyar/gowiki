package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
)

type project struct {
	Name string `json: "name"`
	Ref  string `json: "ref"`
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

	QuickAccess := []project{
		{
			Name: "Github Organization",
			Ref:  "https://github.com/consensusnetworks",
		},
		{
			Name: "Jira Board",
			Ref:  "https://github.com/hawyar/gatsby-graphcms-starter",
		},
		{
			Name: "HealthNet Graphql Docs",
			Ref:  "https://github.com/hawyar/gatsby-graphcms-starter",
		},
		{
			Name: "Whitepaper",
			Ref:  "https://github.com/hawyar/gatsby-graphcms-starter",
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

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{
			"Title":    "Consensus Networks",
			"Header": "Consensus Networks",
			"QuickAccess": QuickAccess,
			"About": "HealthNet, is a HIPAA-compliant Platform-as-a-Service that medical IoT (IoMT) devices can plug into for highly traceable data management, security, and provenance, while leveraging EHR integration capabilities.",
			"Nav":      nav,
		})
	})

	log.Fatal(app.Listen(":3000"))
}
