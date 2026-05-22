---
id: tier-2-04-undo-redo-01
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "const x = 1;"
start_col: 6
goal:
  type: text_equals
  content: "const x = 1;"
solution_keys:
  - "xu"
i18n:
  en:
    title: "Undo a deletion with u"
    description: "Press x to delete the character under the cursor, then u to undo it. The buffer is fully restored."
  ja:
    title: "u で削除を元に戻す"
    description: "x でカーソル下の文字を削除し、u で元に戻す。バッファは完全に復元される。"
---
