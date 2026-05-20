---
id: tier-2-x-delete-char
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "xHello world"
goal:
  type: text_equals
  content: "Hello world"
solution_keys:
  - "x"
i18n:
  en:
    title: "Delete char: x"
    description: "Delete the character under the cursor with x.\nGoal: make the text read 'Hello world'."
  ja:
    title: "1文字削除: x"
    description: "x でカーソル下の文字を削除する。\n目標: テキストを 'Hello world' にする。"
---
