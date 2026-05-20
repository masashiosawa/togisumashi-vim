import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRILLS_DIR = resolve(__dirname, "../drills");
const OUTPUT = resolve(__dirname, "../web/public/drills.json");

function readDir(dir: string): unknown[] {
  const results: unknown[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...readDir(full));
    } else if (entry.name.endsWith(".md")) {
      const { data } = matter(readFileSync(full, "utf8"));
      if (data.id) results.push(data);
    }
  }
  return results;
}

const drills = readDir(DRILLS_DIR);
drills.sort((a, b) => {
  const da = a as { tier: number; id: string };
  const db = b as { tier: number; id: string };
  return da.tier - db.tier || da.id.localeCompare(db.id);
});

writeFileSync(OUTPUT, JSON.stringify(drills, null, 2) + "\n");
console.log(`✓ ${drills.length} drills → ${OUTPUT}`);
