---
id: tier-3-08-substitute-05
tier: 3
type: edit
target_time_ms: 9000
template:
  - kind: fixed
    lines:
      - 'int a = 1;'
      - 'int b = 2;'
      - 'int c = 3;'
start_row: 0
start_col: 0
goal:
  type: text_equals
  content: |
    int a = 1
    int b = 2
    int c = 3
solution_keys:
  - ':%s/;$//g<Enter>'
i18n:
  en:
    title: "Strip trailing semicolons with :%s/;$//"
    description: "Use $ to match the semicolon only at end of line, removing it from every line without touching semicolons elsewhere."
  ja:
    title: ":%s/;$// で末尾のセミコロンを削除"
    description: "$ を使って行末のセミコロンだけにマッチし、途中のセミコロンには触れずに全行から削除せよ。"
---
