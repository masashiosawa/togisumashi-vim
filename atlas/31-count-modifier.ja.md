---
id: count-modifier
category: meta
drillable: false
difficulty: beginner
frequency: high
related_drills:
  - tier-1-11-count-modifier
related_articles:
  - grammar-of-vim
  - motion-basic
help_tags:
  - ":h count"
---

# Count — 万能修飾子

数値を前置することで次のコマンドが乗算される。Vim 文法の第 4 の柱（operator・motion・text object と並ぶ）。Count の配置を理解すれば 10 打が 3 打に減る。

## Count が掛かる対象

| 文脈                         | 効果                                              |
|------------------------------|---------------------------------------------------|
| `{n}{motion}`                | motion を `n` 回繰返し                            |
| `{n}{operator}{motion}`      | operator を `n × motion` に適用                   |
| `{operator}{n}{motion}`      | 上と同じ — count はどちらに置いても可             |
| `{n}{insert-cmd}{text}<Esc>` | `text` を `n` 回挿入                              |
| `{n}.`                       | 最後の変更を `n` 回繰返し                          |
| `{n}@a`                      | マクロ `a` を `n` 回実行                          |
| `{n}<C-a>` / `{n}<C-x>`      | 数値に `n` を加算/減算                            |
| `{n}G`                       | `n` 行目へ                                        |
| `{n}gt`                      | `n` 番目のタブへ                                  |
| `{n}|`                       | `n` 列目へ                                        |

## Count の意味論

- `5j` — 5 行下（motion × 5）
- `5dw` — 5 単語削除（operator を 5 単語範囲に）
- `d5w` — 同上（count は motion 側に）
- `5d w` — **不正ではない**: `<Space>` は右移動 motion なので、これは `5dl`（右に 5 文字削除）になる。意図と違う動作なので注意
- `2d3w` — `2 × 3 = 6` 単語削除（count は乗算される）
- `3iabc<Esc>` — `abcabcabc` を挿入（insert コマンドへの count）
- `5.` — 最後の変更を 5 回適用

## 使い分け

- **`5dw` vs `d5w`**: 同義。Vim は count を operator 側でも motion 側でも受ける。タイピング流で選ぶ
- **`3iabc<Esc>` vs `iabc<Esc>2.`**: 両者とも `abcabcabc` を生成。count 版は単発、`.` 版は調整可能。回数が**事前確定**なら count
- **`5G` vs `:5`**: `{n}G` で `n` 行目、`:n` も同じ。`{n}G` の方が速い（`<CR>` 不要）が、スクリプト内では ex 形式が必要
- **`5yy` vs `V4jy`**: `5yy` で 5 行ヤンク、`V4jy` は visual で多段だが調整可能
- **Count による移動 vs `gg`/`G`**: `{n}G` は番号既知、`gg`/`G` は端、`<C-d>`/`<C-u>` は「半画面スクロール」。命名ジャンプがあるなら count を使わない

## 実例

```text
3 単語削除:              3dw      or  d3w
5 行インデント:          5>>      （>>5j は 1 行だけインデントした後 5 行下に移動）
10 行ヤンク:             10yy
"-" を 40 回挿入:        40i-<Esc>      → 40 個のダッシュ区切り線
5 加算:                  5<C-a>
マクロを 100 回:         100@a
250 行目へ:              250G
最後の編集を 7 回:       7.

10 個の数字列を生成:
  10i0<Esc>              → 現在位置に 0 を 10 個
  その後 visual block + g<C-a> で 1..10 に
```

## 落とし穴

- count の乗算: `2d3w` は `6 単語`削除、`23 単語`ではない。早打ちで誤認しやすい
- 先頭の `0` は **count ではない** — `0` は「行頭へ」motion。`01dw` は混乱の元、`1dw` か単に `dw`
- Insert コマンドへの count は**入力テキスト**を繰返す（Insert 入退場ではない）。`3iabc<Esc>` で `abcabcabc`
- `5dd` はカーソル位置から**下に**5 行削除。`dd5` は単一コマンドではない（`dd` で 1 行削除した後、`5` が次コマンドの count として残るだけ）。count は operator か motion の**前**に置く必要がある
- マクロ内の count は**マクロの一部** — `5dw` を含むマクロは再生時も常に 5 単語削除

## See also

- 🎯 Practice: [tier-1-11-count-modifier]
- 📖 Related: [grammar-of-vim], [motion-basic]
- 📚 `:h count`, `:h Visual-prefix`
