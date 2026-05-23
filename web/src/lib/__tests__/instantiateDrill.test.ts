import { describe, expect, it } from "vitest";
import type { DrillDef } from "../../types/drill";
import { instantiateDrill } from "../instantiateDrill";

function makeDrill(overrides: Partial<DrillDef>): DrillDef {
  return {
    id: "test",
    tier: 1,
    type: "motion",
    target_time_ms: 5000,
    template: [{ kind: "fixed", lines: ["hello world"] }],
    goal: { type: "col_end" },
    solution_keys: ["$"],
    i18n: {
      en: { title: "Test", description: "" },
      ja: { title: "Test", description: "" },
    },
    ...overrides,
  };
}

describe("instantiateDrill — text_equals goal (tier 4)", () => {
  it("sets goalText from goal.content", () => {
    const drill = makeDrill({
      type: "edit",
      goal: { type: "text_equals", content: "const x = 1;\n" },
    });
    const inst = instantiateDrill(drill);
    expect(inst.goalText).toBe("const x = 1;\n");
  });

  it("sets goalOffset to 0 for text_equals", () => {
    const drill = makeDrill({
      type: "edit",
      goal: { type: "text_equals", content: "foo\n" },
    });
    const inst = instantiateDrill(drill);
    expect(inst.goalOffset).toBe(0);
  });

  it("produces multi-line text from fixed template", () => {
    const lines = ["class Foo {", "  bar = 1;", "}"];
    const drill = makeDrill({
      type: "edit",
      template: [{ kind: "fixed", lines }],
      goal: { type: "text_equals", content: "class Foo {\n  bar = 2;\n}\n" },
    });
    const inst = instantiateDrill(drill);
    expect(inst.text).toBe(lines.join("\n"));
    expect(inst.startOffset).toBe(0);
  });
});

describe("instantiateDrill — start positions", () => {
  it("default start = offset 0", () => {
    const inst = instantiateDrill(makeDrill({}));
    expect(inst.startOffset).toBe(0);
  });

  it("start_col: 'end' places cursor at last char of first line", () => {
    const drill = makeDrill({
      template: [{ kind: "fixed", lines: ["hello"] }],
      start_col: "end",
      goal: { type: "col_start" },
    });
    const inst = instantiateDrill(drill);
    expect(inst.startOffset).toBe(4); // "hello" length 5, end = 4
  });

  it("start_col: number sets absolute column offset", () => {
    const drill = makeDrill({
      template: [{ kind: "fixed", lines: ["hello world"] }],
      start_col: 6,
      goal: { type: "col_end" },
    });
    const inst = instantiateDrill(drill);
    expect(inst.startOffset).toBe(6);
  });

  it("start_row: 'last' positions cursor on last line", () => {
    const drill = makeDrill({
      template: [{ kind: "fixed", lines: ["line1", "line2", "line3"] }],
      start_row: "last",
      goal: { type: "last_line_start" },
    });
    const inst = instantiateDrill(drill);
    // line1\nline2\n = 12 chars, last line starts at offset 12
    expect(inst.startOffset).toBe(12);
  });
});

describe("instantiateDrill — goal offsets", () => {
  it("col_end on row 0 resolves to last char of first line", () => {
    const drill = makeDrill({
      template: [{ kind: "fixed", lines: ["hello"] }],
      goal: { type: "col_end", row: 0 },
    });
    const inst = instantiateDrill(drill);
    expect(inst.goalOffset).toBe(4);
  });

  it("col_start resolves to offset 0", () => {
    const drill = makeDrill({ goal: { type: "col_start" } });
    const inst = instantiateDrill(drill);
    expect(inst.goalOffset).toBe(0);
  });

  it("last_line_start resolves to correct offset in multi-line text", () => {
    const drill = makeDrill({
      template: [{ kind: "fixed", lines: ["abc", "de", "f"] }],
      goal: { type: "last_line_start" },
    });
    const inst = instantiateDrill(drill);
    // "abc\n" (4) + "de\n" (3) = 7
    expect(inst.goalOffset).toBe(7);
  });

  it("row_col resolves to correct offset", () => {
    const drill = makeDrill({
      template: [{ kind: "fixed", lines: ["abc", "defgh"] }],
      goal: { type: "row_col", row: 1, col: 3 },
    });
    const inst = instantiateDrill(drill);
    // row 1 starts at offset 4 ("abc\n"), col 3 = offset 7
    expect(inst.goalOffset).toBe(7);
  });
});
