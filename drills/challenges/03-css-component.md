---
id: challenge-03-css-component
tier: 4
type: edit
target_time_ms: 50000
template:
  - kind: fixed
    lines:
      - '.card {'
      - '  background: #fff;'
      - '  border: 2px solid #cccccc;'
      - '  border-radius: 4px;'
      - '  padding: 16px;'
      - '  color: #333;'
      - '}'
      - ''
      - '.card-title {'
      - '  font-size: 18px;'
      - '  font-weight: 600;'
      - '  margin-bottom: 8px;'
      - '}'
goal:
  type: text_equals
  content: |
    .panel {
      background: #f8f9fa;
      border: 2px solid #cccccc;
      border-radius: 12px;
      padding: 24px;
      color: #333;
    }

    .panel-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
    }
solution_keys:
  - '/card<Enter>ciwpanel<Esc>n./fff<Enter>ciw#f8f9fa<Esc>/4px<Enter>cw12px<Esc>/16px<Enter>cw24px<Esc>/18px<Enter>cw20px<Esc>'
i18n:
  en:
    title: "CSS Component Redesign"
    description: "Update class names and design tokens."
    steps:
      - 'Rename ".card" to ".panel" (2 occurrences: .card and .card-title)'
      - 'Change background from #fff to #f8f9fa'
      - 'Change border-radius from 4px to 12px'
      - 'Change padding from 16px to 24px'
      - 'Change title font-size from 18px to 20px'
  ja:
    title: "CSS コンポーネントのリデザイン"
    description: "クラス名とデザイントークンを更新せよ。"
    steps:
      - '".card" を ".panel" にリネーム（.card と .card-title の 2 箇所）'
      - 'background を #fff から #f8f9fa に変更'
      - 'border-radius を 4px から 12px に変更'
      - 'padding を 16px から 24px に変更'
      - 'タイトルの font-size を 18px から 20px に変更'
---
