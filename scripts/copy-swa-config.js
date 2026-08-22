// Azure Static Web Apps requires staticwebapp.config.json at the root of the
// build output when the app has a build step. Parcel does not copy it, so we do.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const source = path.join(root, "staticwebapp.config.json");
const destination = path.join(root, "dist", "staticwebapp.config.json");

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.copyFileSync(source, destination);
console.log("Copied staticwebapp.config.json to dist/");
