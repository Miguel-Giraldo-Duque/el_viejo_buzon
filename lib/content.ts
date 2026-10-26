import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";
import type { Site } from "./types";

export function getSite(): Site {
  const file = path.join(process.cwd(), "content.yaml");
  const raw = fs.readFileSync(file, "utf8");
  return load(raw) as Site;
}
