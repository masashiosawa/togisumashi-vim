---
id: tier-2-02-yy-p-03
tier: 2
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - "const b = 2;"
      - "const a = 1;"
start_col: 0
goal:
  type: text_equals
  content: |-
    const a = 1;
    const b = 2;
solution_keys:
  - "ddp"
i18n:
  en:
    title: "Swap lines with ddp"
    description: "The two lines are in the wrong order. Press ddp: dd deletes the current line, p pastes it below the next — swapping them."
  ja:
    title: "ddp で 2 行を入れ替え"
    description: "2 行の順番が逆になっている。ddp を押せ: dd で現在行を削除し、p で次の行の下にペースト — 入れ替え完了。"
---
