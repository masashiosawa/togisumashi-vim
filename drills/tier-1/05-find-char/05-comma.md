---
id: tier-1-05-find-char-05
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
  n: 5
solution_keys:
  - "f,;,"
i18n:
  en:
    title: "Reverse find with ,"
    description: "Press f,; to reach the second ',' (col 8), then , to reverse back to the first ',' (col 5)."
  ja:
    title: ", で検索方向を逆にする"
    description: "f,; で 2 番目の ',' （列 8）に進み、, を押して逆方向に戻り最初の ',' （列 5）に着地せよ。"
---
