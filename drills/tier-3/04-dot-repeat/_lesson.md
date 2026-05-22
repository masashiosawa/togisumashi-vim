---
id: tier-3-04-dot-repeat
tier: 3
order: 4
title_en: "Dot repeat and count prefix"
title_ja: "ドット繰り返しとカウントプレフィックス"
concept_en: |
  . (dot) repeats the last change — one of Vim's most powerful features.

  x.    — Delete a char, then repeat (delete next char)
  dw.   — Delete a word, then repeat
  ciw   then w then .  — Change a word, move to next word, apply same change
  2x    — Delete 2 characters at once (count prefix)
  3dw   — Delete 3 words at once

  Combine . with motions to repeat edits efficiently across a file.
concept_ja: |
  . （ドット）は直前の変更を繰り返す — Vim で最も強力な機能の一つ。

  x.    — 1文字削除して繰り返す（次の文字も削除）
  dw.   — 単語を削除して繰り返す
  ciw → w → .  — 単語を変更し、次の単語に移動して同じ変更を適用
  2x    — 2文字を一度に削除（カウントプレフィックス）
  3dw   — 3単語を一度に削除

  . とモーションを組み合わせてファイル全体で効率よく編集を繰り返せる。
---
