const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const PORT = 3000;

// Set up Nunjucks as template engine
nunjucks.configure("src", {
  autoescape: true,
  express: app,
});

app.use(express.static("public")); // for CSS/images

// Routes
app.get("/", (req, res) => {
  res.render("index.html", {
    title: "Home - My Website2",
    description: "Welcome to my SEO-friendly homepage!",
  });
});

app.get("/about", (req, res) => {
  res.render("about.html", {
    title: "About Us - My Website",
    description: "Learn more about our mission and values.",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.html", {
    title: "Contact - My Website",
    description: "Reach out to us using the info below.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
