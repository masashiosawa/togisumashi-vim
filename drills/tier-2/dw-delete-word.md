---
id: tier-2-dw-delete-word
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "remove rest of line"
goal:
  type: text_equals
  content: "rest of line"
solution_keys:
  - "d"
  - "w"
i18n:
  en:
    title: "Delete word: dw"
    description: "Delete the first word with dw.\ndw = delete to next word start (including space)."
  ja:
    title: "単語削除: dw"
    description: "dw で最初の単語を削除する。\ndw = 次の単語先頭まで削除（スペース含む）。"
---
