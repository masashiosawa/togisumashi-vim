export type Level = "beginner" | "intermediate" | "advanced" | "master";
export type Mode = "practice" | "test";
export type LessonMode = "lessons" | "random";
export type Count = 10 | 20 | 30;

export interface Attempt {
  drillId: string;
  success: boolean;
  elapsedMs: number;
  targetMs: number;
  timestamp: number;
}

const ATTEMPT_KEY = "togisumashi-vim:attempts";
const PREFS_KEY = "togisumashi-vim:prefs";
const MAX_ATTEMPTS = 500;

interface Prefs {
  lastLevel?: Level;
  lastMode?: Mode;
  lastLessonMode?: LessonMode;
  lastCount?: Count;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadAttempts(): Attempt[] {
  if (typeof window === "undefined") return [];
  return safeParse<Attempt[]>(window.localStorage.getItem(ATTEMPT_KEY), []);
}

export function recordAttempt(a: Attempt): void {
  if (typeof window === "undefined") return;
  const all = loadAttempts();
  all.push(a);
  const trimmed = all.length > MAX_ATTEMPTS ? all.slice(-MAX_ATTEMPTS) : all;
  window.localStorage.setItem(ATTEMPT_KEY, JSON.stringify(trimmed));
}

interface RawPrefs extends Omit<Prefs, "lastLessonMode"> {
  lastLessonMode?: LessonMode | "guided" | "skip";
}

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return {};
  const raw = safeParse<RawPrefs>(window.localStorage.getItem(PREFS_KEY), {});
  if (raw.lastLessonMode === "guided") raw.lastLessonMode = "lessons";
  else if (raw.lastLessonMode === "skip") raw.lastLessonMode = "random";
  return raw as Prefs;
}

function savePrefs(p: Prefs): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREFS_KEY, JSON.stringify(p));
}

export function loadLastLevel(): Level | null {
  return loadPrefs().lastLevel ?? null;
}

export function saveLastLevel(level: Level): void {
  savePrefs({ ...loadPrefs(), lastLevel: level });
}

export function loadLastMode(): Mode {
  return loadPrefs().lastMode ?? "practice";
}

export function saveLastMode(mode: Mode): void {
  savePrefs({ ...loadPrefs(), lastMode: mode });
}

export function loadLastLessonMode(): LessonMode {
  return loadPrefs().lastLessonMode ?? "lessons";
}

export function saveLastLessonMode(lm: LessonMode): void {
  savePrefs({ ...loadPrefs(), lastLessonMode: lm });
}

export function loadLastCount(): Count {
  return loadPrefs().lastCount ?? 10;
}

export function saveLastCount(c: Count): void {
  savePrefs({ ...loadPrefs(), lastCount: c });
}

/**
 * 各ドリルの「最近の elapsed/target 比の平均」を計算し、平均が悪い順 (大きい順) に
 * 候補内ドリル ID を返す。試行が無いドリルは末尾。
 */
export function rankByWeakness(
  candidateIds: string[],
  recentPerDrill = 5,
): { drillId: string; score: number; samples: number }[] {
  const all = loadAttempts();
  const grouped = new Map<string, Attempt[]>();
  for (const a of all) {
    const arr = grouped.get(a.drillId) ?? [];
    arr.push(a);
    grouped.set(a.drillId, arr);
  }

  return candidateIds
    .map((id) => {
      const recent = (grouped.get(id) ?? []).slice(-recentPerDrill);
      if (recent.length === 0) return { drillId: id, score: 0, samples: 0 };
      const sum = recent.reduce((acc, a) => {
        const ratio = a.success ? a.elapsedMs / a.targetMs : 2.0;
        return acc + ratio;
      }, 0);
      return { drillId: id, score: sum / recent.length, samples: recent.length };
    })
    .sort((a, b) => b.score - a.score);
}

export function getWeakDrills(candidateIds: string[], limit = 3): string[] {
  return rankByWeakness(candidateIds)
    .filter((r) => r.samples > 0 && r.score > 1.0)
    .slice(0, limit)
    .map((r) => r.drillId);
}
