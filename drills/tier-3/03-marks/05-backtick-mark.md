---
id: tier-3-03-marks-05
tier: 3
type: motion
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - '  hello world'
start_col: 2
goal:
  type: col_N
  n: 2
solution_keys:
  - "ma$`a"
i18n:
  en:
    title: "Exact position jump with backtick"
    description: "Set mark a at col 2 with ma, jump to end with $, then return to the exact column with `a."
  ja:
    title: "バッククォートで正確な位置にジャンプ"
    description: "col 2 で ma でマーク設定、$ で末尾に移動し、`a で正確な列位置に戻れ。"
---
