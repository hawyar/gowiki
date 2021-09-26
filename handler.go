package main

import "github.com/gofiber/fiber/v2"

func index(c *fiber.Ctx) error {
	return c.SendString("Hello World")
}

func spa(c *fiber.Ctx) error {
	return c.SendFile("./docs/index.html")
}
