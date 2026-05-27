---
id: tier-3-05-visual-mode
tier: 3
order: 5
title_en: "Visual mode: select and operate"
title_ja: "ビジュアルモード: 選択と操作"
concept_en: |
  Visual mode lets you select a region, then apply an operator to the whole selection.

  v    — character-wise visual (select by characters)
  V    — line-wise visual (select whole lines)
  viw  — visually select inner word (same region as ciw/diw)
  v$   — visually select to end of line

  After selecting, press an operator:
    d  — delete selection
    c  — change selection (delete + enter insert)
    y  — yank (copy) selection
    ~  — toggle case of selection

  vi" d  is equivalent to di" (delete inside quotes via visual)
concept_ja: |
  ビジュアルモードでは範囲を選択してからオペレータを適用できる。

  v    — 文字単位のビジュアル選択
  V    — 行単位のビジュアル選択
  viw  — 単語の内側を選択（ciw/diw と同じ範囲）
  v$   — 行末まで選択

  選択後にオペレータを押す:
    d  — 削除
    c  — 変更（削除してインサートモードへ）
    y  — ヤンク（コピー）
    ~  — 大文字/小文字をトグル

  vi" d は di"（ビジュアル経由でクォート内削除）と等価
---
