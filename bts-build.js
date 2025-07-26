const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");

nunjucks.configure("src", { autoescape: true });

// Read routes configuration
const routes = JSON.parse(fs.readFileSync("routes.json", "utf8"));

// Ensure public directory exists
if (!fs.existsSync("public")) {
  fs.mkdirSync("public");
}

// Build each page from routes configuration
for (const route of routes) {
  const templateName = route.page;
  const outputPath =
    route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`;

  console.log(`Building ${templateName} -> ${outputPath}`);

  const rendered = nunjucks.render(templateName, {
    title: route.title,
    description: route.description,
    data_wf_page: route.data_wf_page,
    current_path: route.path,
  });

  fs.writeFileSync(path.join("public", outputPath), rendered);
}

console.log(`Built ${routes.length} pages successfully!`);
