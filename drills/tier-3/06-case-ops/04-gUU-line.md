---
id: tier-3-06-case-ops-04
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'hello world'
start_col: 0
goal:
  type: text_equals
  content: 'HELLO WORLD'
solution_keys:
  - 'gUU'
i18n:
  en:
    title: "Uppercase entire line with gUU"
    description: "Press gUU to uppercase every character on the current line."
  ja:
    title: "gUU で行全体を大文字化"
    description: "gUU を押して現在行の全文字を大文字にせよ。"
---
