---
id: tier-1-05-find-char-04
tier: 1
type: motion
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "foo(a, b, c);"
start_col: 0
goal:
  type: col_N
  n: 8
solution_keys:
  - "f,;"
i18n:
  en:
    title: "Repeat find with ;"
    description: "Press f, to jump to the first ',' (col 5), then ; to repeat and reach the second ',' (col 8)."
  ja:
    title: "; で検索を繰り返す"
    description: "f, で最初の ',' （列 5）に飛び、次に ; を押して繰り返し 2 番目の ',' （列 8）に到達せよ。"
---
