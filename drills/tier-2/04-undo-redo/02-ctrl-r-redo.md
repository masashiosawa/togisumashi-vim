---
id: tier-2-04-undo-redo-02
tier: 2
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - "const x = 1;"
start_col: 6
goal:
  type: text_equals
  content: "const  = 1;"
solution_keys:
  - "xu<C-r>"
i18n:
  en:
    title: "Redo with Ctrl+r"
    description: "Press x to delete 'x', then u to undo it, then Ctrl+r to redo — the deletion is reapplied."
  ja:
    title: "Ctrl+r でリドゥ"
    description: "x で 'x' を削除し、u で元に戻し、Ctrl+r でリドゥ — 削除が再適用される。"
---
