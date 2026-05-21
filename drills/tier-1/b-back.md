---
id: tier-1-b-back
tier: 1
type: motion
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - "one two three four five six"
start_col: 14
goal:
  type: col_N
  n: 4
solution_keys:
  - "2"
  - "b"
i18n:
  en:
    title: "Word back: 2b"
    description: "Cursor starts on 'four'. Jump back to 'two' with 2b.\nb = start of previous word. Count prefix works too."
  ja:
    title: "単語後退: 2b"
    description: "カーソルは 'four' の先頭にある。2b で 'two' の先頭へ。\nb = 前の単語先頭へ。カウント prefix も使える。"
---
