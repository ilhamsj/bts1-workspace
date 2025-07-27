const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");

nunjucks.configure("src", { autoescape: true });

// Read routes configuration
const routes = JSON.parse(fs.readFileSync("routes.json", "utf8"));
const info = JSON.parse(fs.readFileSync("info.json", "utf8"));

const destination = process.env.DESTINATION || "public";

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

// Build each page from routes configuration
for (const route of routes) {
  console.log(`Building ${route.page}`);

  const rendered = nunjucks.render(route.page, {
    ...route,
    ...info,
    current_path: route.path,
  });

  fs.writeFileSync(path.join(destination, route.page), rendered);
}

console.log(`Built ${routes.length} pages successfully! ${destination}`);
