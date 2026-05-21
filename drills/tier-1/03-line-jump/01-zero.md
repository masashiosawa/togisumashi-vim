---
id: tier-1-03-line-jump-01
tier: 1
type: motion
target_time_ms: 3000
template:
  - kind: fixed
    lines:
      - "const foo = bar;"
start_col: "end"
goal:
  type: col_start
solution_keys:
  - "0"
i18n:
  en:
    title: "Jump to column 0 with 0"
    description: "The cursor is at the end of the line. Press 0 to jump to column 0."
  ja:
    title: "0 で列 0 にジャンプ"
    description: "カーソルは行末にある。0 を押して列 0 にジャンプせよ。"
---
