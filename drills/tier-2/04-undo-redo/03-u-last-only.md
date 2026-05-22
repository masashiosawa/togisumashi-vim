---
id: tier-2-04-undo-redo-03
tier: 2
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - "abc"
start_col: 0
goal:
  type: text_equals
  content: "bc"
solution_keys:
  - "xxu"
i18n:
  en:
    title: "u undoes only the last change"
    description: "Press x twice (deleting 'a', then 'b'), then u. Only the deletion of 'b' is undone — 'a' stays gone."
  ja:
    title: "u は最後の変更だけを元に戻す"
    description: "x を 2 回押して 'a' と 'b' を削除し、u を押す。元に戻るのは 'b' の削除だけ — 'a' は消えたまま。"
---
