---
id: tier-3-01-text-objects-04
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - '{ key: val }'
start_col: 6
goal:
  type: text_equals
  content: '{}'
solution_keys:
  - 'di{'
i18n:
  en:
    title: "Delete inside braces with di{"
    description: "Cursor is inside the braces. Delete all content, leaving empty braces."
  ja:
    title: "di{ で波括弧内を削除"
    description: "カーソルは波括弧の中にある。中身をすべて削除し、空の波括弧を残せ。"
---
