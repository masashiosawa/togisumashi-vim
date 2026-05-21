---
id: tier-2-A-append-end
tier: 2
type: edit
target_time_ms: 7000
template:
  - kind: fixed
    lines:
      - "hello"
goal:
  type: text_equals
  content: "hello!"
solution_keys:
  - "A"
  - "!"
  - "<Esc>"
i18n:
  en:
    title: "Append at end: A"
    description: "Append '!' at the end of the line with A.\nA = Insert mode at end of line (no need to $ first)."
  ja:
    title: "行末に追加: A"
    description: "A で行末に '!' を追加する。\nA = 行末でインサートモード（$ の後に i 不要）。"
---
