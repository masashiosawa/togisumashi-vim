---
id: tier-3-07-macros-05
tier: 3
type: edit
target_time_ms: 14000
template:
  - kind: fixed
    lines:
      - 'active: true'
      - 'enabled: true'
start_row: 0
start_col: 0
goal:
  type: text_equals
  content: |
    active: false
    enabled: false
solution_keys:
  - 'qa$bciwfalse<Esc>jq@a'
i18n:
  en:
    title: "Macro using $ and b to reach end-of-line value"
    description: "Record a macro: $ to end of line, b back one word to reach \"true\", ciw to change it, j to move down. Replay with @a."
  ja:
    title: "$ と b で行末の値を変更するマクロ"
    description: "$ で行末、b で 1 単語戻って \"true\" に移動、ciw で変更、j で下に移動するマクロを記録し、@a で再生せよ。"
---
