---
id: tier-1-caret
tier: 1
type: motion
target_time_ms: 4000
template:
  - kind: fixed
    lines:
      - "    hello vim world"
start_col: "end"
goal:
  type: first_nonblank
solution_keys:
  - "^"
i18n:
  en:
    title: "First non-blank: ^"
    description: "Jump to the first non-blank character with ^.\nDifferent from 0 — ignores leading whitespace."
  ja:
    title: "最初の非空白文字: ^"
    description: "^ で最初の非空白文字へジャンプする。\n0 とは違い、行頭の空白をスキップする。"
---
