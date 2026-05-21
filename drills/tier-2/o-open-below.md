---
id: tier-2-o-open-below
tier: 2
type: edit
target_time_ms: 9000
template:
  - kind: fixed
    lines:
      - "first"
      - "last"
goal:
  type: text_equals
  content: "first\nmiddle\nlast"
solution_keys:
  - "o"
  - "m"
  - "i"
  - "d"
  - "d"
  - "l"
  - "e"
  - "<Esc>"
i18n:
  en:
    title: "Open line below: o"
    description: "Add 'middle' as a new line between first and last with o.\no = open a new line below and enter Insert mode."
  ja:
    title: "下に行を開く: o"
    description: "o を使って first と last の間に 'middle' 行を追加する。\no = 下に新しい行を開いてインサートモードへ。"
---
