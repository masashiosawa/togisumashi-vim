---
id: indent-format
category: edit
status: drill-backed
related_drills:
  - tier-2-07-indent-case-num
related_articles:
  - settings
  - external-commands
help_tags:
  - ":h >"
  - ":h ="
  - ":h gq"
---

# インデントと整形

水平方向のレイアウト調整: 行を左右に shift、コードを自動インデント、散文を整形する。

## コマンド一覧

### インデント shift

| Key          | 動作                                                            |
|--------------|-----------------------------------------------------------------|
| `>{motion}`  | motion 範囲を `shiftwidth` 単位インデント                       |
| `<{motion}`  | motion 範囲をデデント                                           |
| `>>`         | 現在行をインデント                                              |
| `<<`         | 現在行をデデント                                                |
| `{visual}>`  | 選択範囲をインデント                                            |
| `{visual}<`  | 選択範囲をデデント                                              |
| `{n}>>`      | `n` 行インデント                                                |
| `:[range]>` `:[range]<` | ex 形式（count 付き: `:.>5`）                        |

### 自動インデント

| Key          | 動作                                                            |
|--------------|-----------------------------------------------------------------|
| `={motion}`  | motion 範囲を再インデント                                       |
| `==`         | 現在行を再インデント                                            |
| `{visual}=`  | 選択範囲を再インデント                                          |
| `gg=G`       | ファイル全体を再インデント（定型呪文）                          |

### 整形

| Key          | 動作                                                            |
|--------------|-----------------------------------------------------------------|
| `gq{motion}` | motion 範囲を整形（`'formatexpr'`/`'formatprg'` 使用）           |
| `gqq` `gqgq` | 現在行を整形                                                    |
| `gqap`       | 現在段落を整形                                                  |
| `gw{motion}` | カーソルを動かさず整形                                          |
| `:[range]center [width]` | 行を中央寄せ（幅: 明示引数 → `'textwidth'` → 80） |
| `:[range]left [width]`   | 左寄せ（同じ幅解決）                                  |
| `:[range]right [width]`  | 右寄せ（同じ幅解決）                                  |
| `:retab`     | `'expandtab'` 設定に基づき tab↔空白を変換                       |

## 使い分け

- **`>>` vs `==`**: `>>` は `shiftwidth` で機械的に shift、`==` は言語ルール（`'indentexpr'`）で再インデント。「正しい形に」なら `==`、「もう 1 段下げる」なら `>>`
- **`>>` vs `:.>`**: 同義。`:.>` は ex 形式、スクリプトや `:g/.../>` で活躍
- **`gg=G` vs 外部フォーマッタ**: `gg=G` は Vim 内蔵 indenter — 高速だがルールベース。本格 formatter（`prettier` `black` `gofmt`）は構文を理解。本番コードは `:!gofmt %` か LSP の保存時 format
- **`gq` vs `gw`**: 両者整形。`gq` は整形末尾にカーソル移動、`gw` は位置維持。位置を失いたくないなら `gw`
- **`gq` vs LSP format**: `gq` はローカル（Vim ロジック or `'formatprg'`）、LSP は言語サーバ呼出。LSP は意味的、`gq` はテキスト的 — 散文には十分、コードには LSP の方が良い
- **`{visual}=` vs `gg=G`**: 選択 vs 全体。大規模リファクタは `gg=G`、変更箇所だけは visual から
- **`:retab` vs `:set expandtab` + `gg=G`**: `:retab` は現在の `'expandtab'` に基づいて既存タブを変換、`gg=G` は再インデント。tab スタイル切替には `:retab` → `gg=G` の順

## 実例

```text
関数本体を 1 段インデント:        V}>
ズレたブロックをデデント:         V}<
ファイル全体を再インデント:       gg=G
現段落を整形:                     gqap
行長 60 で整形:                   :set textwidth=60  →  gqip
TODO を含む行をインデント:        :g/TODO/>
タブを空白に:                     :set expandtab  →  :retab
見出し行を中央寄せ:               :.center
```

## 落とし穴

- `>>` は `'shiftwidth'` を使う（`'tabstop'` ではない）。`'shiftwidth'=0` だと `'tabstop'` にフォールバック
- `'expandtab'` で `<Tab>` がタブか空白か決まる。**`:retab`** は `'tabstop'` に基づき whitespace を再構成し、`'expandtab'` の設定でタブ→空白（または逆）を変換する。**`:retab!`** の `!` は**方向反転**ではなく**対象拡大**（タブだけでなく全 whitespace を対象に含める）。方向は常に `'expandtab'` で決まる
- `gg=G` は `'equalprg'` 設定時はそれ（外部フォーマッタ）、次に `'indentexpr'`、次に内蔵 C-like indent の順。内蔵 indent が多くの言語を処理するので `'indentexpr'` 未設定でも `=` はほぼ動く
- `gq` は `'textwidth'` で折り返す。`'textwidth'=0` だと何も折り返さない。散文には明示設定
- `:center`/`:left`/`:right` のデフォルト幅は `'textwidth'`。`'textwidth'=0` の時は**80 にフォールバック**する（「何も起きない」わけではない）

## See also

- 🎯 Practice: [tier-2-07-indent-case-num]
- 📖 Related: [settings], [external-commands]
- 📚 `:h >`, `:h =`, `:h gq`, `:h 'shiftwidth'`, `:h 'expandtab'`
