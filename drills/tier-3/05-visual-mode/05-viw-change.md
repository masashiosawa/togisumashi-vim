---
id: tier-3-05-visual-mode-05
tier: 3
type: edit
target_time_ms: 7000
template:
  - kind: fixed
    lines:
      - 'const oldVar = true;'
start_col: 6
goal:
  type: text_equals
  content: 'const newVar = true;'
solution_keys:
  - 'viwcnewVar<Esc>'
i18n:
  en:
    title: "Visual inner word change with viwc"
    description: "Cursor is on \"oldVar\". Use viw to select the word, c to change it, then type the replacement."
  ja:
    title: "viw で単語を選択して変更"
    description: "カーソルは \"oldVar\" にある。viw で単語を選択し、c で変更モードに入り新しい名前を入力せよ。"
---
