import type { DrillDef } from "../types/drill";
import type { Level } from "./storage";

export const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];

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

/**
 * 選択レベルからセッション用のドリルプールを構築 (ランダム順)。
 */
export function buildPool(drills: DrillDef[], level: Level): DrillDef[] {
  return shuffle(filterByLevel(drills, level));
}

export function levelTier(level: Level): 1 | 2 | "mixed" {
  if (level === "beginner") return 1;
  if (level === "intermediate") return 2;
  return "mixed";
}

/**
 * 指定したドリル ID リストからプールを構築 (順序は引数の順)。
 * 不明な ID は無視。
 */
export function buildPoolFromIds(drills: DrillDef[], ids: string[]): DrillDef[] {
  return ids.map((id) => drills.find((d) => d.id === id)).filter((d): d is DrillDef => !!d);
}
