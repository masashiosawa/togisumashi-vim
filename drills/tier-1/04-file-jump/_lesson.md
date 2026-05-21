---
id: tier-1-04-file-jump
tier: 1
order: 4
title_en: "File jumps: gg G {N}G"
title_ja: "ファイル内ジャンプ: gg G {N}G"
concept_en: |
  Jump anywhere in a file without scrolling.

    gg   — go to the first line (line 1)
    G    — go to the last line
    {N}G — go to line N (e.g. 5G jumps to line 5)
    {N}gg — same as {N}G (alternative syntax)

  These work from anywhere in the file.
  Combine with other operators: dG deletes from cursor to end of file.
concept_ja: |
  スクロールなしでファイル内の任意の行に飛べます。

    gg    — 先頭行（1行目）に移動
    G     — 末尾行に移動
    {N}G  — N 行目に移動（例: 5G で 5 行目へ）
    {N}gg — {N}G と同じ（別構文）

  ファイルのどこからでも使えます。
  他のオペレーターとの組み合わせも強力: dG でカーソル以降を全削除。
---
