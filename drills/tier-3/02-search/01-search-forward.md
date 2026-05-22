---
id: tier-3-02-search-01
tier: 3
type: motion
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - 'alpha beta gamma'
start_col: 0
goal:
  type: col_N
  n: 11
solution_keys:
  - '/gamma<Enter>'
i18n:
  en:
    title: "Forward search with /"
    description: "Cursor is at the start. Search forward for \"gamma\" and press Enter to jump there."
  ja:
    title: "/ で前方検索"
    description: "カーソルは先頭にある。/gamma<Enter> で \"gamma\" にジャンプせよ。"
---
