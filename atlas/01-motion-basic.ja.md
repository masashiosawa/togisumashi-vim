---
id: motion-basic
category: motion
status: drill-backed
related_drills:
  - tier-1-01-hjkl
  - tier-1-02-line-edges
related_articles:
  - motion-word
  - motion-screen-scroll
  - count-modifier
help_tags:
  - ":h h"
  - ":h motion.txt"
---

# 基本カーソル移動

Vim ナビゲーションの最小単位。1 文字単位の移動と行端ジャンプ。指はホームポジションから動かさない — 矢印キーには戻らない。

## コマンド一覧

| Key   | 動作                                                       |
|-------|------------------------------------------------------------|
| `h`   | 左に 1 文字                                                |
| `j`   | 下に 1（論理）行                                           |
| `k`   | 上に 1（論理）行                                           |
| `l`   | 右に 1 文字                                                |
| `0`   | 列 0（行頭）                                               |
| `^`   | 最初の非空白文字                                           |
| `$`   | 行末（最後の文字）                                         |
| `g_`  | 最後の非空白文字                                           |
| `gj`  | **画面行**で下に 1（wrap 時）                              |
| `gk`  | 画面行で上に 1                                             |
| `g0`  | 画面行の先頭                                               |
| `g$`  | 画面行の末尾                                               |
| `+`   | 次行の最初の非空白文字                                     |
| `-`   | 前行の最初の非空白文字                                     |
| `_`   | 現在行の最初の非空白文字。count 付き `[count]_` で `[count]-1` 行下の最初の非空白へ（`_` は現在行、`2_` で次行、`3_` で 2 行下） |

## 使い分け

- **`0` vs `^`**: `0` は列 0（先頭空白を含む物理的行頭）、`^` は最初の非空白。インデント付きコードでは 95% `^` が正解
- **`$` vs `g_`**: `$` は末尾空白を含む、`g_` は最後の非空白。中身を狙うなら `g_`、位置を狙うなら `$`
- **`j`/`k` vs `gj`/`gk`**: `j`/`k` は**論理行**単位（wrap 段落を 1 跳び）、`gj`/`gk` は**画面行**単位。wrap オンの散文には `gj`/`gk`、コードには `j`/`k`
- **`h` vs `<BS>`**: `<BS>` は行を跨ぐ、`h` は行頭で止まる
- **`_` vs `^`**: 両者とも最初の非空白に行くが、`_` は count を受ける: `[count]_` で `[count]-1` 行下へ（`_` は現在行、`3_` で 2 行下）。`^` は count を取らない

## 文法での位置づけ

すべて**モーション**。Operator (`d` `c` `y` `>`) や count と合成して編集を組み立てる:

- `5l`  — 右に 5 列
- `d$`  — 行末まで削除（`D` と等価）
- `y0`  — 行頭までヤンク
- `c^`  — 最初の非空白までを置換

`j` `k` は wrap 行を 1 跳びで超える。`gj` `gk` は表示行 1 つずつ進む。

## 実例

```text
|const speed = 0;          →   5l  →   const|speed = 0;
const speed = 0;|          →   ^   →   |const speed = 0;
    return x;              →   ^   →       |return x;
    return x;              →   0   →   |    return x;
```

## 落とし穴

- soft wrap された段落で `j` `k` を打つと論理行を丸ごと飛ぶ。視覚移動には `gj` `gk` を使う
- `$` は `&virtualedit` 設定によっては改行列まで含む。`d$` と `D` を組合せるときに注意
- `_` は**現在行**の最初の非空白文字。`^` と混同しやすい

## See also

- 🎯 Practice: [tier-1-01-hjkl], [tier-1-02-line-edges]
- 📖 Related: [motion-word], [motion-screen-scroll], [count-modifier]
- 📚 `:h h`, `:h motion.txt`, `:h left-right-motions`
