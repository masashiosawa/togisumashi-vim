---
id: tier-3-06-case-ops-02
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'const VALUE = 42;'
start_col: 6
goal:
  type: text_equals
  content: 'const value = 42;'
solution_keys:
  - 'guiw'
i18n:
  en:
    title: "Lowercase word with guiw"
    description: "Cursor is on \"VALUE\". Press guiw to lowercase the entire word."
  ja:
    title: "guiw で単語を小文字化"
    description: "カーソルは \"VALUE\" にある。guiw を押して単語全体を小文字にせよ。"
---
