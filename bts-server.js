const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const PORT = 3000;

const routes = require("./routes.json");

nunjucks.configure("src", {
  autoescape: true,
  express: app,
});

app.use(express.static("public")); // for CSS/images

// Routes
routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.render(route.page, route);
  });
});

module.exports = app;
