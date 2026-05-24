---
id: change
category: edit
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-2-04-change
related_articles:
  - delete
  - insert-entry
  - grammar-of-vim
help_tags:
  - ":h c"
  - ":h r"
  - ":h R"
---

# Change — 削除 + Insert

1 動作でテキストを置き換える: 対象を削除して削除位置で Insert に入る。コード編集の中核動作。

## コマンド一覧

| Key       | 動作                                                            |
|-----------|-----------------------------------------------------------------|
| `c{motion}` | motion 範囲を置換（削除 + Insert）                             |
| `cc`      | 行全体を置換                                                    |
| `C`       | 行末まで置換（`c$`）                                            |
| `s`       | 1 文字置換 — `cl` 同等                                          |
| `S`       | 1 行置換 — `cc` 同等                                            |
| `r{c}`    | 1 文字を `{c}` で置換、Normal 維持                              |
| `R`       | **Replace モード**（上書き入力）                                |
| `gr{c}`   | Virtual Replace（1 文字） — タブ幅を保ったまま置換               |
| `gR`      | Virtual Replace モード — 打ちながら上書き、レイアウトを保つ      |
| `~`       | カーソル下の文字の大小切替                                      |
| `{n}~`    | `n` 文字の大小切替                                              |

## 使い分け

- **`c` vs `d` + `i`**: `c{motion}` の方が 1 打少なく、`.` で正しく再生される。次が入力なら常に `c`
- **`s` vs `cl`**: 同義。`s` の方が短い
- **`S` vs `cc`**: 同義。`S` は 1 キー、`cc` は文法整合
- **`C` vs `c$`**: 同義。`C` の方が速い
- **`r` vs `s`**: `r` は 1 文字置換で Normal 維持 — タイポ修正に最適。`s` は 1 文字削除 + Insert（多文字置換）。出力も 1 文字なら `r`
- **`r` vs `R`**: `r` は 1 文字置換して Normal に戻る、`R` は Replace モード（打ちながら上書き）。固定幅編集（ASCII アート・列）には `R`
- **`~` vs `gU` / `gu`**: `~` は 1 文字大小切替、`gu{motion}` / `gU{motion}` は範囲を小/大文字化。タイポは `~`、単語全体は `g~iw`、強制大文字は `gUiw`
- **`ciw` vs `cw`**: `cw` はカーソルから次単語先頭まで（中ほどから打つと前半残る）、`ciw` はカーソル位置に関係なく単語全体。ほぼ常に `ciw`

## 文法での位置づけ

`c` は operator — あらゆるものと合成可:

- `cw` / `cW`（癖: カーソルが**非空白**上にある時のみ `ce` / `cE` 相当）。count 付き（`c2w`）でも同じ特殊ケースが適用され、**最後の単語の末尾空白のみ**保持される。`dw` には影響なし
- `ciw`、`caw`、`ci"`、`ci(`、`ci{`、`cit`、`cip`
- `c/foo<CR>`（次の "foo" まで置換）
- `c2w`、`c$`、`cG`

完了後 `<Esc>` で Normal、入力テキストも含めて `.` で再生可能。

## 実例

```text
カーソル位置の単語を置換:    ciw newword <Esc>
タイポ修正:                  r b           （1 文字を b に置換）
行末まで置換:                C  // new comment<Esc>
クォート内を置換:            ci"  hello<Esc>
HTML タグ内を置換:           cit  content<Esc>
単語の大小切替:              g~iw
単語を大文字化:              gUiw
最後の変更を繰返し:          .
```

## 落とし穴

- カーソルが非空白上の時のみ `cw` / `cW` は `ce` / `cE` 相当（末尾空白が残る）。空白上では `w` / `W` 通り。末尾空白も消したいなら `caw` / `caW`。`dw` / `dW` は**この特殊ケースの影響を受けない**
- `R` (Replace モード) はステータスに `-- REPLACE --` を表示。打つたびに文字を上書き、`<Esc>` で Insert 同様に脱出
- `~` はカーソルを 1 つ進める。`g~iw` は進めない — operator 形式で元位置に戻る
- `r<Esc>` は `r` を取消（置換は起きない）。リテラル `<Esc>` 文字を入れたいなら `r<C-v><Esc>`
- `c{motion}` は対象範囲を削除して Insert に入る。`cc`（linewise）で行を空にした場合、`'autoindent'` 有効だと入力開始時に前行のインデントを引き継ぐ。`'cindent'`/`'smartindent'`/`'indentexpr'` 設定下では入力中に再インデントされる

## See also

- 🎯 Practice: [tier-2-04-change]
- 📖 Related: [delete], [insert-entry], [grammar-of-vim]
- 📚 `:h c`, `:h r`, `:h R`, `:h ~`
