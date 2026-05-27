---
id: tier-3-08-substitute-01
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
  content: 'bar and foo'
solution_keys:
  - ':s/foo/bar/<Enter>'
i18n:
  en:
    title: "Substitute first match with :s/old/new/"
    description: "Replace only the first \"foo\" on the line. Without the g flag, :s stops after the first match."
  ja:
    title: ":s/old/new/ で最初のマッチを置換"
    description: "行の最初の \"foo\" だけを置換せよ。g フラグなしの :s は最初のマッチで止まる。"
---
