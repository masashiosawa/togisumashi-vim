---
id: visual-mode
category: composition
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-3-01-visual
related_articles:
  - text-objects
  - grammar-of-vim
help_tags:
  - ":h Visual"
  - ":h CTRL-V"
  - ":h gv"
---

# Visual モード — 見て選んで編集

範囲を視覚的に選択してから operator を適用する。operator-pending モードに対する「見たまま編集」版。

## コマンド一覧

### Visual モードに入る

| Key      | 動作                                                |
|----------|-----------------------------------------------------|
| `v`      | charwise visual（1 文字単位）                       |
| `V`      | linewise visual（行単位）                           |
| `<C-v>`  | blockwise visual（矩形）                            |
| `gv`     | 直前の visual 選択を再現                            |

### Visual 中

| Key      | 動作                                                            |
|----------|-----------------------------------------------------------------|
| `o`      | 選択の**対角端**へ移動                                          |
| `O`      | （Block visual）**同じ行内の対角列**へ移動（水平方向の角のみ）  |
| `v`/`V`/`<C-v>` | 別の visual モードへ                                     |
| `<Esc>`  | Visual 終了                                                     |

### Visual + operator

| 選択後のキー | 動作                                                            |
|--------------|-----------------------------------------------------------------|
| `d`          | 選択削除                                                        |
| `c`          | 置換（削除 + Insert）                                           |
| `y`          | ヤンク                                                          |
| `>` `<`      | インデント / デデント                                            |
| `=`          | 再インデント                                                    |
| `~` `u` `U`  | 大小切替 / 小 / 大                                              |
| `gq`         | 整形                                                            |
| `r{c}`       | 選択内の各文字を `{c}` で置換                                    |

### Block visual 専用

| `<C-v>` 後のキー  | 動作                                                          |
|-------------------|---------------------------------------------------------------|
| `I{text}<Esc>`    | **block 左端列まで届く各行**に `{text}` を挿入（block 左端列より短い行はスキップ） |
| `A{text}<Esc>`    | 各行の **block 右端**に `{text}` を追加。block 右端列より短い行では**空白パディングが挿入**されてその列まで埋められる。本当の「行末」に追加したいなら `<C-v>$` で block を各行末まで延ばす（その場合パディング無し） |
| `c{text}<Esc>`    | 各 block 行を `{text}` で置換                                  |
| `<C-a>` `<C-x>`   | 選択範囲の数値を増減（行ごとに独立）— **任意 Visual モード**で動作（block 限定ではない） |
| `g<C-a>`          | 各行の数値に `[count]*N` を加算（`[count]` 既定 1）— 0 の列なら 1,2,3,... を生成。**任意 Visual モード**（`v`/`V`/`<C-v>`）で動作。blockwise が典型用途なのでここに列挙 |

## 使い分け

- **`v` vs `V` vs `<C-v>`**: 任意 char 範囲は `v`、行単位（コードでは多用）は `V`、矩形（列編集・表データ）は `<C-v>`
- **Visual + operator vs operator + motion**: 結果同じ。範囲が**確定**しているなら operator + motion（`d3w`）、見て調整してから決めたいなら Visual
- **`v` の後 `iw` vs `viw`**: 同義。text object 形（`viw`）は文法的、2 段は明示的。どちらでも可
- **`gv` vs 手で再選択**: Visual を抜けて編集した後、`gv` で直前の選択を復元。同じ範囲に複数の operator を当てる時に
- **`o`（反対端）**: 選択を反対側から伸ばせる。`vi{` の選択は片方向、`o` を押すと反対側を伸ばせる
- **Block `I` vs Normal `I`**: Block-Visual `I` は**各選択行の先頭**に挿入、`<Esc>` で全行に伝播。Normal `I` は 1 行のみ
- **`v` + text object vs `gn`**: 何を選ぶか分かっているなら text object（`viw`、`vi"`）。次の**検索マッチ**を Visual 範囲として選ぶなら `gn` — `.` と組合せ抜群: `cgn{置換}<Esc>` の後 `.` で各マッチを順次置換

## 実例

```text
3 行選択してインデント:        Vjj>
5 行をコメントアウト:          <C-v>jjjj  →  I//<Esc>
選択行の末尾空白を除去:
                               V}  →  :'<,'>s/\s\+$//
関数本体を選択:                vi{   （カーソルは内部）
編集後に再選択:                ...  →  gv  →  別 op
選択を大小切替:                V  →  ~
列の連番生成:                  <C-v> で 10 行を覆う  →  g<C-a>
末尾揃え:                      <C-v>  →  範囲調整  →  $A);<Esc>  （全行に追記）
```

## 落とし穴

- 一部ターミナルで `<C-v>` がクリップボードペーストに振られている。`<C-q>` をフォールバックに使う（または remap）
- Block-Visual `I`/`A` の効果は `<Esc>` 後に出る。打ってる途中は 1 行にしか見えない — 壊れたと思いがち
- Visual 選択への `=` は `'equalprg'` → `'indentexpr'` → 内蔵 C-like indent の順で動作。`'indentexpr'` 未設定でも内蔵 indent が C/Lisp/Vim 等を処理するため「何も起きない」わけではない
- Visual 選択は `'virtualedit'` を尊重するのは設定時のみ（`'virtualedit=block'` は block 編集で多用）
- `gv` は**バッファ単位**。バッファ切替で失われる。境界を残したいなら mark（`` `< `` `` `> ``）

## See also

- 🎯 Practice: [tier-3-01-visual]
- 📖 Related: [text-objects], [grammar-of-vim]
- 📚 `:h Visual`, `:h CTRL-V`, `:h gv`, `:h v_b_I`
