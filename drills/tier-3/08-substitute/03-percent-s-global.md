---
id: tier-3-08-substitute-03
tier: 3
type: edit
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - 'old one'
      - 'old two'
      - 'old three'
start_row: 0
start_col: 0
goal:
  type: text_equals
  content: |
    new one
    new two
    new three
solution_keys:
  - ':%s/old/new/g<Enter>'
i18n:
  en:
    title: "Substitute across all lines with :%s/old/new/g"
    description: "Use % to apply the substitution to every line in the file, replacing all \"old\" with \"new\"."
  ja:
    title: ":%s/old/new/g でファイル全体を置換"
    description: "% でファイル全行に対して置換を適用し、すべての \"old\" を \"new\" に変えよ。"
---
