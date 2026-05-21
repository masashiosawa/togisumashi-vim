---
id: tier-1-03-line-jump
tier: 1
order: 3
title_en: "Line jumps: 0 $ ^ g_"
title_ja: "行頭・行末ジャンプ: 0 $ ^ g_"
concept_en: |
  Four keys let you teleport to the ends of a line instantly.

    0  — column 0: the very first character position (even if it's a space)
    $  — line end: the last character on the line
    ^  — first non-blank: skip leading whitespace and land on the real content
    g_ — last non-blank: skip trailing whitespace (opposite of ^)

  Rule of thumb:
  • Use 0 and $ for raw position arithmetic (e.g. d0, y$).
  • Use ^ when you want to reach the code — it handles any indent level.
  • g_ is rarer but useful when trailing spaces are present.
concept_ja: |
  4 つのキーで行の端に瞬時にジャンプできます。

    0  — 列 0: 行の先頭位置（スペースでも）
    $  — 行末: 行の最後の文字
    ^  — 最初の非空白: 先頭のスペースをスキップして実際のコードへ
    g_ — 最後の非空白: 末尾のスペースをスキップ（^ の逆）

  使い分けの目安:
  • 0 と $ は位置計算（d0, y$ など）に使う。
  • ^ はインデント量に関係なくコードの先頭に飛ぶときに使う。
  • g_ は末尾スペースがある場合にたまに使う。
---
