---
id: tier-1-05-find-char
tier: 1
order: 5
title_en: "Inline find: f F t T ; ,"
title_ja: "行内検索: f F t T ; ,"
concept_en: |
  Jump to any character on the current line in one keystroke.

    f{x} — move forward to the next occurrence of x
    F{x} — move backward to the previous occurrence of x
    t{x} — move forward, stopping one cell before x ("till")
    T{x} — move backward, stopping one cell after x

  Repeat the last find without retyping the character:
    ;    — repeat in the same direction
    ,    — repeat in the opposite direction

  f and t are mirrors of F and T.
  Use t when you need the cursor before the target (e.g. ct= to change up to =).
concept_ja: |
  現在行の任意の文字に 1〜2 キーでジャンプできます。

    f{x} — 前方に向かって次の x にジャンプ
    F{x} — 後方に向かって前の x にジャンプ
    t{x} — 前方へ、x の 1 つ手前で止まる ("till")
    T{x} — 後方へ、x の 1 つ後ろで止まる

  最後の検索を再利用:
    ;    — 同じ方向に繰り返す
    ,    — 逆方向に繰り返す

  f と F、t と T はそれぞれ対。
  ct= のように「x の手前まで変更」したいときに t が役立つ。
---
