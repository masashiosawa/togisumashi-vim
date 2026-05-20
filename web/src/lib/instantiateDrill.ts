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
  const firstLine = lines[0];

  let startOffset = 0;
  if (def.start_row === "last") {
    startOffset = text.lastIndexOf("\n") + 1;
    if (def.start_col === "end") {
      const lastLine = lines[lines.length - 1];
      startOffset += Math.max(0, lastLine.length - 1);
    } else if (typeof def.start_col === "number") {
      startOffset += def.start_col;
    }
  } else if (def.start_col === "end") {
    startOffset = Math.max(0, firstLine.length - 1);
  } else if (typeof def.start_col === "number") {
    startOffset = def.start_col;
  }

  let goalOffset = 0;
  let goalText: string | undefined;

  switch (def.goal.type) {
    case "col_end":
      goalOffset = Math.max(0, firstLine.length - 1);
      break;
    case "col_start":
      goalOffset = 0;
      break;
    case "first_nonblank": {
      const idx = firstLine.search(/\S/);
      goalOffset = idx >= 0 ? idx : 0;
      break;
    }
    case "col_N":
      goalOffset = def.goal.n;
      break;
    case "last_line_start":
      goalOffset = text.lastIndexOf("\n") + 1;
      break;
    case "text_equals":
      goalOffset = 0;
      goalText = def.goal.content;
      break;
  }

  return { def, text, startOffset, goalOffset, goalText };
}
