---
id: tier-1-fw
tier: 1
type: motion
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "sphinx of black quartz"
goal:
  type: col_N
  n: 5
solution_keys:
  - "f"
  - "x"
i18n:
  en:
    title: "Find char: fx"
    description: "Jump to the character 'x' with fx.\nf{char} = find next occurrence on the current line."
  ja:
    title: "文字検索: fx"
    description: "fx で文字 'x' へジャンプする。\nf{文字} = 現在行の次の出現へ移動。"
---
