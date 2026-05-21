import type { DrillDef } from "../types/drill";
import type { Count, LessonMode, Level } from "./storage";

export const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];
export const COUNTS: Count[] = [10, 20, 30];

export interface SessionSummary {
  level: Level;
  total: number;
  successCount: number;
  totalElapsedMs: number;
  fastestRatio: number;
  slowestRatio: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function filterByLevel(drills: DrillDef[], level: Level): DrillDef[] {
  if (level === "beginner") return drills.filter((d) => d.tier === 1);
  if (level === "intermediate") return drills.filter((d) => d.tier === 2);
  return drills;
}

export function buildPool(
  drills: DrillDef[],
  level: Level,
  lessonMode: LessonMode,
  count: Count,
): DrillDef[] {
  if (lessonMode === "guided") return buildGuidedPool(drills, level);
  return buildSkipPool(drills, level, count);
}

export function buildGuidedPool(drills: DrillDef[], level: Level): DrillDef[] {
  const filtered = filterByLevel(drills, level);
  return [...filtered].sort((a, b) => {
    const la = a.lesson ?? "";
    const lb = b.lesson ?? "";
    if (la !== lb) return la.localeCompare(lb);
    return a.id.localeCompare(b.id);
  });
}

export function buildSkipPool(drills: DrillDef[], level: Level, count: Count): DrillDef[] {
  return shuffle(filterByLevel(drills, level)).slice(0, count);
}

export function levelTier(level: Level): 1 | 2 | "mixed" {
  if (level === "beginner") return 1;
  if (level === "intermediate") return 2;
  return "mixed";
}

export function buildPoolFromIds(drills: DrillDef[], ids: string[]): DrillDef[] {
  return ids.map((id) => drills.find((d) => d.id === id)).filter((d): d is DrillDef => !!d);
}
