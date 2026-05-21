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

const LESSON_REQUIRED = ["id", "tier", "order", "title_en", "title_ja"] as const;

function validateLesson(
  data: Record<string, unknown>,
  filePath: string,
): data is LessonData {
  for (const field of LESSON_REQUIRED) {
    if (data[field] == null) {
      console.warn(`⚠ ${filePath}: missing required field "${field}", skipping lesson`);
      return false;
    }
  }
  return true;
}

function validateDrill(data: Record<string, unknown>, filePath: string): boolean {
  if (data.id == null) {
    console.warn(`⚠ ${filePath}: missing "id", skipping drill`);
    return false;
  }
  return true;
}

function processDir(dir: string): { drills: unknown[]; lessons: LessonData[] } {
  const drills: unknown[] = [];
  const lessons: LessonData[] = [];

  const entries = readdirSync(dir, { withFileTypes: true });

  // Scan _lesson.md first so currentLessonId is set before processing drill files
  let currentLessonId: string | undefined;
  const lessonEntry = entries.find((e) => e.name === "_lesson.md");
  if (lessonEntry) {
    const fullPath = join(dir, "_lesson.md");
    const { data } = matter(readFileSync(fullPath, "utf8"));
    if (validateLesson(data as Record<string, unknown>, fullPath)) {
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
      if (validateDrill(data as Record<string, unknown>, full)) {
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
