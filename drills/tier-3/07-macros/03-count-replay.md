---
id: tier-3-07-macros-03
tier: 3
type: edit
target_time_ms: 12000
template:
  - kind: fixed
    lines:
      - 'foo'
      - 'foo'
      - 'foo'
start_row: 0
start_col: 0
goal:
  type: text_equals
  content: |
    bar
    bar
    bar
solution_keys:
  - 'qaciwbar<Esc>jq2@a'
i18n:
  en:
    title: "Run macro N times with 2@a"
    description: "Record a macro that changes the word and moves down, then use 2@a to replay it twice and process the remaining lines."
  ja:
    title: "2@a でマクロを N 回実行"
    description: "単語変更と下移動のマクロを記録し、2@a で 2 回再生して残りの行を処理せよ。"
---
