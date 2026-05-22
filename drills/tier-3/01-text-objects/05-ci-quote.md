---
id: tier-3-01-text-objects-05
tier: 3
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - 'msg = "old"'
start_col: 7
goal:
  type: text_equals
  content: 'msg = "new"'
solution_keys:
  - 'ci"new<Esc>'
i18n:
  en:
    title: "Change inside quotes with ci\""
    description: "Cursor is on the opening quote. Replace \"old\" with \"new\" inside the quotes."
  ja:
    title: "ci\" でクォート内を変更"
    description: "カーソルは開きクォートの上にある。クォート内の \"old\" を \"new\" に置き換えよ。"
---
