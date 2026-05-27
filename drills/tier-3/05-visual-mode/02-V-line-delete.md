---
id: tier-3-05-visual-mode-02
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'first: true'
      - 'debug: true'
start_row: 1
start_col: 0
goal:
  type: text_equals
  content: 'first: true'
solution_keys:
  - 'Vd'
i18n:
  en:
    title: "Delete whole line with Vd"
    description: "Cursor is on the second line. Press V to select the entire line, then d to delete it."
  ja:
    title: "Vd で行全体を削除"
    description: "カーソルは 2 行目にある。V で行全体を選択し、d で削除せよ。"
---
