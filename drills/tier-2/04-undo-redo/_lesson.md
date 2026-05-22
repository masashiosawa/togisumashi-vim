---
id: tier-2-04-undo-redo
tier: 2
order: 4
title_en: "Undo and redo: u Ctrl+r"
title_ja: "アンドゥ・リドゥ: u Ctrl+r"
concept_en: |
  Every change in Vim is tracked. You can always step backwards — and forwards.

    u      — undo the last change
    Ctrl+r — redo (re-apply an undone change)

  Count prefix works with u:
    2u — undo the last two changes (same as pressing u twice)
    3u — undo the last three changes

  Key insight: each x, d, c is recorded as a separate change.
  u undoes one change at a time, not one keystroke.

  Note: in terminal Vim, Ctrl+z suspends the process. Always use u to undo.
concept_ja: |
  Vim はすべての変更を記録しています。いつでも過去に戻り、また未来に進めます。

    u        — 直前の変更を元に戻す
    Ctrl+r   — リドゥ（元に戻した変更を再適用する）

  カウントプレフィックスも使えます:
    2u — 直前の 2 つの変更を元に戻す（u を 2 回押すのと同じ）
    3u — 直前の 3 つの変更を元に戻す

  ポイント: x・d・c はそれぞれ別の変更として記録される。
  u は 1 回の変更だけを元に戻す（1 キーストロークではなく）。

  注意: ターミナル Vim では Ctrl+z はプロセスをサスペンドする。アンドゥには常に u を使う。
---
