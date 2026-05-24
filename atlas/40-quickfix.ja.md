---
id: quickfix
category: power
drillable: false
difficulty: advanced
frequency: mid
related_drills: []
related_articles:
  - external-commands
  - tags
help_tags:
  - ":h quickfix"
  - ":h :cnext"
  - ":h :grep"
---

# Quickfix と Location リスト

ファイル:行:列のエントリリストを順送りで巡る機構。コンパイルエラー巡回、grep 結果、「全参照を探す」の基盤。

## コマンド一覧

### 構築

| コマンド          | 動作                                                |
|-------------------|-----------------------------------------------------|
| `:make`           | `'makeprg'` を実行、エラーを quickfix に            |
| `:grep {pat}`     | `'grepprg'` を実行、マッチを quickfix に             |
| `:vimgrep /{pat}/ {files}` | Vim 内蔵 grep                              |
| `:helpgrep {pat}` | help を検索                                         |
| `:copen [{n}]`    | quickfix ウィンドウを開く（高さ `{n}`）              |
| `:cclose`         | quickfix ウィンドウを閉じる                          |
| `:cwindow`        | 非空なら開く、空なら閉じる                          |

### 移動

| コマンド          | 動作                                                |
|-------------------|-----------------------------------------------------|
| `:cnext` `:cn`    | 次のエントリ                                        |
| `:cprev` `:cp`    | 前のエントリ                                        |
| `:cfirst` (`:cfir`) | 最初のエントリ                                    |
| `:clast` (`:cla`)   | 最後のエントリ                                    |
| `:cc {n}`         | エントリ `n` へ                                     |
| `:cnfile`         | 次のファイルの**最初**のエントリ                    |
| `:cpfile`         | 前のファイルの**最後**のエントリ                    |
| `:cdo {cmd}`      | 各 quickfix エントリで `{cmd}` 実行                  |
| `:cfdo {cmd}`     | quickfix の各**ファイル**で `{cmd}` 実行             |

### Location リスト（ウィンドウローカル）

Location リストは quickfix のウィンドウ版。コマンドは `c` を `l` に置換:

| コマンド          | 動作                                                |
|-------------------|-----------------------------------------------------|
| `:lopen`          | location リストウィンドウを開く                     |
| `:lnext` `:lne`   | 次のエントリ                                        |
| `:lprev` `:lp`    | 前のエントリ                                        |
| `:lgrep`          | `:grep` の location 版                              |

## 使い分け

- **Quickfix vs Location リスト**: Quickfix は**グローバル**（Vim 全体で 1 つ）、Location は**ウィンドウ単位**（split すると新規）。コンパイルエラーは quickfix（グローバル）、ファイル別検索は location
- **`:grep` vs `:vimgrep`**: `:grep` は外部 `'grepprg'`（通常 `grep -n` か `rg`）、`:vimgrep` は Vim 内蔵 regex。`:grep` の方が速い（特に `rg`）、`:vimgrep` は移植性が高い（外部依存なし）
- **`:make` vs `:!`**: `:make` は出力を quickfix に統合して `:cnext` でエラー巡回。`:!` はシェル出力表示のみ。ビルド/テストは常に `:make`
- **`:cnext` vs LSP 診断**: `:cnext` はコンパイル/grep 結果を巡回。Neovim の LSP 診断は標準では `vim.diagnostic` 名前空間にあり、quickfix/location には自動で入らない（`vim.diagnostic.setloclist()` / `vim.diagnostic.goto_next()` で巡回）。それぞれ独自の経路
- **`:copen` vs `:cwindow`**: `:copen` は常に開く、`:cwindow` は非空時のみ開き空なら閉じる。`:make` 後にエラー時のみ自動表示したいなら `:cwindow`

## 実例

```text
コンパイルしてエラー巡回:
  :make
  :copen           " 全エラー表示
  <CR>             " エラーへジャンプ（quickfix ウィンドウ内で）
  :cnext           " 次のエラー
  :cprev           " 前

TODO を grep:
  :grep TODO -r .
  :copen
  :cnext...

Vim 内蔵 grep（外部ツール不要）:
  :vimgrep /TODO/ **/*.py
  :copen

rg を grepprg に:
  set grepprg=rg\ --vimgrep
  :grep "func main"
```

## `:make` / `:grep` が期待する形式

出力は `'errorformat'` で解析される。デフォルト形式は GCC・ほとんどの linter・grep-with-line-numbers を扱う。カスタムツールは設定要:

```vim
set errorformat=%f:%l:%c:\ %m
```

`%f` = ファイル名、`%l` = 行、`%c` = 列、`%m` = メッセージ。

## 落とし穴

- `:vimgrep` は大規模 codebase では**遅い** — 各ファイルを Vim に読み込む。`:grep` + `rg`/`ag` を使う
- `:grep` はシェル実行 — クォート/特殊文字を適切にエスケープ: `:grep "complex pattern" file`
- quickfix リストには**履歴**がある: `:colder` / `:cnewer` で前のリストを巡回。把握しにくくなる
- Vim のどこからでも `:cnext` で次のエントリへ移動。quickfix ウィンドウ内で単にスクロールしたいだけならバッファとして普通に操作
- 一部プラグインは無断で quickfix を上書き（linter、ファジーファインダー）。変数経由で保存・復元 (`let g:saved_qf = getqflist()` → `call setqflist(g:saved_qf)`) するか、location リストで分離

## See also

- 📖 Related: [external-commands], [tags]
- 📚 `:h quickfix`, `:h :cnext`, `:h :grep`, `:h 'errorformat'`
