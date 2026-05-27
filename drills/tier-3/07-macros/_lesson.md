---
id: tier-3-07-macros
tier: 3
order: 7
title_en: "Macros: record and replay"
title_ja: "マクロ: 記録と再生"
concept_en: |
  Macros let you record a sequence of keystrokes and replay it on demand.

  qa   — start recording into register a (any letter works)
  q    — stop recording
  @a   — play macro stored in register a
  @@   — repeat the last played macro
  2@a  — play macro a exactly 2 times

  Design good macros: end with a motion (like j) so each replay
  advances to the next target automatically.

  Example — change every line's first word to "new":
    qa ciwnew<Esc> j q   ← record: change word, move down
    @a                   ← replay once
    @@                   ← replay again without retyping @a
concept_ja: |
  マクロはキーストロークの列を記録し、後から再生できる機能。

  qa   — レジスタ a に記録開始（任意のアルファベット使用可）
  q    — 記録停止
  @a   — レジスタ a のマクロを再生
  @@   — 最後に再生したマクロをもう一度再生
  2@a  — マクロ a を 2 回再生

  良いマクロ設計: 末尾に移動コマンド（j など）を入れると
  再生のたびに自動で次の対象に進む。

  例 — 各行の最初の単語を "new" に変更:
    qa ciwnew<Esc> j q   ← 記録: 単語変更 → 下に移動
    @a                   ← 1 回再生
    @@                   ← @a と打ち直さずにもう一回
---
