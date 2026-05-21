---
id: tier-2-cc-change-line
tier: 2
type: edit
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - "wrong line content"
goal:
  type: text_equals
  content: "right line content"
solution_keys:
  - "c"
  - "c"
  - "r"
  - "i"
  - "g"
  - "h"
  - "t"
  - " "
  - "l"
  - "i"
  - "n"
  - "e"
  - " "
  - "c"
  - "o"
  - "n"
  - "t"
  - "e"
  - "n"
  - "t"
  - "<Esc>"
i18n:
  en:
    title: "Change line: cc"
    description: "Replace the entire line with cc.\ncc = clear line and enter Insert mode."
  ja:
    title: "行変更: cc"
    description: "cc で行全体を置き換える。\ncc = 行をクリアしてインサートモードへ。"
---
