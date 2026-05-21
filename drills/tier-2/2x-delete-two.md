---
id: tier-2-2x-delete-two
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "xxHello"
goal:
  type: text_equals
  content: "Hello"
solution_keys:
  - "2"
  - "x"
i18n:
  en:
    title: "Count delete: 2x"
    description: "Delete 2 characters at once with 2x.\nCount prefix works with x too."
  ja:
    title: "カウント削除: 2x"
    description: "2x で一度に 2 文字削除する。\nカウント prefix は x でも使える。"
---
