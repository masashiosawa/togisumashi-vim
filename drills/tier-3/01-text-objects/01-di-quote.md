---
id: tier-3-01-text-objects-01
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'print("hello")'
start_col: 8
goal:
  type: text_equals
  content: 'print("")'
solution_keys:
  - 'di"'
i18n:
  en:
    title: "Delete inside quotes with di\""
    description: "Cursor is inside \"hello\". Delete the content between the quotes, leaving empty quotes."
  ja:
    title: "di\" でクォート内を削除"
    description: "カーソルは \"hello\" の中にある。クォートの間の中身を削除し、空のクォートを残せ。"
---
