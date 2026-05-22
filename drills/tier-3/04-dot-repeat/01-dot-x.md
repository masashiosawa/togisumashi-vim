---
id: tier-3-04-dot-repeat-01
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'abcde'
start_col: 0
goal:
  type: text_equals
  content: 'cde'
solution_keys:
  - 'x.'
i18n:
  en:
    title: "Repeat deletion with ."
    description: "Press x to delete 'a', then . to repeat and delete 'b'."
  ja:
    title: ". で削除を繰り返す"
    description: "x で 'a' を削除し、. で繰り返して 'b' を削除せよ。"
---
