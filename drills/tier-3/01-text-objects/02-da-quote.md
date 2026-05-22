---
id: tier-3-01-text-objects-02
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'x = "value" + y'
start_col: 5
goal:
  type: text_equals
  content: 'x =  + y'
solution_keys:
  - 'da"'
i18n:
  en:
    title: "Delete around quotes with da\""
    description: "Cursor is on the opening quote. Delete \"value\" including both quote marks."
  ja:
    title: "da\" でクォートごと削除"
    description: "カーソルは開きクォートの上にある。クォートマークを含めて \"value\" 全体を削除せよ。"
---
