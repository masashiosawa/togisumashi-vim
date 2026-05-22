---
id: tier-2-03-change
tier: 2
order: 3
title_en: "Change operator: cw cc C ciw r"
title_ja: "変更オペレーター: cw cc C ciw r"
concept_en: |
  The change operator (c) = delete + enter insert mode.
  It is the most common editing operation in Vim.

    ciw — change inner word (word under cursor, ignoring spaces)
    cw  — change from cursor to start of next word
    cc  — change entire line (clears and enters insert mode)
    C   — change to end of line (same as c$)
    r{x} — replace a single character without entering insert mode

  After c, you're in insert mode: type the new text, then press <Esc>.

  ciw vs cw:
    ciw works from anywhere in the word and never eats surrounding spaces.
    cw is faster when the cursor is already at the word's first character.

  Bonus: r{x} is the fastest single-char fix — no insert mode needed.
concept_ja: |
  変更オペレーター（c）= 削除 ＋ インサートモード突入。
  Vim で最も使う编集操作のひとつです。

    ciw — 内側の単語を変更（カーソル位置問わず、周囲のスペースは保持）
    cw  — カーソルから次の単語の先頭まで変更
    cc  — 行全体を変更（クリア後にインサートモード）
    C   — 行末まで変更（c$ と同じ）
    r{x} — インサートモードなしで 1 文字だけ置換

  c の後はインサートモード: 新しいテキストを打ち、<Esc> で抜ける。

  ciw と cw の使い分け:
    ciw はカーソルが単語のどこにあっても動作し、周囲のスペースを維持。
    cw はカーソルが単語の先頭にある場合に素早い。

  おまけ: r{x} はインサートモード不要の最速 1 文字修正。
---
