import { describe, expect, it } from "vitest";
import type { DrillDef } from "../../types/drill";
import { buildLessonsPool, buildRandomPool, filterByLevel } from "../session";

function makeDrill(id: string, tier: 1 | 2 | 3 | 4, lesson?: string): DrillDef {
  return {
    id,
    tier,
    type: "motion",
    lesson,
    target_time_ms: 5000,
    template: [{ kind: "fixed", lines: ["hello world"] }],
    goal: { type: "col_end" },
    solution_keys: ["$"],
    i18n: {
      en: { title: id, description: "" },
      ja: { title: id, description: "" },
    },
  };
}

const drills: DrillDef[] = [
  makeDrill("t1a", 1, "lesson-01"),
  makeDrill("t1b", 1, "lesson-01"),
  makeDrill("t2a", 2, "lesson-02"),
  makeDrill("t2b", 2, "lesson-02"),
  makeDrill("t3a", 3, "lesson-03"),
  makeDrill("t3b", 3, "lesson-03"),
  makeDrill("c1", 4),
  makeDrill("c2", 4),
];

describe("filterByLevel", () => {
  it("beginner returns only tier 1", () => {
    const result = filterByLevel(drills, "beginner");
    expect(result.every((d) => d.tier === 1)).toBe(true);
    expect(result).toHaveLength(2);
  });

  it("intermediate returns only tier 2", () => {
    const result = filterByLevel(drills, "intermediate");
    expect(result.every((d) => d.tier === 2)).toBe(true);
    expect(result).toHaveLength(2);
  });

  it("advanced returns only tier 3", () => {
    const result = filterByLevel(drills, "advanced");
    expect(result.every((d) => d.tier === 3)).toBe(true);
    expect(result).toHaveLength(2);
  });

  it("master returns only tier 4", () => {
    const result = filterByLevel(drills, "master");
    expect(result.every((d) => d.tier === 4)).toBe(true);
    expect(result).toHaveLength(2);
  });
});

describe("buildRandomPool", () => {
  it("respects count limit", () => {
    const pool = buildRandomPool(drills, "advanced", 10);
    expect(pool.length).toBeLessThanOrEqual(10);
    expect(pool.every((d) => d.tier === 3)).toBe(true);
  });

  it("returns at most available drills when count exceeds pool size", () => {
    const pool = buildRandomPool(drills, "beginner", 30);
    expect(pool.length).toBeLessThanOrEqual(2);
  });

  it("never includes drills from other tiers", () => {
    for (let i = 0; i < 10; i++) {
      const pool = buildRandomPool(drills, "advanced", 30);
      expect(pool.every((d) => d.tier === 3)).toBe(true);
    }
  });
});

describe("buildLessonsPool", () => {
  it("sorts by lesson id then drill id", () => {
    const pool = buildLessonsPool(drills, "advanced");
    for (let i = 1; i < pool.length; i++) {
      const a = pool[i - 1];
      const b = pool[i];
      const la = a.lesson ?? "";
      const lb = b.lesson ?? "";
      if (la === lb) {
        expect(a.id.localeCompare(b.id)).toBeLessThanOrEqual(0);
      } else {
        expect(la.localeCompare(lb)).toBeLessThanOrEqual(0);
      }
    }
  });

  it("returns only the selected tier", () => {
    const pool = buildLessonsPool(drills, "advanced");
    expect(pool.every((d) => d.tier === 3)).toBe(true);
    expect(pool).toHaveLength(2);
  });
});
