---
id: tier-2-02-yy-p-02
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "const a = 1;"
      - "const b = 2;"
start_row: 1
start_col: 0
goal:
  type: text_equals
  content: |-
    const a = 1;
    const b = 2;
    const b = 2;
solution_keys:
  - "yyP"
i18n:
  en:
    title: "Duplicate line above with yyP"
    description: "The cursor is on line 2. Press yyP to yank it and paste a copy above the current line."
  ja:
    title: "yyP で行を上に複製"
    description: "カーソルは 2 行目にある。yyP で現在行をヤンクし、その直上に複製せよ。"
---
