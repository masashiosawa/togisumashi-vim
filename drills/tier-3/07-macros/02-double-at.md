---
id: tier-3-07-macros-02
tier: 3
type: edit
target_time_ms: 12000
template:
  - kind: fixed
    lines:
      - 'red'
      - 'red'
      - 'red'
start_row: 0
start_col: 0
goal:
  type: text_equals
  content: |
    blue
    blue
    blue
solution_keys:
  - 'qaciwblue<Esc>jq@a@@'
i18n:
  en:
    title: "Repeat last macro with @@"
    description: "Record a macro, play it once with @a, then press @@ to repeat without typing @a again."
  ja:
    title: "@@ で直前のマクロを繰り返す"
    description: "マクロを記録し、@a で 1 回再生した後、@@ を押して @a と打ち直さずに繰り返せ。"
---
