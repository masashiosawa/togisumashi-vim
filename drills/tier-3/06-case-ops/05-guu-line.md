---
id: tier-3-06-case-ops-05
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'HELLO WORLD'
start_col: 0
goal:
  type: text_equals
  content: 'hello world'
solution_keys:
  - 'guu'
i18n:
  en:
    title: "Lowercase entire line with guu"
    description: "Press guu to lowercase every character on the current line."
  ja:
    title: "guu で行全体を小文字化"
    description: "guu を押して現在行の全文字を小文字にせよ。"
---
