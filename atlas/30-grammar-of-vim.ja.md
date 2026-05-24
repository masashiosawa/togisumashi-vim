---
id: grammar-of-vim
category: meta
drillable: false
difficulty: intermediate
frequency: high
related_drills:
  - tier-2-03-delete
  - tier-2-04-change
  - tier-2-05-yank-paste
  - tier-2-06-text-objects
related_articles:
  - text-objects
  - dot-repeat
  - count-modifier
help_tags:
  - ":h operator"
  - ":h text-objects"
  - ":h motion.txt"
---

# Vim の文法

Vim はコマンド一覧ではなく**言語**。文法を覚えれば、教本に載っていない編集も自分で組み立てられる。

## 4 つの品詞

```
[count] [operator] [count] {motion | text-object}
   2        d        i          w
```

| 品詞             | 役割                                      | 例                                |
|------------------|-------------------------------------------|-----------------------------------|
| **Count**        | 何回                                       | `3` `5` `10`                      |
| **Operator**     | どう処理するか                             | `d` `c` `y` `>` `<` `=` `gu` `gU` |
| **Motion**       | どこへ（始点..カーソル or カーソル..終点）| `w` `e` `b` `$` `0` `gg` `G`      |
| **Text object**  | 境界のある領域（方向なし）                 | `iw` `aw` `i"` `a(` `it`          |

完成文は **operator + motion** または **operator + text object**。count はどちらにも掛かる。

## 使い分け

- **Motion vs text object**: 「今ここから次へ」なら **motion**（`dw` はカーソルから次単語先頭まで削除、単語の中ほどにカーソルがあると前半は残る）。「カーソルがどこにあっても境界のある領域」なら **text object**（`daw` は単語の途中からでも単語全体を削除）
- **Operator + motion vs Visual + operator**: 結果は同じ。範囲が**確定**しているなら operator-pending（`d3w`）、選択範囲を**目で確認**してから操作したいなら Visual（`v3wd`）
- **`{op}{op}` 連打 vs 明示 motion**: `dd` ≡ `d_`、`cc` ≡ `c_`、`yy` ≡ `y_`、`S` ≡ `cc`、`D` ≡ `d$`、`C` ≡ `c$`、`Y` ≡ `yy`（純正）または `y$`（Neovim 0.6+）。連打の方が速いので、行単位操作は連打優先
- **`c{motion}` vs `s` vs `r`**: `c{motion}` は削除して Insert へ。`s` ≡ `cl`（1 文字置換）、`r` は Insert に入らず 1 文字置換。1 文字直すだけなら `r`、1 文字を複数文字に置き換えるなら `s`、それ以外は `c{motion}`

## 合成表

|        | `w` (次単語) | `$` (行末) | `iw` (内側単語) | `i"` (クォート内) |
|--------|--------------|------------|------------------|---------------------|
| `d`    | `dw`         | `d$`       | `diw`            | `di"`               |
| `c`    | `cw`         | `c$`       | `ciw`            | `ci"`               |
| `y`    | `yw`         | `y$`       | `yiw`            | `yi"`               |
| `>`    | `>w` (稀)    | `>$` (稀)  | —                | —                   |
| `gu`   | `guw`        | `gu$`      | `guiw`           | `gui"`              |

count: `2dw`（2 単語削除）、`d2w`（同義 — count は operator/motion どちらに置いてもよい）。

**`cw` ≡ `ce` の癖（条件付き）。** カーソルが**非空白**上にある時のみ、`cw`/`cW` は `ce`/`cE`（単語末までの置換）として振る舞い末尾空白が残る（`:h cw` Special case）。空白上では通常の `w` 意味。`dw` には影響なし。空白も消したいなら `caw`。

## なぜ重要か

- `daw` `diw` `caw` `ciw` を個別に覚える必要がない — すべて `{op}{tobj}` の合成
- 新しい operator（`gu` 小文字化）と新しい text object（`it` HTML タグ）はすぐ組合せ可能: `guit` で HTML タグ内を小文字化、と「習った」ことが無くても出力できる
- `.` コマンドは**文全体**を再生する — count、operator、motion、挿入テキストすべて含めて

## 同字 2 連の省略形

`{op}{op}` で「行全体に適用」:

| 省略形 | 等価           |
|--------|----------------|
| `dd`   | `d_` (行削除)  |
| `cc`   | `c_` (行置換)  |
| `yy`   | `y_` (行ヤンク)|
| `>>`   | `>_` (行インデント) |

## 落とし穴

- `Y` は `yy` と**同じではない**（純正 Vim では `Y` ≡ `yy`、つまり行全体）。多くの vimrc が `Y` を `y$` に remap（`D` `C` との対称性のため）
- count は積算: `2d3w` は 6 単語削除（2 × 3）、23 ではない
- 「operator」に厳密には収まらないものもある: `r`（置換）は motion でなく 1 文字、`s` は `cl`

## See also

- 🎯 Practice: [tier-2-03-delete], [tier-2-04-change], [tier-2-06-text-objects]
- 📖 Related: [text-objects], [dot-repeat], [count-modifier]
- 📚 `:h operator`, `:h text-objects`, `:h motion.txt`
