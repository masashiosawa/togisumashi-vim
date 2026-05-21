---
id: tier-2-daw-delete-word
tier: 2
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - "keep delete keep"
goal:
  type: text_equals
  content: "keep keep"
solution_keys:
  - "w"
  - "d"
  - "a"
  - "w"
i18n:
  en:
    title: "Delete a word: daw"
    description: "Delete 'delete' (the middle word) with w then daw.\ndaw = delete a word including surrounding spaces."
  ja:
    title: "単語削除 (daw)"
    description: "w で移動後 daw で中間の単語 'delete' を削除する。\ndaw = 前後のスペースごと単語を削除。"
---
