---
id: tier-3-03-marks-03
tier: 3
type: motion
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - 'line one'
      - 'line two'
      - 'line three'
start_row: 2
start_col: 0
goal:
  type: row_col
  row: 2
  col: 0
solution_keys:
  - "mzgg'z"
i18n:
  en:
    title: "Mark with mz and return"
    description: "Start on the last line. Set mark z with mz, jump to the top with gg, then return with 'z."
  ja:
    title: "mz でマーク設定して戻る"
    description: "最終行から開始。mz でマーク z を設定し、gg で先頭に移動してから 'z で戻れ。"
---
