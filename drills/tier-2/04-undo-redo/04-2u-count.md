---
id: tier-2-04-undo-redo-04
tier: 2
type: edit
target_time_ms: 7000
template:
  - kind: fixed
    lines:
      - "abcd"
start_col: 0
goal:
  type: text_equals
  content: "cd"
solution_keys:
  - "xxxx2u"
i18n:
  en:
    title: "Undo multiple steps with 2u"
    description: "Delete all four characters with x x x x, then press 2u to undo the last two deletions. Only 'cd' is restored."
  ja:
    title: "2u で複数ステップを元に戻す"
    description: "x を 4 回押して全文字を削除し、2u で直前の 2 つの削除を元に戻す。'cd' だけが復元される。"
---
