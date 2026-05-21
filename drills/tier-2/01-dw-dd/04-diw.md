---
id: tier-2-01-dw-dd-04
tier: 2
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - "foo = bar + baz"
start_col: 6
goal:
  type: text_equals
  content: "foo =  + baz"
solution_keys:
  - "diw"
i18n:
  en:
    title: "Delete inner word with diw"
    description: "The cursor is inside \"bar\". Delete the word, leaving surrounding spaces intact."
  ja:
    title: "diw で内側の単語を削除"
    description: "カーソルは \"bar\" の中にある。周囲のスペースを残しながら単語を削除せよ。"
---
