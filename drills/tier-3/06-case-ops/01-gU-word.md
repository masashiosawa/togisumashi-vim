---
id: tier-3-06-case-ops-01
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'const name = 1;'
start_col: 6
goal:
  type: text_equals
  content: 'const NAME = 1;'
solution_keys:
  - 'gUiw'
i18n:
  en:
    title: "Uppercase word with gUiw"
    description: "Cursor is on \"name\". Press gUiw to uppercase the entire word."
  ja:
    title: "gUiw で単語を大文字化"
    description: "カーソルは \"name\" にある。gUiw を押して単語全体を大文字にせよ。"
---
