---
id: tier-3-02-search-02
tier: 3
type: motion
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - 'gamma beta alpha'
start_col: 0
goal:
  type: col_N
  n: 11
solution_keys:
  - '?alpha<Enter>'
i18n:
  en:
    title: "Backward search with ?"
    description: "Cursor is at the start. Search backward for \"alpha\" — it wraps around to the end."
  ja:
    title: "? で後方検索"
    description: "カーソルは先頭にある。?alpha<Enter> で後方検索 — 末尾をまわって \"alpha\" にジャンプする。"
---
