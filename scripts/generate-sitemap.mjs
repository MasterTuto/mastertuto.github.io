import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://brenocs.dev.br";
const routesFile = join(root, "src/app/app.routes.ts");
const translationsFile = join(root, "src/app/i18n/translations.ts");
const sectionsFile = join(root, "src/app/data/sections.data.ts");
const outputFile = join(root, "dist/portfolio/browser/sitemap.xml");

function parseRoutePaths(source) {
  const re = /path\s*:\s*['"]([^'"]*)['"]|[{}[\]]/g;
  const tokens = [];
  let match;
  while ((match = re.exec(source)) !== null) {
    tokens.push(
      match[0].startsWith("path")
        ? { type: "path", value: match[1] }
        : { type: match[0] },
    );
  }

  const paths = [];
  const braceStack = [];
  let currentPath = "";

  for (const token of tokens) {
    switch (token.type) {
      case "{":
        braceStack.push({ segment: null, path: currentPath });
        break;
      case "}": {
        const obj = braceStack.pop();
        if (obj.segment !== null) {
          paths.push(obj.path);
        }
        currentPath = braceStack.length
          ? braceStack[braceStack.length - 1].path
          : "";
        break;
      }
      case "path": {
        const parent =
          braceStack.length > 1
            ? braceStack[braceStack.length - 2].path
            : "";
        const fullPath = `${parent}/${token.value}`;
        braceStack[braceStack.length - 1].path = fullPath;
        braceStack[braceStack.length - 1].segment = token.value;
        currentPath = fullPath;
        break;
      }
    }
  }

  return paths;
}

function extractLangKeys(source) {
  return [...source.matchAll(/^\s*"([a-z]{2})"\s*:/gm)].map(
    (match) => match[1],
  );
}

function extractServiceSlugs(source) {
  return [...source.matchAll(/slug:\s*["']([^"']+)["']/g)].map(
    (match) => match[1],
  );
}

function expandPath(path, langKeys, serviceSlugs) {
  if (path.includes(":lang") && path.includes(":service")) {
    return langKeys.flatMap((lang) =>
      serviceSlugs.map((slug) =>
        path.replace(":lang", lang).replace(":service", slug),
      ),
    );
  }
  if (path.includes(":service")) {
    return serviceSlugs.map((slug) => path.replace(":service", slug));
  }
  if (path.includes(":lang")) {
    return langKeys.map((lang) => path.replace(":lang", lang));
  }
  return [path];
}

function normalizePath(path) {
  let normalized = path.replace(/\/+/g, "/");
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  return normalized;
}

const routePaths = parseRoutePaths(readFileSync(routesFile, "utf8"));
const langKeys = extractLangKeys(readFileSync(translationsFile, "utf8"));
const serviceSlugs = extractServiceSlugs(readFileSync(sectionsFile, "utf8"));

const urls = [
  ...new Set(
    routePaths
      .flatMap((path) => expandPath(path, langKeys, serviceSlugs))
      .map(normalizePath)
      .sort(),
  ),
];

const urlset = urls
  .map((url) => `  <url>\n    <loc>${siteUrl}${url}</loc>\n  </url>`)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, sitemap);

console.log(`Sitemap generated: ${outputFile} (${urls.length} URLs)`);
