---
id: settings
category: config
drillable: false
difficulty: intermediate
frequency: mid
related_drills: []
related_articles:
  - mappings
  - autocommands
help_tags:
  - ":h options"
  - ":h :set"
---

# 設定 — `:set` とオプション

Vim には 350 以上のオプションがある。よく使う 30 個を覚えれば、変更したくなることの 95% は満たせる。

## コマンド一覧

| 形式               | 効果                                                |
|--------------------|-----------------------------------------------------|
| `:set {opt}`       | boolean 有効化 / 現在値表示                          |
| `:set no{opt}`     | boolean 無効化                                      |
| `:set {opt}!`      | boolean 切替                                        |
| `:set {opt}?`      | 現在値表示                                          |
| `:set {opt}={val}` | string / number 設定                                |
| `:set {opt}+={val}` | リストオプションに追加                              |
| `:set {opt}-={val}` | リストオプションから削除                            |
| `:set {opt}&`      | デフォルトに戻す                                    |
| `:setlocal`        | 現バッファ/ウィンドウのみ                            |
| `:setglobal`       | グローバル値設定                                    |
| `:set all`         | 全オプション表示                                    |
| `:set`             | 変更されたオプションのみ                            |
| `:options`         | オプションブラウザ                                  |

## 必須オプション（重要度順）

### 検索

```vim
set hlsearch       " 全マッチハイライト
set incsearch      " 入力中プレビュー
set ignorecase     " 大小区別なし
set smartcase      " ...パターンに大文字があれば区別あり
```

### インデント

```vim
set expandtab      " タブを空白に
set tabstop=2      " タブの表示幅
set shiftwidth=2   " インデント単位
set softtabstop=2  " Insert モードの <Tab> が挿入する量
set autoindent     " 前行のインデント継承
set smartindent    " 言語非依存の賢いインデント
```

### 表示

```vim
set number         " 行番号
set relativenumber " 相対行番号
set cursorline     " 現在行ハイライト
set scrolloff=5    " カーソル周辺に 5 行確保
set sidescrolloff=8
set wrap           " 長い行の折返し
set list           " 不可視文字表示
set listchars=tab:▸\ ,trail:·,nbsp:_
```

### ファイル挙動

```vim
set hidden         " 未保存バッファ切替を許可（Neovim は既定オン）
set undofile       " undo を永続化
set undodir=~/.vim/undo
set autoread       " 外部変更を再読込
set updatetime=300 " CursorHold autocmd 用
```

### エンコーディング / 形式

```vim
set encoding=utf-8       " Vim: 既定が locale 依存なので明示推奨。Neovim は常に UTF-8（option 非推奨）
set fileformats=unix,dos " 新規ファイル書込時の改行コード優先順
```

注: `'fileencoding'` は**バッファローカル**。vimrc に書いても起動直後の空バッファにしか効かない。新規ファイル既定にしたいなら `BufNewFile` autocmd か、開いた後に明示設定する。

### UI

```vim
set laststatus=2   " 常にステータスライン表示
set showcmd        " 部分コマンド表示
set wildmenu       " cmdline 補完強化
set wildmode=longest:full,full
set mouse=a        " マウス有効化
```

## 使い分け

- **`:set` vs `:setlocal`**: `:set` はグローバル + ローカル両方（適用可能なら）、`:setlocal` はローカルのみ。`autocmd` で filetype 別設定する時は `:setlocal`
- **`expandtab` vs ハードタブ**: 多くのプロジェクトは空白（`'shiftwidth'` で設定）。`expandtab` を設定して忘れる。ハードタブは Linux kernel 等の特殊プロジェクトのみ
- **`number` vs `relativenumber`**: 絶対は現位置確認、相対は `5j`/`3k` を明確化。組合せ可: `set number relativenumber` で現行は絶対、他は相対
- **`smartcase` は `ignorecase` と必ず併用**: `ignorecase` 単独だと全検索が大小区別なし、`smartcase` を足すとパターンに大文字があれば区別あり。この組合せが正解
- **`updatetime=300` vs デフォルト `4000`**: 低くすると `CursorHold` イベント（LSP hover 等）が機敏。100 未満は性能に影響
- **`mouse=a` vs マウス無効**: クリックで位置指定したいなら有効、ピューリスト構成なら無効。多くはオン

## 設定の置き場所

```
~/.vimrc                    Vim グローバル設定
~/.vim/vimrc                Vim 代替パス
~/.config/nvim/init.lua     Neovim Lua 設定
~/.config/nvim/init.vim     Neovim Vim-script 設定
~/.vim/ftplugin/{ft}.vim    filetype 別設定（自動読込）
~/.vim/after/...            プラグインデフォルトの上書き
```

## 実例

```text
行番号切替:                    :set number!
オプション値表示:              :set tabstop?
タブ幅 4 に:                   :set tabstop=4 shiftwidth=4
path 追加:                     :set path+=src/**
デフォルトに戻す:              :set listchars&
このバッファのみ:              :setlocal wrap

永続 undo + ディレクトリ:
  set undofile
  set undodir=~/.vim/undo
```

## 落とし穴

- `:set` での設定は**セッション限定**。永続化には `~/.vimrc` に記述
- 一部のレガシーオプション: `'compatible'` は Vim のみで、**ユーザ vimrc を読み込むと Vim が自動で `nocompatible` に切り替える**ため、明示的な `set nocompatible` は通常不要（書いても害はない）。`set encoding=utf-8` は Vim で意味あり（既定値が locale 依存なので明示推奨）。Neovim は内部 UTF-8 で `'encoding'` は実質非推奨
- `'number'` と `'relativenumber'` は相互作用 — 両方オン可、両方オフなら番号なし
- `'shiftwidth=0'` は「`'tabstop'` にフォールバック」。直感に反する
- filetype 別設定は `~/.vimrc` でなく `~/.vim/ftplugin/{ft}.vim` に置く（vimrc だと全 filetype に適用される）

## See also

- 📖 Related: [mappings], [autocommands]
- 📚 `:h options`, `:h :set`, `:h option-summary`
