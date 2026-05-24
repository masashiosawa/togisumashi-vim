---
id: gui
category: display
status: concept-only
related_drills: []
related_articles:
  - settings
  - syntax-highlighting
help_tags:
  - ":h gui"
  - ":h gvim"
---

# GUI Vim / 外部 Neovim GUI クライアント

2 つの異なる枠組み: **(1) Vim 本体の GUI ビルド**（gvim/MacVim、GUI がエディタバイナリの一部）、**(2) Neovim は GUI を持たない** — 外部クライアント（Neovide、Goneovim、firenvim）が Neovim の UI プロトコル経由で `nvim --embed` プロセスにアタッチする。エンジンは同じだがアーキテクチャが違う。

## バリアント

| バリアント   | プラットフォーム                                          |
|--------------|-----------------------------------------------------------|
| **gvim**     | GUI 付き Vim — Linux/Windows（macOS は別ビルド）          |
| **MacVim**   | macOS ネイティブ Cocoa UI                                  |
| **Neovide**  | モダンな Neovim GUI（Rust、滑らかカーソル、リガチャ対応） |
| **Goneovim** | Qt ベース Neovim GUI                                       |
| **firenvim** | ブラウザの textarea 内で Neovim                            |

## コマンド一覧

| コマンド             | 動作                                                |
|----------------------|-----------------------------------------------------|
| `:gui`               | ターミナル Vim から GUI 起動（**Vim 専用**。Neovim に `:gui` はない） |
| `:set guifont=...`   | GUI フォント設定                                    |
| `:set guifont=*`     | フォントピッカーダイアログ（一部 GUI）              |
| `:set guioptions+=m` | メニューバー表示（追加: `m`）                       |
| `:set guioptions-=T` | ツールバー非表示（削除: `T`）                       |
| `:menu`              | メニュー定義一覧                                    |
| `:menu ToolBar`      | ツールバーメニュー項目一覧                          |

## `'guioptions'` フラグ

| フラグ | 意味                                                |
|--------|-----------------------------------------------------|
| `m`    | メニューバー                                        |
| `T`    | ツールバー                                          |
| `r`    | 右スクロールバー常時                                |
| `R`    | 分割時の右スクロールバー                            |
| `l`    | 左スクロールバー常時                                |
| `L`    | 分割時の左スクロールバー                            |
| `b`    | 下スクロールバー                                    |
| `a`    | Visual 選択を自動的にシステムクリップへ              |
| `c`    | GUI ポップアップでなくコンソールダイアログ（テキスト）|
| `e`    | GUI タブページ                                      |

## 使い分け

- **ターミナル Vim vs GUI Vim**: ターミナルはどこでも動きシェル統合、GUI はくっきりフォント・リガチャ・ネイティブダイアログ。多くのヘビーユーザは混在使用 — デスクは GUI、SSH はターミナル
- **gvim vs MacVim**: MacVim は macOS ネイティブ（統合よし・retina 対応）、gvim はクロスプラットフォーム（OS 跨ぎ単一設定）。macOS では日常使いに MacVim
- **Vim GUI vs Neovim GUI**: Neovim は厳密な UI プロトコル — 複数 GUI（Neovide、Goneovim 等）が 1 つの Neovim にアタッチ可。Vim の GUI は一体型
- **`guifont` 文法**: プラットフォーム依存。macOS: `Monaco:h12`、Linux: `Monospace\ 12`（スペースをエスケープ）、Windows: `Consolas:h11:cANSI`。プラットフォームに合わせる

## 実例

```text
ツールバー非表示:              :set guioptions-=T
全スクロールバー非表示:        :set guioptions-=rRlLb
visual の自動コピー:           :set guioptions+=a
フォント設定:                  :set guifont=JetBrains\ Mono:h13
フォント一覧（Linux + fontconfig）: fc-list | grep -i mono
フォント一覧（macOS）:          system_profiler SPFontsDataType | grep -i mono

vimrc:
  if has('gui_running')
    set guifont=JetBrains\ Mono:h13
    set guioptions-=T
    set guioptions-=r
    colorscheme habamax
  endif
```

## Web 環境について

Web Vim エミュレーション自体が「GUI」のようなもの — ブラウザで動く。本記事はスタンドアロン GUI Vim 用。

## 落とし穴

- `guifont` のスペースは `\` でエスケープ: `set guifont=Source\ Code\ Pro:h12`
- 一部 GUI オプション（`a` で visual 選択を自動コピー）は Vim 流ではない — 多くは無効化
- `-f`（または `--nofork`）で gvim はフォアグラウンド実行（git commit メッセージ等に有用）。Neovim 系 GUI は別フラグ（Neovide なら `--no-fork` 等、実装ごと）
- 多くの GUI は追加設定ファイルを読む: `~/.gvimrc`（gvim）、`~/.config/nvim/ginit.vim`（Neovide）。GUI オプションを `~/.vimrc` に書かない — ターミナル Vim でエラーになる
- リガチャ対応は **GUI 側の対応**と**リガチャ対応フォント**（Fira Code、JetBrains Mono 等）の両方が必要: Neovide は `guifont` のフォント次第で描画、**MacVim は `:set macligatures`**（既定 off）、gvim はビルド次第、ターミナル Vim はホスト端末次第

## See also

- 📖 Related: [settings], [syntax-highlighting]
- 📚 `:h gui`, `:h gvim`, `:h 'guifont'`, `:h 'guioptions'`
