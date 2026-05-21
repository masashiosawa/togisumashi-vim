---
id: tier-1-03-line-jump-03
tier: 1
type: motion
target_time_ms: 3000
template:
  - kind: fixed
    lines:
      - "  const foo = bar;"
start_col: 0
goal:
  type: first_nonblank
solution_keys:
  - "^"
i18n:
  en:
    title: "Jump to first non-blank with ^"
    description: "The line has 2 spaces of indent. Press ^ to skip them and land on 'c'."
  ja:
    title: "^ で最初の非空白にジャンプ"
    description: "行の先頭に 2 つのスペースがある。^ を押してスキップし、'c' に着地せよ。"
---
