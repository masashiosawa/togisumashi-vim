---
id: tier-3-05-visual-mode-04
tier: 3
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - 'value = 10  # remove this'
start_col: 10
goal:
  type: text_equals
  content: 'value = 10'
solution_keys:
  - 'v$d'
i18n:
  en:
    title: "Visual delete to end of line with v$d"
    description: "Cursor is at the trailing space. Press v then $ to select to end of line, then d to delete."
  ja:
    title: "v$d で行末までビジュアル削除"
    description: "カーソルはコメント前のスペースにある。v から $ で行末まで選択し、d で削除せよ。"
---
