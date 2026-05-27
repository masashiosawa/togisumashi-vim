---
id: tier-3-05-visual-mode-03
tier: 3
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - 'remove four words here keep rest'
start_col: 0
goal:
  type: text_equals
  content: 'keep rest'
solution_keys:
  - 'v4wd'
i18n:
  en:
    title: "Visual delete multiple words with v4wd"
    description: "Press v to enter visual mode, 4w to extend the selection 4 words forward, then d to delete."
  ja:
    title: "v4wd で複数単語をビジュアル削除"
    description: "v でビジュアルモードに入り、4w で 4 単語分選択を広げ、d で削除せよ。"
---
