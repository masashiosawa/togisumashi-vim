---
id: tier-2-01-dw-dd
tier: 2
order: 1
title_en: "Delete commands: dw, dd, D"
title_ja: "削除コマンド: dw, dd, D"
concept_en: |
  dw  — Delete word (from cursor to start of next word)
  dd  — Delete entire line
  D   — Delete to end of line (equivalent to d$)
  diw — Delete inner word (the word under cursor, no surrounding spaces)

  Combine with counts: 2dw deletes 2 words, 3dd deletes 3 lines.

  Deleted text goes into a register — paste it with p.
concept_ja: |
  dw  — 単語を削除（カーソルから次の単語の先頭まで）
  dd  — 行全体を削除
  D   — 行末まで削除（d$ と同じ）
  diw — 内側の単語を削除（周囲のスペースはそのまま）

  カウントと組み合わせ: 2dw で 2 単語、3dd で 3 行削除。

  削除したテキストはレジスタに入る — p でペースト可能。
---
