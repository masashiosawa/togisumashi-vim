---
id: tier-1-04-file-jump-05
tier: 1
type: motion
target_time_ms: 3000
template:
  - kind: fixed
    lines:
      - "const a = 1;"
      - "const b = 2;"
      - "const c = 3;"
      - "const d = 4;"
      - "const e = 5;"
start_row: 2
goal:
  type: col_start
solution_keys:
  - "gg"
i18n:
  en:
    title: "gg works from anywhere"
    description: "The cursor is on line 3 (middle of file). Press gg — it always jumps to line 1, regardless of where you are."
  ja:
    title: "gg はどこからでも先頭行へ"
    description: "カーソルはファイル中央の 3 行目にある。gg はどこからでも必ず 1 行目に飛ぶ。"
---
