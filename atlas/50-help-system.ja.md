---
id: help-system
category: meta
drillable: false
difficulty: beginner
frequency: mid
related_drills: []
related_articles:
  - plugins
  - settings
help_tags:
  - ":h help"
  - ":h help.txt"
  - ":h helpgrep"
---

# `:help` システム — 自己救済

Vim マスター最重要のメタスキル: **自分で調べる**。Vim には検索可能な完全マニュアルが同梱されている。help を引ける人は暗記をやめて探索に移れる。

## コマンド一覧

| Key                 | 動作                                                          |
|---------------------|---------------------------------------------------------------|
| `:h {topic}`        | `{topic}` のヘルプを開く（例: `:h dw`、`:h ctrl-r`、`:h 'incsearch'`） |
| `:help`             | ヘルプ目次を開く                                              |
| `<C-]>`             | カーソル下のタグを follow                                     |
| `<C-t>`             | タグ履歴を戻る                                                |
| `:helpgrep {pat}`   | help 全体を grep し quickfix に格納                           |
| `:cn` `:cp`         | `:helpgrep` 結果を順送り                                      |
| `:helpclose`        | help ウィンドウを閉じる                                       |
| `K`                 | `'keywordprg'` でカーソル下の単語を引く（既定は `man`）。help ftplugin が `'keywordprg'` を**バッファローカルに** `:help`（Vim）/ `:help!`（Neovim）へ設定するため、help バッファ内では `K` が `:h {語}` 相当になる。help 外では `K` は既定で `man` を呼ぶ |

## 使い分け

- **`:h {topic}` vs `:helpgrep {pat}`**: 正確なタグ名が分かるなら `:h`（例: `:h CTRL-A`）。キーワードしか分からず、help 全体から該当箇所を網羅したい時は `:helpgrep`
- **`<C-]>` vs `K`**: `<C-]>` はカーソル下のリテラルタグ文字列を follow（厳密 — 直接タグ検索）、`K` は `iskeyword` 単語を抽出して `'keywordprg'`（既定 `man`、help ftplugin がバッファローカルに `:help`/`:help!` へ書き換え）に渡す。仕組みが違う。help 内では `<C-]>` が正解
- **`:h i_CTRL-W` vs `:h <C-W>`**: help は**正式表記** `CTRL-W` を使う。`<C-W>` は `:map` 定義用記法。モード接頭辞（`i_` `v_` `c_`）でスコープを絞る — ただし `:h g~` `:h z=` の `g`/`z` はコマンド名の一部であって接頭辞ではない点に注意
- **`:h` vs Google**: `:h` は正典・バージョン整合・オフライン。外部ドキュメントは更新遅延と Vim/Neovim 混同がある。まず `:h` から引く

## トピック命名規則

**モードスコープ接頭辞**（コマンドが動くモードで絞る）:

| 接頭辞 | 意味                       | 例               |
|--------|----------------------------|------------------|
| `i_`   | Insert モードコマンド      | `:h i_CTRL-W`    |
| `v_`   | Visual モードコマンド      | `:h v_o`         |
| `c_`   | コマンドラインコマンド     | `:h c_CTRL-R`    |
| `t_`   | Terminal モードコマンド    | `:h t_CTRL-W`    |

**記号マーカー**（タグそのものに含まれる、スコープ接頭辞ではない）:

| マーカー | 意味                          | 例               |
|----------|-------------------------------|------------------|
| `:`      | Ex コマンド                   | `:h :substitute` |
| `'`      | オプション                    | `:h 'hlsearch'`  |
| `Q_`     | `quickref.txt` のセクション   | `:h Q_de`        |

`g~` や `z=` 等の g/z 始まりコマンドは、そのままリテラルで引く: `:h g~`、`:h z=`。

## 存在を覚えておく場所

- `:h user-manual` — 物語的チャプター（`usr_01`〜`usr_52`）
- `:h quickref` — 1 枚チートシート（`Q_xx` で構造化）
- `:h index` — モード別の全コマンド索引
- `:h pattern.txt` — regex リファレンス
- `:h options` — 全オプション

## 実例

```text
:h ctrl-a         → インクリメントコマンドの解説
:h i_CTRL-W       → insert モードの「単語削除」
:h :s_flags       → :substitute のフラグ
:helpgrep yank    → "yank" を含む全箇所
```

## 落とし穴

- `<C-]>` はカーソルが `|tag|` 上にある時のみ動く。それ以外は help バッファ内を `/` で検索
- タグ検索は最初に大文字小文字を区別、見つからなければ**大文字小文字無視**でフォールバック。`:h ctrl-w` でも `CTRL-W` に解決されるが正式名は大文字
- help バッファは通常のバッファ — `:q` で閉じる、motion / 検索もすべて使える
- **Neovim 0.10+**: LSP クライアントがアタッチされていると `K` は既定で `vim.lsp.buf.hover()` に再束縛される。man/help 風の従来挙動が欲しいなら `gK` を使う（全体は `:h lsp-defaults`）

## See also

- 📖 Related: [plugins], [settings]
- 📚 `:h help.txt`, `:h help-context`, `:h notation`
