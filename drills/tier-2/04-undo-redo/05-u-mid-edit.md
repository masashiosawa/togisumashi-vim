---
id: tier-2-04-undo-redo-05
tier: 2
type: edit
target_time_ms: 8000
template:
  - kind: fixed
    lines:
      - "const foo = 1;"
start_col: 6
goal:
  type: text_equals
  content: "const bar = 1;"
solution_keys:
  - "ciwbar<Esc>xu"
i18n:
  en:
    title: "Undo a mistake mid-edit"
    description: "Change 'foo' to 'bar' with ciw, then press x (oops!), then u to undo just the accidental deletion."
  ja:
    title: "編集途中のミスを u で修正"
    description: "ciw で 'foo' を 'bar' に変更し、x を押してしまったら（ミス！）、u で誤った削除だけを元に戻す。"
---
