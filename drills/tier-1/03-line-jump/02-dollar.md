---
id: tier-1-03-line-jump-02
tier: 1
type: motion
target_time_ms: 3000
template:
  - kind: fixed
    lines:
      - "const foo = bar;"
start_col: 0
goal:
  type: col_end
solution_keys:
  - "$"
i18n:
  en:
    title: "Jump to line end with $"
    description: "The cursor is at column 0. Press $ to jump to the last character (';')."
  ja:
    title: "$ で行末にジャンプ"
    description: "カーソルは列 0 にある。$ を押して最後の文字（';'）にジャンプせよ。"
---
