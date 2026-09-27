const fs = require("fs");
const path = require("path");

// Runs after `next build` with output: "export".
// 1. /en pages get lang="en" (the shared root layout renders the German default).
// 2. The nomodule polyfill script is removed, as strip-polyfills.js did for `next start`.

const outDir = path.join(process.cwd(), "out");
const manifestPath = path.join(process.cwd(), ".next", "build-manifest.json");

if (!fs.existsSync(outDir)) {
  throw new Error("finalize-export: out/ not found; is output: 'export' set?");
}

const polyfillFiles = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8")).polyfillFiles ?? []
  : [];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const polyfillTagPatterns = polyfillFiles.map(
  (file) => new RegExp(`<script src="/_next/${escapeRegExp(file)}"[^>]*></script>`, "g")
);

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
};
walk(outDir);

const isEnglishPage = (file) => {
  const relative = path.relative(outDir, file).split(path.sep).join("/");
  return relative === "en.html" || relative.startsWith("en/");
};

let englishPages = 0;
let strippedTags = 0;

for (const file of htmlFiles) {
  const original = fs.readFileSync(file, "utf8");
  let html = original;

  if (isEnglishPage(file)) {
    const localized = html.replace('<html lang="de"', '<html lang="en"');
    if (localized !== html) englishPages += 1;
    html = localized;
  }

  for (const pattern of polyfillTagPatterns) {
    html = html.replace(pattern, () => {
      strippedTags += 1;
      return "";
    });
  }

  if (html !== original) {
    fs.writeFileSync(file, html, "utf8");
  }
}

if (englishPages === 0) {
  throw new Error('finalize-export: no /en page had <html lang="de"; check the root layout markup.');
}

let deletedFiles = 0;
for (const file of polyfillFiles) {
  const absolutePath = path.join(outDir, "_next", file);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
    deletedFiles += 1;
  }
}

console.log(
  `finalize-export: lang="en" on ${englishPages} page(s); removed ${strippedTags} polyfill tag(s) and ${deletedFiles} file(s).`
);
