---
id: tier-2-dd-delete-line
tier: 2
type: edit
target_time_ms: 5000
template:
  - kind: fixed
    lines:
      - "delete me"
      - "keep this"
      - "and this"
goal:
  type: text_equals
  content: "keep this\nand this"
solution_keys:
  - "d"
  - "d"
i18n:
  en:
    title: "Delete line: dd"
    description: "Delete the first line with dd.\ndd yanks the line into a register before deleting."
  ja:
    title: "行削除: dd"
    description: "dd で先頭行を削除する。\ndd は削除前にレジスタにヤンクする。"
---
