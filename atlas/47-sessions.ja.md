---
id: sessions
category: environment
drillable: false
difficulty: master
frequency: low
related_drills: []
related_articles:
  - starting-vim
  - argument-list
help_tags:
  - ":h sessions"
  - ":h :mksession"
---

# セッション — 編集状態の保存と復元

セッションはウィンドウ・タブ・バッファ・オプション・マッピングを `.vim` スクリプトに保存する。後で復元してレイアウト込みで再開可能。

## コマンド一覧

| コマンド            | 動作                                                |
|---------------------|-----------------------------------------------------|
| `:mksession [{file}]` | セッション保存（デフォルト `Session.vim`）         |
| `:mksession!`       | 既存セッションを上書き                              |
| `:source {file}`    | セッション読込                                      |
| `vim -S {file}`     | セッション付きで起動                                |
| `:mkview`           | 現ウィンドウの**ビュー**を保存（fold・カーソル）     |
| `:loadview`         | ビュー読込                                          |

## 保存される内容

`'sessionoptions'` で制御。★ = **Vim 9 既定**（`blank,buffers,curdir,folds,help,options,tabpages,winsize,terminal`）。**Neovim 0.12 既定**: `blank,buffers,curdir,folds,help,tabpages,winsize,terminal` — Vim 既定から **`options` を除いただけ**（Neovim はオプション値をセッション往復させない方針）。

| オプション     | ★ | 意味                                                  |
|----------------|---|-------------------------------------------------------|
| `blank`        | ★ | 空ウィンドウ                                          |
| `buffers`      | ★ | 開いているバッファ（hidden 含む）                     |
| `curdir`       | ★ | 現在ディレクトリ                                      |
| `folds`        | ★ | fold                                                  |
| `help`         | ★ | ヘルプウィンドウ                                      |
| `options`      | ★ | 全オプションとマッピング（冗長。**Vim 既定 on、Neovim 既定 off**） |
| `tabpages`     | ★ | タブページ                                            |
| `winsize`      | ★ | ウィンドウサイズ                                      |
| `terminal`     | ★ | terminal ウィンドウ（Vim/Neovim とも既定 on）          |
| `winpos`       |   | Vim ウィンドウの画面位置                              |
| `resize`       |   | ウィンドウの行/列数                                   |
| `sesdir`       |   | セッションファイルのディレクトリを cwd にする（**`curdir` と併用しない** — 自動排他ではなく規約） |
| `slash`        |   | ファイル名で `\` を `/` に変換（Windows）             |
| `unix`         |   | セッションファイルを Unix 改行で保存                   |
| `globals`      |   | 大文字始まりのグローバル変数                          |
| `localoptions` |   | ウィンドウ/バッファローカルオプション                  |
| `skiprtp`      |   | `'runtimepath'`/`'packpath'` の保存をスキップ（Neovim）|

軽量セッションには `:set sessionoptions=buffers,tabpages,winsize`。可搬性が欲しいなら `curdir` でなく `sesdir` を。

## 使い分け

- **セッション vs ビュー**: **セッション**は Vim 全体の状態（全ウィンドウ・タブ・バッファ）、**ビュー**は単一ウィンドウの状態（fold・カーソル・オプション）。セッションは重い、ビューは外科的
- **セッション vs git**: セッションは**編集状態**（どこにいたか）、git は**内容**。補完関係 — git はコード、セッションは「この 4 ファイルをこのレイアウトで開いていた」
- **`:mksession` vs `:mksession!`**: 引数なしは上書き拒否、`!` 付きで上書き。命名後はデフォルトを `:mksession!` に
- **プロジェクト別 vs デフォルト `Session.vim`**: プロジェクト別: `:mksession ~/.vim/sessions/project.vim`、デフォルト: cwd の `Session.vim`。命名すると多プロジェクトワークフローが管理しやすい

## 実例

```text
セッション保存:                :mksession
命名保存:                      :mksession ~/.vim/sessions/foo.vim
起動時に復元:                  vim -S ~/.vim/sessions/foo.vim
動作中の Vim で復元:           :source ~/.vim/sessions/foo.vim

軽量セッション（ファイル + レイアウトのみ、オプション無し）:
  :set sessionoptions=blank,buffers,curdir,tabpages,winsize
  :mksession!

クイック保存/読込 mapping（vimrc 内）:
  nnoremap <Leader>ss :mksession! ~/.vim/sessions/
  nnoremap <Leader>so :source ~/.vim/sessions/
```

## 落とし穴

- セッションは Vim スクリプト — vimrc 変更やプラグイン更新で復元に失敗することがある
- 状態を持つプラグインは自動でセッションに保存されない場合あり。`vim-startify`、`vim-obsession` 等で対応
- `'sessionoptions'` デフォルトは多い — 復元が意外と賑やか。絞る
- 動作中の Vim でセッションを source しても現状態が綺麗に消えない。一度 `:qa` → `vim -S` が安全
- 長期セッションは古い参照が溜まる — 存在しないファイルが復元時にエラー。定期的に再保存
- **セッション vs shada/viminfo**: セッションは**レイアウト**（ウィンドウ・タブ・バッファ一覧・オプション）を保存する。**undo 履歴・検索/コマンド履歴・レジスタ・ファイル間 mark は保存しない** — それらは `'shada'`（Neovim）/ `'viminfo'`（Vim）の領域。完全な状態復元には両方を併用する

## See also

- 📖 Related: [starting-vim], [argument-list]
- 📚 `:h sessions`, `:h :mksession`, `:h 'sessionoptions'`
