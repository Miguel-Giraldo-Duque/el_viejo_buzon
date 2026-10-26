import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const yaml = require("js-yaml");

const root = process.cwd();
const brand = yaml.load(readFileSync(path.join(root, "brand.yaml"), "utf8"));

function decl(bag) {
  return Object.entries(bag)
    .filter(([key]) => key.startsWith("--"))
    .map(([key, value]) => `  ${key}: ${String(value).trim()};`)
    .join("\n");
}

const meta = brand.meta ?? {};
const css = `/* Generated from brand.yaml by scripts/generate-theme.mjs. Do not edit by hand. */
/* ${meta.slug ?? "local"} v${meta.version ?? "?"} ${meta.estado ?? ""} ${meta.fecha ?? ""} */
:root {
${decl(brand.css_variables ?? {})}
${decl(brand.shadcn_mapping ?? {})}
}
`;

const outDir = path.join(root, "app", "generated");
mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "tokens.css");
writeFileSync(outFile, css);
console.log(`tokens: ${outFile}`);
