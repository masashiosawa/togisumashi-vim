import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRILLS_DIR = resolve(__dirname, "../drills");
const DRILLS_OUTPUT = resolve(__dirname, "../web/public/drills.json");
const LESSONS_OUTPUT = resolve(__dirname, "../web/public/lessons.json");

interface LessonData {
  id: string;
  tier: number;
  order: number;
  title_en: string;
  title_ja: string;
  concept_en?: string;
  concept_ja?: string;
}

function processDir(
  dir: string,
): { drills: unknown[]; lessons: LessonData[] } {
  const drills: unknown[] = [];
  const lessons: LessonData[] = [];

  const entries = readdirSync(dir, { withFileTypes: true });

  let currentLessonId: string | undefined;
  const lessonEntry = entries.find((e) => e.name === "_lesson.md");
  if (lessonEntry) {
    const { data } = matter(readFileSync(join(dir, "_lesson.md"), "utf8"));
    if (data.id) {
      lessons.push(data as LessonData);
      currentLessonId = data.id as string;
    }
  }

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = processDir(full);
      drills.push(...sub.drills);
      lessons.push(...sub.lessons);
    } else if (entry.name.endsWith(".md") && !entry.name.startsWith("_")) {
      const { data } = matter(readFileSync(full, "utf8"));
      if (data.id) {
        drills.push(currentLessonId ? { ...data, lesson: currentLessonId } : data);
      }
    }
  }

  return { drills, lessons };
}

const { drills, lessons } = processDir(DRILLS_DIR);

drills.sort((a, b) => {
  const da = a as { tier: number; id: string };
  const db = b as { tier: number; id: string };
  return da.tier - db.tier || da.id.localeCompare(db.id);
});

lessons.sort((a, b) => a.tier - b.tier || a.order - b.order);

writeFileSync(DRILLS_OUTPUT, JSON.stringify(drills, null, 2) + "\n");
console.log(`✓ ${drills.length} drills → ${DRILLS_OUTPUT}`);

writeFileSync(LESSONS_OUTPUT, JSON.stringify(lessons, null, 2) + "\n");
console.log(`✓ ${lessons.length} lessons → ${LESSONS_OUTPUT}`);
