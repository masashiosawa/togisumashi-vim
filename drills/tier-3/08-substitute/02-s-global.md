---
id: tier-3-08-substitute-02
tier: 3
type: edit
target_time_ms: 7000
template:
  - kind: fixed
    lines:
      - 'foo and foo'
start_col: 0
goal:
  type: text_equals
  content: 'bar and bar'
solution_keys:
  - ':s/foo/bar/g<Enter>'
i18n:
  en:
    title: "Substitute all on line with :s/old/new/g"
    description: "Replace every \"foo\" on the current line using the g (global) flag."
  ja:
    title: ":s/old/new/g で行内の全マッチを置換"
    description: "g フラグを使って現在行のすべての \"foo\" を置換せよ。"
---
