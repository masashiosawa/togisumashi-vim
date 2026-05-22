---
id: tier-3-04-dot-repeat-02
tier: 3
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - 'foo bar baz'
start_col: 0
goal:
  type: text_equals
  content: 'baz'
solution_keys:
  - 'dw.'
i18n:
  en:
    title: "Repeat word deletion with ."
    description: "Press dw to delete \"foo \", then . to repeat and delete \"bar \"."
  ja:
    title: ". で単語削除を繰り返す"
    description: "dw で \"foo \" を削除し、. で繰り返して \"bar \" を削除せよ。"
---
