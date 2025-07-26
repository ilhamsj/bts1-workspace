const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");

nunjucks.configure("src", { autoescape: true });

const pages = ["index", "about"];

for (const page of pages) {
  const rendered = nunjucks.render(`${page}.html`, {
    title: `${page.charAt(0).toUpperCase() + page.slice(1)} - My Website`,
  });
  fs.writeFileSync(path.join("dist", `${page}.html`), rendered);
}
