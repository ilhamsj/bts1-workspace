const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const PORT = process.env.PORT || 3000;

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

// For Vercel deployment
module.exports = app;

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
