---
id: starting-vim
category: environment
drillable: false
difficulty: beginner
frequency: mid
related_drills: []
related_articles:
  - argument-list
  - sessions
help_tags:
  - ":h starting"
  - ":h cmdline-options"
---

# Vim の起動 — 起動オプション

Vim の起動方法を変えるコマンドラインフラグ: 設定スキップ、特定行で開く、複数ファイル、セッション復元。

## よく使うフラグ

| フラグ          | 動作                                                |
|-----------------|-----------------------------------------------------|
| `vim {file}`    | ファイルを開く                                       |
| `vim {file1} {file2}` | argument list で複数ファイル                    |
| `vim -O f1 f2`  | **垂直**分割で                                       |
| `vim -o f1 f2`  | **水平**分割で                                       |
| `vim -p f1 f2`  | タブで                                               |
| `vim +{N} file` | `N` 行目で開く                                       |
| `vim +/{pat} file` | `pat` の最初のマッチで開く                       |
| `vim -c {cmd}`  | 読込後に `{cmd}` 実行                                |
| `vim -u {vimrc}` | 指定 vimrc 使用（`-u NONE` で無効）                 |
| `vim -U {gvimrc}` | Vim のみ — gvimrc 指定                            |
| `-N`            | `'nocompatible'` を強制（Vim 用 — Neovim では無意味） |
| `-R`            | 読取専用モード（復元可）                             |
| `-M`            | 編集無効                                            |
| `-n`            | swap ファイルなし（`'updatecount'` も 0 に）         |
| `-e` / `-E`     | Ex モード / 改良 Ex モード                           |
| `-s {scriptin}` | ノーマルモードコマンドをスクリプトから読込（キーストローク再生） |
| `-S {session}`  | セッションファイル source（通常 `Session.vim`）       |
| `--clean`       | vimrc/プラグイン/shada スキップ。**Vim**: `defaults.vim` は読込。**Neovim**: 組込デフォルトを適用 |
| `-d`            | diff モード（`vimdiff` と同じ）                       |
| `-Z`            | 制限モード（シェルアクセスなし）                     |
| `-V[N]`         | verbose レベル `N`（1〜15、高いほど起動/source の trace 詳細） |
| `-D`            | デバッグモード — source される任意ファイルの最初のコマンドでデバッガに入る |
| `-h` / `--help` | ヘルプ表示                                           |
| `-v` / `--version` | バージョン情報                                    |

## 使い分け

- **`-O` vs `-o` vs `-p`**: 垂直分割 / 水平分割 / タブ。用途で選ぶ。「並べて比較」なら `-O`
- **`-u NONE` vs `--clean`**: `-u NONE` は vimrc を完全スキップ（vi 互換デフォルト）。`--clean` は vimrc/プラグイン/shada をスキップするが **`defaults.vim` は読み込む**（現代的デフォルト）。「設定が原因？」のデバッグで使える状態を保ちたいなら `--clean`
- **`+{N}` vs `:e file | {N}G`**: `+{N}` はシェルレベル位置指定 — コンパイラ/linter が `filename:line` を出す時に有用。Vim 内で既ロードバッファには `{N}G`
- **`vim +/pattern file`**: パターン最初の出現でファイルを開く。grep 出力の `+/<pat>` と組合せ
- **`-R` vs `-M`**: `-R` は読取専用警告 — 上書き可能、`-M` は編集完全無効

## 実例

```text
ファイルを 42 行目で開く:       vim +42 main.c
エラー位置で開く:               vim +/error main.log
2 ファイル比較:                 vim -d a b   （または vimdiff a b）
複数ファイル垂直分割:           vim -O config.json schema.json
全設定スキップ（debug）:        vim --clean
特定 vimrc を使う:              vim -u /tmp/test-vimrc file.txt
読込後にコマンド:               vim -c "set number" -c "syntax on" file.c

セッションで開く:               vim -S Session.vim

読取専用クイックビュー:         vim -R README.md
.swp を作らない:                vim -n file.txt
```

## Web 環境について

Web Vim エミュレーションにはコマンドライン起動がない。本記事は実 Vim/Neovim 用。

## 起動時のファイル読込順

簡略版（`:h initialization`、`:h startup`）:

**Vim**（`vim`）
1. `'shell'`、`'term'` 設定
2. system gvimrc（GUI 時のみ）
3. `$MYVIMRC`（通常 `~/.vimrc` または `~/.vim/vimrc`）を実行。`-u {file}` または `-u NONE` でスキップ
4. ユーザー vimrc が無く `-u NONE` 指定でもなければ `defaults.vim` を適用
5. `pack/*/start/*/plugin/**.vim`（ネイティブパッケージ）を source
6. `'runtimepath'` 上の他のプラグインスクリプトを source
7. `-c`、`-S` 引数を処理
8. argv のファイルを argument list に展開

**Neovim**（`nvim`）
1. `init.lua`（`$XDG_CONFIG_HOME/nvim/init.lua`、典型的に `~/.config/nvim/init.lua`）を読込。無ければ `init.vim`。`-u {file}` または `-u NONE` でスキップ
2. `runtimepath` のプラグイン（`pack/*/start/*/plugin/**`）を source
3. `-c` / `-S` / argv を処理

ユーザー vimrc として採用されたパスは **`$MYVIMRC`** に格納される — `:e $MYVIMRC` で現在有効なファイルを開ける。

## 落とし穴

- `-c` は vimrc source の**後**に実行。vimrc 設定を上書きしたいなら `-c` が正しい場所
- `-u NONE` はほぼ白紙の Vim — 多くは方向感覚を失う。デバッグ目的で意図的に使う
- 複数 `+` 引数: 最後の `+{cmd}` のみ有効。複数コマンドなら `-c "{cmd1}" -c "{cmd2}"`
- `-O` はファイル数で分割を割振り — 10 ファイル `-O` だと 10 分割で窮屈。実用は 2〜4 ファイル
- `vim` vs `vi`: 多くのシステムで `vi` は compatible モードの Vim エイリアス。Vim の挙動が欲しいなら `vim` を直接
- **Neovim**: `$XDG_CONFIG_HOME/nvim/` に `init.lua` と `init.vim` が**両方**存在すると、Neovim は推測せず「E5422」エラーで起動を中止する。どちらか 1 つに揃える。移行中は旧ファイルを `.bak` にリネームして新ファイル検証を済ませてから戻す

## See also

- 📖 Related: [argument-list], [sessions]
- 📚 `:h starting`, `:h cmdline-options`, `:h initialization`
