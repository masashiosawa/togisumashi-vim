---
id: tier-3-07-macros-04
tier: 3
type: edit
target_time_ms: 14000
template:
  - kind: fixed
    lines:
      - 'apple'
      - 'banana'
      - 'cherry'
start_row: 0
start_col: 0
goal:
  type: text_equals
  content: |
    - apple
    - banana
    - cherry
solution_keys:
  - 'qaI- <Esc>jq2@a'
i18n:
  en:
    title: "Macro to prepend text to each line"
    description: "Record a macro that inserts \"- \" at the start of the line (I) and moves down, then replay it twice with 2@a."
  ja:
    title: "各行の先頭にテキストを追加するマクロ"
    description: "行頭に \"- \" を挿入（I）して下に移動するマクロを記録し、2@a で 2 回再生せよ。"
---
