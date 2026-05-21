---
id: tier-2-yyp-duplicate-line
tier: 2
type: edit
target_time_ms: 6000
template:
  - kind: fixed
    lines:
      - "hello world"
goal:
  type: text_equals
  content: "hello world\nhello world"
solution_keys:
  - "y"
  - "y"
  - "p"
i18n:
  en:
    title: "Duplicate line: yyp"
    description: "Duplicate the current line with yyp.\nyy = yank (copy) line, p = paste below."
  ja:
    title: "行の複製: yyp"
    description: "yyp で現在行を複製する。\nyy = 行をヤンク（コピー）、p = 下にペースト。"
---
