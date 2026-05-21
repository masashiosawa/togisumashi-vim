---
id: tier-2-r-replace-char
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "Aello world"
goal:
  type: text_equals
  content: "Hello world"
solution_keys:
  - "r"
  - "H"
i18n:
  en:
    title: "Replace char: r"
    description: "Replace the first character 'A' with 'H' using r.\nr = replace single char, stays in Normal mode."
  ja:
    title: "1文字置換: r"
    description: "r で先頭の 'A' を 'H' に置換する。\nr = 1文字置換、ノーマルモードを維持。"
---
