---
id: motion-find-char
category: motion
drillable: true
difficulty: intermediate
frequency: high
related_drills:
  - tier-1-06-find-char
related_articles:
  - search-navigation
  - motion-basic
help_tags:
  - ":h f"
  - ":h t"
  - ":h ;"
---

# 行内文字検索

**現在行**の特定文字へ跳ぶ。高速・行内限定・operator と合成可能。

## コマンド一覧

| Key       | 動作                                                            |
|-----------|-----------------------------------------------------------------|
| `f{c}`    | 前方の `{c}` へ（カーソルは ON、operator では**inclusive**）    |
| `F{c}`    | 後方の `{c}` へ（カーソルは ON、operator では**exclusive**）    |
| `t{c}`    | 前方の `{c}` の**手前**へ（operator では**inclusive**）          |
| `T{c}`    | 後方の `{c}` の**1 つ後**へ（operator では**exclusive**）        |
| `;`       | 直前の `f`/`F`/`t`/`T` を同方向で繰返し                          |
| `,`       | 直前の `f`/`F`/`t`/`T` を**逆方向**で繰返し                       |
| `{n}f{c}` | **n 番目**の出現へ                                              |

## 使い分け

- **`f` vs `t`**: `f{c}` は `{c}` の**上**、`t{c}` は `{c}` の**手前**に着地。Operator と組合せると、前方 `f`/`t` は着地文字を**含めて**作用する **inclusive**（`df;` は `;` を含めて削除、`dt;` は `;` の手前まで削除）。後方の `F`/`T` は **exclusive** で着地文字を含めない（`dF;` は `;` の手前までを後方向に削除）
- **`f` vs `/`**: `f` は単文字・現在行のみ・`<CR>` 不要。`/` はパターン・複数行・`<CR>` 必須。行内の見える対象には `f` の方が常に速い
- **`;` vs `n`**: `;` は `f`/`t` の繰返し、`n` は `/`/`?` の繰返し。**独立**しているので `;` で前回の検索は再現しない
- **`;` vs `.`**: `;` は find 繰返し、`.` は最後の**編集**繰返し。組合せ: `f.x;.;.` で行内のピリオドを全削除
- **空白に対する `f`**: `f<Space>` で次の空白へ。句読点だらけのコードでは `w` より速い。

## 文法での位置づけ

Find motion は operator と合成可:

- `df,`  — 次のカンマまで（含めて）削除
- `ct"`  — 次のダブルクォートの手前まで置換
- `yf)`  — カーソルから次の `)` まで（含めて）ヤンク
- `vfx`  — 次の `x` まで（含めて）visual 選択

## 実例

```text
foo, bar, baz    f,     → foo|, bar, baz
foo, bar, baz    2f,    → foo, bar|, baz
foo, bar, baz    df,    → bar, baz
foo, bar, baz    dt,    → , bar, baz
foo, bar, baz    f, ;   → foo, bar|, baz   （`;` で前方繰返し）
foo|, bar, baz   f, ,   → foo,| bar, baz   （`,` で逆方向 — 開始位置に左カンマがある時のみ意味）
```

## 落とし穴

- Find は `ignorecase` に関係なく**常に大文字小文字を区別**（motion であって検索ではないため）
- Find は**行を跨がない**。対象が現在行に無いと無音で失敗する。`/` を使うこと
- `;` `,` は直前の find の文字を再利用 — `fx` の後に `/something` しても `;` は依然として `x` を探す

## See also

- 🎯 Practice: [tier-1-06-find-char]
- 📖 Related: [search-navigation], [motion-basic]
- 📚 `:h f`, `:h t`, `:h ;`, `:h ,`
