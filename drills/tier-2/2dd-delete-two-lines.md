---
id: tier-2-2dd-delete-two-lines
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "delete one"
      - "delete two"
      - "keep this"
goal:
  type: text_equals
  content: "keep this"
solution_keys:
  - "2"
  - "d"
  - "d"
i18n:
  en:
    title: "Delete 2 lines: 2dd"
    description: "Delete the first two lines at once with 2dd.\nCombining count with dd."
  ja:
    title: "2行削除: 2dd"
    description: "2dd で先頭の 2 行を一度に削除する。\nカウントと dd の組み合わせ。"
---
