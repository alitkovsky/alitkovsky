const fs = require("fs");
const path = require("path");

const nextDir = path.join(process.cwd(), ".next");

if (!fs.existsSync(nextDir)) {
  console.log("strip-polyfills: .next directory not found, skipping.");
  process.exit(0);
}

const buildManifestFiles = [];
const middlewareManifestFiles = [];
const polyfillFiles = new Set();

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (entry.name === "build-manifest.json") {
      buildManifestFiles.push(fullPath);
      continue;
    }

    if (entry.name === "middleware-build-manifest.js") {
      middlewareManifestFiles.push(fullPath);
    }
  }
};

walk(nextDir);

let updatedFiles = 0;
let clearedEntries = 0;

for (const manifestPath of buildManifestFiles) {
  const raw = fs.readFileSync(manifestPath, "utf8");
  let manifest;

  try {
    manifest = JSON.parse(raw);
  } catch (error) {
    throw new Error(`strip-polyfills: invalid JSON in ${manifestPath}`);
  }

  if (!Array.isArray(manifest.polyfillFiles) || manifest.polyfillFiles.length === 0) {
    continue;
  }

  for (const polyfillFile of manifest.polyfillFiles) {
    polyfillFiles.add(polyfillFile);
  }

  clearedEntries += manifest.polyfillFiles.length;
  manifest.polyfillFiles = [];
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  updatedFiles += 1;
}

for (const manifestPath of middlewareManifestFiles) {
  const raw = fs.readFileSync(manifestPath, "utf8");
  const updated = raw.replace(
    /"polyfillFiles":\s*\[[\s\S]*?\]/,
    "\"polyfillFiles\": []"
  );

  if (updated === raw) {
    continue;
  }

  fs.writeFileSync(manifestPath, updated, "utf8");
  updatedFiles += 1;
}

let deletedFiles = 0;
for (const polyfillFile of polyfillFiles) {
  const absolutePath = path.join(nextDir, polyfillFile);
  if (!fs.existsSync(absolutePath)) {
    continue;
  }

  fs.unlinkSync(absolutePath);
  deletedFiles += 1;
}

console.log(
  `strip-polyfills: cleared ${clearedEntries} polyfill entries across ${updatedFiles} file(s) and deleted ${deletedFiles} file(s).`
);
