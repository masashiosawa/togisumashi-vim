import type { DrillDef, DrillInstance, TemplateKind } from "../types/drill";
import { generateRandomLine } from "./generateText";

function generateText(template: TemplateKind): string {
  if (template.kind === "random_text_line") {
    return generateRandomLine(template.chars);
  }
  return template.lines.join("\n");
}

export function instantiateDrill(def: DrillDef): DrillInstance {
  const text = generateText(def.template[0]);
  const lines = text.split("\n");

  function lineStartOffset(row: number): number {
    return lines.slice(0, row).reduce((acc, l) => acc + l.length + 1, 0);
  }

  let startOffset = 0;
  if (def.start_row === "last") {
    const lastRow = lines.length - 1;
    startOffset = lineStartOffset(lastRow);
    if (def.start_col === "end") {
      startOffset += Math.max(0, lines[lastRow].length - 1);
    } else if (typeof def.start_col === "number") {
      startOffset += def.start_col;
    }
  } else if (typeof def.start_row === "number") {
    startOffset = lineStartOffset(def.start_row);
    if (def.start_col === "end") {
      startOffset += Math.max(0, lines[def.start_row].length - 1);
    } else if (typeof def.start_col === "number") {
      startOffset += def.start_col;
    }
  } else if (def.start_col === "end") {
    startOffset = Math.max(0, lines[0].length - 1);
  } else if (typeof def.start_col === "number") {
    startOffset = def.start_col;
  }

  let goalOffset = 0;
  let goalText: string | undefined;

  switch (def.goal.type) {
    case "col_end":
      goalOffset = Math.max(0, lines[0].length - 1);
      break;
    case "col_start":
      goalOffset = 0;
      break;
    case "first_nonblank": {
      const idx = lines[0].search(/\S/);
      goalOffset = idx >= 0 ? idx : 0;
      break;
    }
    case "col_N":
      goalOffset = def.goal.n;
      break;
    case "last_line_start":
      goalOffset = lineStartOffset(lines.length - 1);
      break;
    case "text_equals":
      goalOffset = 0;
      goalText = def.goal.content;
      break;
    case "offset":
      goalOffset = def.goal.offset;
      break;
    case "row_col":
      goalOffset = lineStartOffset(def.goal.row) + def.goal.col;
      break;
  }

  return { def, text, startOffset, goalOffset, goalText };
}
