---
id: tier-3-02-search-03
tier: 3
type: motion
target_time_ms: 7000
template:
  - kind: fixed
    lines:
      - 'baz foo baz foo'
start_col: 0
goal:
  type: col_N
  n: 12
solution_keys:
  - '/foo<Enter>n'
i18n:
  en:
    title: "Repeat search with n"
    description: "Search for \"foo\" to land on the first match, then press n to jump to the second."
  ja:
    title: "n で検索を繰り返す"
    description: "/foo<Enter> で最初のマッチに移動し、n で次のマッチにジャンプせよ。"
---
