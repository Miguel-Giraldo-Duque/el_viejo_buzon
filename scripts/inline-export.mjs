import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const outDir = path.join(root, "out");
const htmlPath = path.join(outDir, "index.html");

if (!existsSync(htmlPath)) {
  console.error("No está out/index.html. Corré next build con output: export.");
  process.exit(1);
}

const MIME = {
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".gif": "image/gif",
};

function mimeOf(file) {
  return MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
}

function dataUri(file) {
  const buf = readFileSync(file);
  return `data:${mimeOf(file)};base64,${buf.toString("base64")}`;
}

function localFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (!clean.startsWith("/")) return null;
  const rel = clean.replace(/^\/+/, "");
  const candidates = [path.join(outDir, rel), path.join(root, "public", rel)];
  return candidates.find((file) => existsSync(file)) ?? null;
}

let html = readFileSync(htmlPath, "utf8");

html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/gi, (tag) => {
  const href = tag.match(/href="([^"]+)"/)?.[1];
  if (!href || href.startsWith("data:")) return tag;
  const file = localFile(href);
  if (!file) {
    throw new Error(`No encontré el CSS ${href}`);
  }
  let css = readFileSync(file, "utf8");
  css = css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (match, _q, raw) => {
    const url = raw.trim();
    if (url.startsWith("data:") || url.startsWith("#")) return match;
    let asset = null;
    if (url.startsWith("/")) asset = localFile(url);
    else if (!url.startsWith("http")) asset = path.resolve(path.dirname(file), url);
    if (!asset || !existsSync(asset)) {
      throw new Error(`No encontré el asset de CSS ${url}`);
    }
    return `url("${dataUri(asset)}")`;
  });
  return `<style>${css}</style>`;
});

html = html.replace(
  /\b(src|href)="(\/[^"]+)"/g,
  (match, attr, url) => {
    if (url.startsWith("/_next/")) return match;
    const file = localFile(url);
    if (!file) return match;
    const ext = path.extname(file).toLowerCase();
    if (!MIME[ext]) return match;
    return `${attr}="${dataUri(file)}"`;
  },
);

html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
html = html.replace(/<script\b[^>]*\/>/gi, "");
html = html.replace(/<link\b[^>]*rel="(?:preload|modulepreload|prefetch)"[^>]*>/gi, "");

if (html.includes("/_next/")) {
  throw new Error("Quedaron rutas /_next/ en el HTML autocontenido.");
}
if (/fonts\.google|fonts\.gstatic/i.test(html)) {
  throw new Error("El HTML todavía pide fuentes de Google.");
}
if (!html.includes("El Viejo") || !html.includes("noindex")) {
  throw new Error("El HTML no tiene el contenido o el meta robots.");
}

const exportDir = path.join(root, "export");
mkdirSync(exportDir, { recursive: true });
const exportFile = path.join(exportDir, "index.html");
writeFileSync(exportFile, html);

const artifactDir = "/opt/cursor/artifacts";
mkdirSync(artifactDir, { recursive: true });
const artifactFile = path.join(artifactDir, "index.html");
writeFileSync(artifactFile, html);

const tarPath = path.join(artifactDir, "demo.tar.gz");
if (existsSync(tarPath)) rmSync(tarPath);
execFileSync("tar", ["-czf", tarPath, "-C", exportDir, "index.html"]);

console.log(
  `inline: ${exportFile} (${Math.round(html.length / 1024)} KB) -> ${artifactFile}`,
);
