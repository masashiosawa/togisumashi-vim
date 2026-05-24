---
id: dot-repeat
category: composition
drillable: true
difficulty: intermediate
frequency: high
related_drills:
  - tier-3-09-dot-anatomy
related_articles:
  - macros
  - grammar-of-vim
  - search-navigation
help_tags:
  - ":h ."
  - ":h single-repeat"
---

# ドット反復 — `.`

Vim 最強の単一キー。**最後の編集**を新規変更として再生する。これを使いこなせば多くのマクロが不要になる。

## `.` が再生するもの

`.` は最後の**変更**（バッファを変えた何か）を再適用する。再生対象:

- Operator（`d` `c` `>` `gu` `=` — `y` はデフォルトでは `.` の対象**外**。`'cpoptions'+=y` で対象に）
- Motion または text object（`w` `iw` `i"` `}`）
- Count（`3` `5`）
- `<Esc>` 前の Insert モード入力テキスト

`ciwfoo<Esc>` 後の `.` は、カーソルがどこにあろうと「現在の inner word を foo に置換」する。

## `.` が再生**しない**もの

- 単独の motion（`w` `j` `gg` `/foo<CR>`）
- `n` / `N`（検索繰返し）
- `;` / `,`（find char 繰返し）
- `u` / `<C-r>`（undo/redo）
- Ex コマンド（`:s` `:g` `:w` 等）
- マクロ（`@a`）
- `.` 自身

これらはすべて**独自の繰返し手段**を持つ: motion は再押下、検索は `n`、find は `;`、ex は履歴（`@:`）。

## 使い分け

- **`.` vs マクロ `@a`**: `.` は最後の**単一変更**を再生、マクロは任意列。1 operator + motion + insert で済むなら `.`、motion・検索・ex を含む多段なら macro
- **`.` vs `&`**: `.` は最後の編集、`&` は最後の `:s` 置換。履歴が違う — `.` で `:s` は再生しない、`&` で `c` は再生しない
- **`.` vs `@:`**: バッファ編集は `.`、最後の `:` ex は `@:`。`:s` や `:w` を繰返したいなら `@:`
- **`.` vs `n` `;`**: `n` は検索繰返し、`;` は find char 繰返し。どちらも編集は再生しない。組合せ: `cgn` + `.` で「各検索マッチを編集」の定型
- **1 キー `.` vs スクリプト**: 構造的繰返し編集において `.` は macro より速い — **編集が単一変更で表せる**限り。技は編集を単一変更に整形すること

## 検索編集ループ・パターン

```text
/foo<CR>      最初のマッチを検索
cw bar<Esc>   bar に置換
n             次のマッチ
.             変更を適用
n             次
.             ...
```

`cgn` を使うとさらに緊密:

```text
/foo<CR>
cgn bar<Esc>     次マッチを bar に置換
.                次マッチ + 置換
.                ...
```

`cgn` は `.` を意識した設計: `.` 毎に次のマッチへ移動して変更する。

## Insert を複数の undo 単位に分割する

Insert モード中の `<C-g>u` は **undo 境界**を作る（`u` 1 回で戻る単位を細かくできる）。**ただし `.` の再生単位は変えない** — `.` は依然として Insert セッション全体（`i`/`a`/`o` から `<Esc>` まで）を再生する。`.` の単位を分けたいなら、一度 `<Esc>` で抜けて別の Insert として始める必要がある。

## 実例

```text
複数行にセミコロン追加:
  A;<Esc>j  →  .  →  j.  →  j.  ...

単語をクォートで囲む（全箇所）:
  /foo<CR>  →  cgn"foo"<Esc>  →  .  →  .
  （cgn は現在のマッチを置換、`.` で次のマッチへ進んで再置換）

変数名を数箇所で置換:
  cwBar<Esc>  →  n  →  .  →  n  →  .

1 行おきにインデント:
  >>j  →  .  →  j.  →  j.  ...
```

## 落とし穴

- `.` は**最後の**変更を再生。**yank は `.` 対象を更新しない**（コピーで `.` が壊れないのは利点）。**paste（`p`/`P`）はバッファ変更なので `.` 対象を上書きする**。`yyp` 後の `.` は paste の繰返しになる点に注意
- 単独 motion（`w` `}` `f`）は `.` の対象を更新しない — 良い設計、これで navigation が `.` を壊さない
- 1 Insert セッション（`i`/`a`/`o` から `<Esc>` まで）が `.` から見て 1 変更。`<C-g>u` は **undo を分割するだけで `.` の単位は変えない**。`.` を細かく分けたいなら一度 `<Esc>` で抜けて別 Insert にする
- プラグインのコマンドは `repeat.vim` 対応でないと `.` 不可。`vim-surround` 等を使うなら `tpope/vim-repeat` も入れる
- `.` は**新しいカーソル位置**で再生される。motion で適切な位置に着地させる計画が要る

## See also

- 🎯 Practice: [tier-3-09-dot-anatomy]
- 📖 Related: [macros], [grammar-of-vim], [search-navigation]
- 📚 `:h .`, `:h single-repeat`, `:h i_CTRL-G_u`
