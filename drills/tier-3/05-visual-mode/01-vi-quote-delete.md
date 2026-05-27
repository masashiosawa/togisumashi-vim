---
id: tier-3-05-visual-mode-01
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'let msg = "hello";'
start_col: 11
goal:
  type: text_equals
  content: 'let msg = "";'
solution_keys:
  - 'vi"d'
i18n:
  en:
    title: "Visual delete inside quotes with vi\"d"
    description: "Cursor is inside \"hello\". Use vi\" to select the content, then d to delete it."
  ja:
    title: "vi\"d でクォート内をビジュアル削除"
    description: "カーソルは \"hello\" の中にある。vi\" で中身を選択し、d で削除せよ。"
---
