---
id: tier-2-02-yy-p
tier: 2
order: 2
title_en: "Yank and paste: yy p P ddp"
title_ja: "ヤンクとペースト: yy p P ddp"
concept_en: |
  Yank (copy) and paste without leaving normal mode.

    yy  — yank (copy) the current line
    p   — paste below the current line (linewise)
    P   — paste above the current line (linewise)

  Useful idioms:
    yyp  — duplicate a line below (yank + paste below)
    yyP  — duplicate a line above
    ddp  — swap current line with the line below (delete + paste below next)

  Add a count before yank to grab multiple lines:
    2yy  — yank 2 lines
    yy3p — yank once, paste 3 times
concept_ja: |
  ノーマルモードを離れずにヤンク（コピー）＆ペースト。

    yy  — 現在行をヤンク（コピー）
    p   — 現在行の下にペースト（行単位）
    P   — 現在行の上にペースト（行単位）

  よく使う慣用句:
    yyp  — 行を下に複製（ヤンク＋下にペースト）
    yyP  — 行を上に複製
    ddp  — 現在行と次の行を入れ替え（削除＋次の行の下にペースト）

  カウントでまとめてヤンク:
    2yy  — 2 行ヤンク
    yy3p — 1 回ヤンク、3 回ペースト
---
