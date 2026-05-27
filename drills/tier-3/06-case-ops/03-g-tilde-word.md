---
id: tier-3-06-case-ops-03
tier: 3
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - 'print hElLo'
start_col: 6
goal:
  type: text_equals
  content: 'print HeLlO'
solution_keys:
  - 'g~iw'
i18n:
  en:
    title: "Toggle case with g~iw"
    description: "Cursor is on \"hElLo\". Press g~iw to toggle the case of every character in the word."
  ja:
    title: "g~iw で大文字・小文字をトグル"
    description: "カーソルは \"hElLo\" にある。g~iw を押して単語の各文字の大文字・小文字をトグルせよ。"
---
