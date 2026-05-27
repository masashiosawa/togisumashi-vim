---
id: tier-3-08-substitute-04
tier: 3
type: edit
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - 'alpha'
      - 'beta'
      - 'gamma'
start_row: 0
start_col: 0
goal:
  type: text_equals
  content: |
    # alpha
    # beta
    # gamma
solution_keys:
  - ':%s/^/# /<Enter>'
i18n:
  en:
    title: "Prepend to every line with :%s/^/prefix/"
    description: "Use ^ to match the start of each line and insert \"# \" before every line in the file."
  ja:
    title: ":%s/^/prefix/ で全行の先頭にテキストを追加"
    description: "^ で各行の先頭にマッチし、ファイル全行の先頭に \"# \" を挿入せよ。"
---
