---
id: tier-3-08-substitute
tier: 3
order: 8
title_en: "Substitute: :s and :%s"
title_ja: "置換: :s と :%s"
concept_en: |
  The substitute command replaces text matching a pattern.

  :s/old/new/     — replace first match on current line
  :s/old/new/g    — replace all matches on current line (g = global)
  :%s/old/new/g   — replace all matches in the entire file (% = all lines)
  :%s/^/prefix/   — prepend text to every line (^ = start of line)
  :%s/suffix$//g  — remove trailing text from every line ($ = end of line)

  Flags:
    g  — replace all occurrences (without it, only the first is replaced)
    i  — case-insensitive match
    c  — confirm each substitution interactively
concept_ja: |
  substitute コマンドはパターンにマッチするテキストを置換する。

  :s/old/new/     — 現在行の最初のマッチを置換
  :s/old/new/g    — 現在行の全マッチを置換（g = global）
  :%s/old/new/g   — ファイル全体の全マッチを置換（% = 全行）
  :%s/^/prefix/   — 全行の行頭にテキストを追加（^ = 行頭）
  :%s/suffix$//g  — 全行の末尾テキストを削除（$ = 行末）

  フラグ:
    g  — 全マッチを置換（省略時は最初の 1 件のみ）
    i  — 大文字・小文字を区別しない
    c  — 置換のたびに確認する
---
