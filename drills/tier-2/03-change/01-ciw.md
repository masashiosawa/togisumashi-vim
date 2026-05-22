---
id: tier-2-03-change-01
tier: 2
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - "let count = 0;"
start_col: 5
goal:
  type: text_equals
  content: "let total = 0;"
solution_keys:
  - "ciwtotal<Esc>"
i18n:
  en:
    title: "Change inner word with ciw"
    description: "The cursor is on 'count'. Press ciw to delete the word, type 'total', then press <Esc>."
  ja:
    title: "ciw で単語を変更"
    description: "カーソルは 'count' の上にある。ciw で単語を削除し、'total' と入力し、<Esc> を押せ。"
---
