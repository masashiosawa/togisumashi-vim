---
id: challenge-02-python-filter
tier: 4
type: edit
target_time_ms: 60000
template:
  - kind: fixed
    lines:
      - 'def process(data):'
      - '    buf = []'
      - '    for obj in data:'
      - '        val = obj.score'
      - '        if val > 0:'
      - '            buf.append(val)'
      - '    return buf'
goal:
  type: text_equals
  content: |
    def collect(data):
        results = []
        for item in data:
            score = item.score
            if score > 0:
                results.append(score)
        return results
solution_keys:
  - '/process<Enter>ciwcollect<Esc>/buf<Enter>ciwresults<Esc>n.n./obj<Enter>ciwitem<Esc>n./val<Enter>ciwscore<Esc>n.n.'
i18n:
  en:
    title: "Python Function Refactor"
    description: "Rename four identifiers throughout this function."
    steps:
      - 'Rename function "process" to "collect"'
      - 'Rename variable "buf" to "results" (3 occurrences)'
      - 'Rename variable "obj" to "item" (2 occurrences)'
      - 'Rename variable "val" to "score" (3 occurrences)'
  ja:
    title: "Python 関数のリネームリファクタ"
    description: "この関数内の 4 つの識別子をすべてリネームせよ。"
    steps:
      - '関数名 "process" を "collect" にリネーム'
      - '変数 "buf" を "results" にリネーム（3 箇所）'
      - '変数 "obj" を "item" にリネーム（2 箇所）'
      - '変数 "val" を "score" にリネーム（3 箇所）'
---
