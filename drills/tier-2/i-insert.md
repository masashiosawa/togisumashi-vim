---
id: tier-2-i-insert
tier: 2
type: edit
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - "world"
goal:
  type: text_equals
  content: "hello world"
solution_keys:
  - "i"
  - "h"
  - "e"
  - "l"
  - "l"
  - "o"
  - " "
  - "<Esc>"
i18n:
  en:
    title: "Insert before: i"
    description: "Insert 'hello ' before 'world' with i.\ni = enter Insert mode before cursor, <Esc> to return."
  ja:
    title: "前に挿入: i"
    description: "'world' の前に 'hello ' を挿入する（i を使用）。\ni = カーソル前でインサートモードへ、<Esc> で戻る。"
---
