---
id: case-numeric
category: edit
drillable: true
difficulty: intermediate
frequency: mid
related_drills:
  - tier-2-07-indent-case-num
related_articles:
  - change
  - visual-mode
help_tags:
  - ":h gu"
  - ":h gU"
  - ":h CTRL-A"
---

# 大小切替・数値増減

無関係だが常用する 2 系統: 範囲の大小切替、カーソル下の数値増減。

## 大小切替コマンド

| Key          | 動作                                                |
|--------------|-----------------------------------------------------|
| `~`          | カーソル下 1 文字の大小切替（Normal）               |
| `g~{motion}` | motion 範囲の大小切替（operator）                   |
| `g~~`        | 行全体の大小切替                                     |
| `gu{motion}` | motion 範囲を小文字化                                |
| `guu`        | 行全体を小文字化                                     |
| `gU{motion}` | motion 範囲を大文字化                                |
| `gUU`        | 行全体を大文字化                                     |
| `{visual}u`  | 選択を小文字化                                       |
| `{visual}U`  | 選択を大文字化                                       |
| `{visual}~`  | 選択を大小切替                                       |
| `g?{motion}` | motion 範囲を ROT13（完全性のため）                  |

## 数値コマンド

| Key          | 動作                                                |
|--------------|-----------------------------------------------------|
| `<C-a>`      | カーソル位置 or 後方の数値を**増**                  |
| `<C-x>`      | カーソル位置 or 後方の数値を**減**                  |
| `{n}<C-a>`   | `n` 加算                                            |
| `{n}<C-x>`   | `n` 減算                                            |
| `g<C-a>`     | （任意 Visual: `v`/`V`/`<C-v>`）選択範囲の各行の数値に `[count]` を加算（N 行目に `N*[count]`）— 0 の列で 1,2,3,... を生成。blockwise が典型だが必須ではない |
| `g<C-x>`     | （任意 Visual）連番デクリメント（同じ仕組みで減算）  |

## 使い分け

- **`~` vs `g~iw`**: `~` は 1 文字切替して進む、`g~iw` は単語全体を切替して停止。タイポなら `~`、単語修正なら `g~iw`
- **`gu` vs `gU` vs `~`**: `gu` は強制小文字、`gU` は強制大文字、`~` は切替。現在の大小が不明なら `~`、特定の結果が欲しいなら `gu`/`gU`
- **`<C-a>` vs 手入力**: `<C-a>` は行内の次の数値を増。ポート番号・バージョン文字列・リスト index の調整に使う。Visual block + `g<C-a>` で連番リストが数秒で作れる
- **`<C-a>` と日付**: `'nrformats'` の日付認識は限定的 — `2026-01-31` で `<C-a>` しても `2026-02-01` にはならない。日付演算は `:put =strftime(...)` を使う
- **`<C-a>` と基数**: `'nrformats'` で `0b10` `0777` `0x1a` を 2/8/16 進と認識するか制御。実用上の既定は両者とも **`bin,hex`**（現代の Vim は vimrc 不在時に自動で `defaults.vim` が適用され `bin,hex` に、Neovim はそもそも `bin,hex`）。`0777` は**10 進**として扱われる。raw Vim 既定（`vim -u NONE`）は `bin,octal,hex` で `0777` を 8 進扱いするが、通常のユーザは defaults.vim 経由なのでこの挙動には出会わない。8 進解釈が真に必要なら `octal` を明示追加
- **`gUap` vs `gUip`**: `ap` は末尾空白行を含む、`ip` は含まない。大小操作では見た目同じ（空行に大小はない）だが、operator の挙動として違う

## 実例

```text
単語全体を小文字化:           guiw
関数名を大文字化:             gUiw   （名前の上で）
選択範囲を切替:               V  ~
ファイル末尾まで小文字化:     guG

最初の数値を bump:            "1.2.3" の前/上にカーソル  →  <C-a>  →  2.2.3
patch を bump:                "3" の上にカーソル          →  <C-a>  →  1.2.4

1..10 を生成:
  :put =range(1,10)<CR>

0 から連番リスト:
  10o0<Esc>          （"0" を 10 行挿入）
  <C-v>9k            （0 の列を Visual block 選択）
  g<C-a>             →  1, 2, 3, 4, 5, 6, 7, 8, 9, 10 に
```

## 落とし穴

- `<C-a>` `<C-x>` は行内の**次の**数値を対象、カーソル下の文字に厳密ではない。数値の前にカーソルがあっても見つけて増減する
- **10 進**では `<C-a>` は先頭の `-` を符号として扱う（デフォルト挙動: `-5` → `-4`）。`-` をリテラル扱いにするには `'nrformats'` に `unsigned` を追加。16/2/8 進では `-` は**常に**数値の一部にならない
- GNU screen は `<C-a>` が**既定 prefix** — screen が食べて Vim に届かない。tmux の既定 prefix は `<C-b>` だが、`<C-a>` に変更しているユーザは同じ問題に当たる。多重化ソフトの prefix を変えるか、Vim 内で remap する（例: `nnoremap <Leader>+ <C-a>`）。**`<C-]>` を remap 先にしないこと** — `<C-]>` はタグジャンプの既定キー
- `~` を 1 文字切替で使うには `'tildeop' = off`。`'tildeop' = on` だと operator になる（`~w` で単語切替）
- multi-byte 文字の大小切替はロケール依存。CJK の多くは大小区別が無い

## See also

- 🎯 Practice: [tier-2-07-indent-case-num]
- 📖 Related: [change], [visual-mode]
- 📚 `:h gu`, `:h gU`, `:h CTRL-A`, `:h 'nrformats'`
