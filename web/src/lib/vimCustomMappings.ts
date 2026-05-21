import { Vim } from "@replit/codemirror-vim";

// g_ is not in @replit/codemirror-vim's default key map, so we add it here.
// It moves the cursor to the last non-blank character of the current line.
Vim.defineMotion("moveToLastNonBlankChar", (cm, head) => {
  const lineText: string = cm.getLine(head.line);
  let col = lineText.length - 1;
  while (col > 0 && (lineText[col] === " " || lineText[col] === "\t")) {
    col--;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { line: head.line, ch: Math.max(0, col) } as any;
});

Vim.mapCommand("g_", "motion", "moveToLastNonBlankChar", {}, {});
