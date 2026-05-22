---
id: tier-2-02-yy-p-01
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "const a = 1;"
start_col: 0
goal:
  type: text_equals
  content: |-
    const a = 1;
    const a = 1;
solution_keys:
  - "yyp"
i18n:
  en:
    title: "Duplicate line below with yyp"
    description: "Press yyp to yank the line and paste a copy directly below it."
  ja:
    title: "yyp で行を下に複製"
    description: "yyp を押して現在行をヤンクし、その直下に複製せよ。"
---
