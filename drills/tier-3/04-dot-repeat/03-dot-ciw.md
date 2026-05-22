---
id: tier-3-04-dot-repeat-03
tier: 3
type: edit
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - 'old bar old'
start_col: 0
goal:
  type: text_equals
  content: 'new bar new'
solution_keys:
  - 'ciwnew<Esc>2w.'
i18n:
  en:
    title: "Repeat change with . after ciw"
    description: "Change the first \"old\" to \"new\" with ciw, move to the last word with 2w, then repeat with .."
  ja:
    title: "ciw の変更を . で繰り返す"
    description: "ciw で最初の \"old\" を \"new\" に変更し、2w で最後の単語に移動して . で繰り返せ。"
---
