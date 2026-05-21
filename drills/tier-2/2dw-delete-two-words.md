---
id: tier-2-2dw-delete-two-words
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "one two rest of it"
goal:
  type: text_equals
  content: "rest of it"
solution_keys:
  - "2"
  - "d"
  - "w"
i18n:
  en:
    title: "Delete 2 words: 2dw"
    description: "Delete the first two words with 2dw.\nCount prefix scales operators too."
  ja:
    title: "2単語削除: 2dw"
    description: "2dw で最初の 2 単語を削除する。\nカウント prefix はオペレータにも効く。"
---
