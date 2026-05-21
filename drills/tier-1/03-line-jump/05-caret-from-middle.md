---
id: tier-1-03-line-jump-05
tier: 1
type: motion
target_time_ms: 3000
template:
  - kind: fixed
    lines:
      - "  return foo;"
start_col: 9
goal:
  type: first_nonblank
solution_keys:
  - "^"
i18n:
  en:
    title: "^ works from anywhere on the line"
    description: "The cursor is on 'foo'. Press ^ to jump to the first non-blank ('r') regardless of where you started."
  ja:
    title: "^ はどこからでも最初の非空白に飛ぶ"
    description: "カーソルは 'foo' にある。^ を押せば、どこにいても最初の非空白（'r'）にジャンプできる。"
---
