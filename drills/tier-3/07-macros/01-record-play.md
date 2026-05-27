---
id: tier-3-07-macros-01
tier: 3
type: edit
target_time_ms: 10000
template:
  - kind: fixed
    lines:
      - 'down'
      - 'down'
start_row: 0
start_col: 0
goal:
  type: text_equals
  content: |
    up
    up
solution_keys:
  - 'qaciwup<Esc>jq@a'
i18n:
  en:
    title: "Record macro and replay with @a"
    description: "Record a macro (qa) that changes the word and moves down (j), stop with q, then replay it once with @a."
  ja:
    title: "マクロを記録して @a で再生"
    description: "単語変更と下移動（j）を qa で記録し、q で停止、@a で 1 回再生せよ。"
---
