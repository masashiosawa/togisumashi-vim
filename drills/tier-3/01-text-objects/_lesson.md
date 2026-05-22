---
id: tier-3-01-text-objects
tier: 3
order: 1
title_en: "Text objects: quotes and brackets"
title_ja: "テキストオブジェクト: クォートと括弧"
concept_en: |
  Text objects let you operate on structured regions — not just by cursor position.

  i = inner (content only), a = around (includes delimiters)

  di"  — Delete inside double quotes
  da"  — Delete around double quotes (including the quotes)
  ci"  — Change inside double quotes
  ci(  — Change inside parentheses
  di{  — Delete inside curly braces

  Combine with any operator: d, c, y, v, etc.
concept_ja: |
  テキストオブジェクトはカーソル位置ではなく構造的な範囲に対して操作できる。

  i = inner（中身のみ）, a = around（区切り文字含む）

  di"  — ダブルクォート内を削除
  da"  — ダブルクォートごと削除（クォートマーク含む）
  ci"  — ダブルクォート内を変更
  ci(  — 括弧内を変更
  di{  — 波括弧内を削除

  d / c / y / v など任意のオペレータと組み合わせられる。
---
