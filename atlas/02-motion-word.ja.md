---
id: motion-word
category: motion
status: drill-backed
related_drills:
  - tier-1-03-word-motion
related_articles:
  - motion-basic
  - text-objects
  - grammar-of-vim
help_tags:
  - ":h word-motions"
  - ":h word"
  - ":h WORD"
---

# 単語移動

単語単位で跳ぶ。Vim は 2 種類定義する: **word**（英数字とアンダースコア、句読点で区切れる）と **WORD**（空白以外なら全部一塊）。

## コマンド一覧

| Key   | 動作                                                       |
|-------|------------------------------------------------------------|
| `w`   | 次の **word** 先頭                                         |
| `W`   | 次の **WORD** 先頭                                         |
| `e`   | 次の **word** 末尾                                         |
| `E`   | 次の **WORD** 末尾                                         |
| `b`   | 前の **word** 先頭（戻る）                                 |
| `B`   | 前の **WORD** 先頭                                         |
| `ge`  | 前の **word** 末尾（後方の単語の終わり）                   |
| `gE`  | 前の **WORD** 末尾                                         |

## 使い分け

- **`w` vs `W`**: `w` は句読点で止まる（`foo.bar.baz` は 5 word）。`W` は空白でしか止まらない（`foo.bar.baz` は 1 WORD）。パス・URL・ドット付き識別子には `W`
- **`w` vs `e`**: `w` は次単語の**先頭**、`e` は現在/次単語の**末尾**。Operator と組合せると `e` が自然なケースが多い（`ce` は単語末尾まで置換、句読点は残る）
- **`b` vs `ge`**: `b` は前の**単語先頭**、`ge` は前の**単語末尾**。後方の単語の終わりを直したい時は `ge`
- **`dw` vs `daw` vs `diw`**: `dw` はカーソルから次単語先頭まで削除（単語の中ほどから打つと前半が残る）。`daw` は単語と隣接空白を**含めて**削除、`diw` は単語のみで空白を残す
- **`cw` の癖（条件付き）**: カーソルが**非空白**上にある時のみ `cw` は `ce` 相当（末尾空白が残る）。空白上では通常の `w` 意味。空白も消したい時は `caw`

## 文法での位置づけ

単語 motion は全 operator と合成可:

- `dw` `cw` `yw` — 「次単語まで編集」の定型
- `2w` `3W` — count 乗算
- `vw` — 次単語先頭まで visual 選択

## 実例

```text
foo.|bar.baz       w  → foo.bar|.baz       （次の word: bar）
foo.|bar.baz       W  → foo.bar.baz|       （W は空白でしか止まらない）
foo bar |baz       e  → foo bar baz|
foo bar |baz       b  → foo |bar baz
foo bar |baz       ge → foo bar| baz
foo bar | baz      dw → foo bar |baz       （空白上の dw は空白を食う）
foo bar | baz      daw→ foo bar|           （次の word + 隣接空白を削除）
```

## 落とし穴

- `cw` は `dw` + `i` と等価**ではない**。カーソルが非空白上の場合のみ `cw` は `ce` 相当となり末尾空白が残る。空白上では `w` 通り。空白を消したいなら `caw`
- 行末単語の `w` は次行の最初の単語に飛ぶ。行内で止めたいなら `e`
- 大文字版（`W` `E` `B`）は句読点を全部無視。便利だが句読点だらけの行では予想以上に遠くへ飛ぶ

## See also

- 🎯 Practice: [tier-1-03-word-motion]
- 📖 Related: [motion-basic], [text-objects], [grammar-of-vim]
- 📚 `:h word-motions`, `:h word`, `:h WORD`
