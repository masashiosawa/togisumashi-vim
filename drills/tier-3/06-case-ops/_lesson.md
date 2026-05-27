---
id: tier-3-06-case-ops
tier: 3
order: 6
title_en: "Case operators: gU, gu, g~"
title_ja: "大文字・小文字オペレータ: gU, gu, g~"
concept_en: |
  Vim provides operators for changing the case of text.

  gU{motion}  — uppercase the text covered by motion
  gu{motion}  — lowercase the text covered by motion
  g~{motion}  — toggle case of the text covered by motion

  gUU  — uppercase the entire current line
  guu  — lowercase the entire current line

  Combine with text objects:
    gUiw  — uppercase inner word
    guiw  — lowercase inner word
    g~iw  — toggle case of inner word
    gUip  — uppercase inner paragraph
concept_ja: |
  Vim にはテキストの大文字・小文字を変更するオペレータがある。

  gU{motion}  — モーションが対象とする範囲を大文字化
  gu{motion}  — モーションが対象とする範囲を小文字化
  g~{motion}  — モーションが対象とする範囲の大文字・小文字をトグル

  gUU  — 現在行全体を大文字化
  guu  — 現在行全体を小文字化

  テキストオブジェクトと組み合わせる:
    gUiw  — 単語を大文字化
    guiw  — 単語を小文字化
    g~iw  — 単語の大文字・小文字をトグル
    gUip  — 段落を大文字化
---
