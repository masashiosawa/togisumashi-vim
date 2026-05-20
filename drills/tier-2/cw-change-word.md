---
id: tier-2-cw-change-word
tier: 2
type: edit
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - "bad practice"
goal:
  type: text_equals
  content: "good practice"
solution_keys:
  - "c"
  - "w"
  - "g"
  - "o"
  - "o"
  - "d"
  - "<Esc>"
i18n:
  en:
    title: "Change word: cw"
    description: "Change 'bad' to 'good' with cw.\ncw = delete word and enter Insert mode."
  ja:
    title: "単語変更: cw"
    description: "cw で 'bad' を 'good' に変更する。\ncw = 単語を削除してインサートモードへ。"
---
