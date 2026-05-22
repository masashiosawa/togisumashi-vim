---
id: tier-3-01-text-objects-03
tier: 3
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - 'func(old_arg)'
start_col: 7
goal:
  type: text_equals
  content: 'func(new_arg)'
solution_keys:
  - 'ci(new_arg<Esc>'
i18n:
  en:
    title: "Change inside parentheses with ci("
    description: "Cursor is inside the parentheses. Replace \"old_arg\" with \"new_arg\"."
  ja:
    title: "ci( で括弧内を変更"
    description: "カーソルは括弧の中にある。\"old_arg\" を \"new_arg\" に置き換えよ。"
---
