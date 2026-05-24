---
id: autocommands
category: config
drillable: false
difficulty: master
frequency: low
related_drills: []
related_articles:
  - settings
  - mappings
help_tags:
  - ":h autocmd"
  - ":h :autocmd"
  - ":h autocmd-events"
---

# Autocommand — イベント駆動設定

何かが起きた時に**自動的に**コマンドを実行する: ファイルを開く、保存する、バッファに入る、Insert を抜ける、等。filetype 別動作とエディタ自動化の基盤。

## コマンド一覧

| コマンド             | 動作                                                |
|---------------------|-----------------------------------------------------|
| `:autocmd {event} {pattern} {cmd}` | autocmd 登録                          |
| `:autocmd ... ++once {cmd}` | 1 回限りの autocmd（Vim 8.1+）                 |
| `:autocmd ... ++nested {cmd}` | autocmd 内から別の autocmd の発火を許可     |
| `:autocmd!`（引数なし） | 現グループの全 autocmd 削除                       |
| `:autocmd! {event} {pattern}` | マッチする autocmd 削除                   |
| `:autocmd`（引数なし） | 全 autocmd 一覧                                   |
| `:augroup {name}` ... `:augroup END` | autocmd をグループ化               |
| `:doautocmd {event}` | イベントを手動発火                                |

## 代表的なイベント

| イベント                       | 発火タイミング                                |
|-------------------------------|----------------------------------------------|
| `BufRead` / `BufReadPost`（同一イベント） | ファイル読込後                    |
| `BufReadPre`                   | ファイル読込**前**                           |
| `BufWrite` / `BufWritePre`（同一イベント） | バッファ保存**前**             |
| `BufWritePost`                 | バッファ保存**後**                          |
| `BufNewFile`                   | 新規ファイル作成時                           |
| `BufEnter` `BufLeave`          | バッファ入 / 出                              |
| `BufWinEnter`                  | バッファがウィンドウに出現                   |
| `FileType`                     | `'filetype'` 設定時                          |
| `InsertEnter` `InsertLeave`    | Insert モード入 / 出                         |
| `TextChanged` `TextChangedI`   | テキスト変更（Normal / Insert）              |
| `CursorHold` `CursorHoldI`     | カーソル静止 `'updatetime'` ms               |
| `CursorMoved` `CursorMovedI`   | カーソル移動                                 |
| `WinEnter` `WinLeave`          | ウィンドウフォーカス変更                     |
| `VimEnter` `VimLeave`          | Vim 起動 / 終了                              |
| `ColorScheme`                  | colorscheme ロード後                         |

## パターン文法

| パターン       | マッチ                                              |
|----------------|-----------------------------------------------------|
| `*`            | 全ファイル                                          |
| `*.py`         | `.py` で終わるファイル                              |
| `*.{c,h}`      | `.c` または `.h` で終わる                            |
| `python`       | filetype "python"（`FileType` イベントで）           |
| `<buffer>`     | 現バッファのみ                                      |

## 使い分け

- **Autocmd vs 常時設定**: たまにしか適用しない設定（filetype 別、プロジェクト別）は `autocmd FileType` か `autocmd BufRead path/*`、それ以外は `~/.vimrc` に直接
- **`autocmd FileType` vs `ftplugin/`**: 同じ効果。`ftplugin/{ft}.vim` は**慣習的**な場所 — マッチする filetype で Vim が自動実行。filetype 別設定は `ftplugin/`、単発は vimrc の `autocmd FileType`
- **`autocmd BufWritePre` vs 保存時 `:!`**: autocmd は Vim 内実行で undo 統合、`:!` はシェル離脱。可能なら autocmd を優先（例: 末尾空白除去）
- **`InsertLeave` vs `<C-c>`**: `<C-c>` は `InsertLeave` autocmd をスキップ。format-on-leave を機能させたいなら `<C-c>` でなく `<Esc>`
- **augroup あり vs なし**: `augroup` なしだと vimrc 再読込のたびに autocmd が**追加**されていく — 重複が蓄積。`augroup` + 冒頭の `autocmd!`（クリア）でラップ

## 実例

```vim
" 保存時に末尾空白除去（全ファイル）
augroup TrimWhitespace
  autocmd!
  autocmd BufWritePre * %s/\s\+$//e
augroup END

" Python インデント設定
augroup PythonIndent
  autocmd!
  autocmd FileType python setlocal shiftwidth=4 expandtab
augroup END

" ヤンクハイライト（Neovim）
augroup HighlightYank
  autocmd!
  autocmd TextYankPost * silent! lua vim.highlight.on_yank()
augroup END

" 外部変更を自動再読込
autocmd FocusGained,BufEnter * checktime

" カーソル位置復元
autocmd BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$") | exe "normal! g`\"" | endif

" 新規ファイルテンプレート
autocmd BufNewFile *.py 0r ~/.vim/templates/python.py
```

## 落とし穴

- `augroup` 内の `autocmd!` を忘れると vimrc 再読込のたびに同じハンドラが追加 — 性能が静かに劣化
- `BufRead` はファイル読込ごとに 1 回、`BufEnter` はバッファ再入のたびに発火。意図に合うものを選ぶ
- パターンは glob 形式、regex ではない。`*.{py,pyi}`（brace 展開）は動く、`.*\.py` は動かない
- `FileType` イベントは Vim が filetype を判定した**後**に発火。判定前のイベントなら `BufReadPre`
- `autocmd ... InsertLeave * call FormatOnLeave()` は**全 Insert 脱出**で発火（些細なものも）。条件でフィルタ（`b:changedtick` の差分等）するか `BufWritePre` に移すのが現実的
- autocmd を**一時抑止**したい時は、単発コマンドなら `:noautocmd {cmd}`、ブロックなら `set eventignore=all`（解除は `set eventignore=`）。特定イベントのみなら `set eventignore=BufRead,FileType`。注: `:argdo` と `:bufdo` は反復中に内部で **`Syntax` イベントのみ**を `'eventignore'` に追加する（高速化目的）— `BufRead`/`BufEnter`/`FileType` 等は走る。`:windo`/`:tabdo` は doc 上で抑止保証なし

## See also

- 📖 Related: [settings], [mappings]
- 📚 `:h autocmd`, `:h autocmd-events`, `:h augroup`
