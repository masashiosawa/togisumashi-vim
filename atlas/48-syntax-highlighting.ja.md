---
id: syntax-highlighting
category: display
drillable: false
difficulty: intermediate
frequency: low
related_drills: []
related_articles:
  - settings
help_tags:
  - ":h syntax"
  - ":h :syntax"
  - ":h colorscheme"
---

# 構文ハイライト

言語構造で色分け: キーワード・文字列・コメント・型。600 以上の filetype に内蔵対応。「Vim は本物のエディタ」の視覚的半分。

## コマンド一覧

| コマンド            | 動作                                                |
|---------------------|-----------------------------------------------------|
| `:syntax on`        | 構文ハイライト有効化                                |
| `:syntax off`       | 無効化                                              |
| `:syntax enable`    | `on` 同様、ただし `:highlight` 設定を保持           |
| `:syntax reset`     | デフォルトハイライトに戻す                          |
| `:syntax sync fromstart` | ファイル先頭から再スキャン（ズレ修正）          |
| `:colorscheme {name}` | colorscheme `{name}` をロード                      |
| `:colors`           | `:colorscheme` と同じ                               |
| `:highlight {group} ...` | ハイライトグループ変更                          |
| `:filetype on`      | filetype 検出 + 適用                                 |
| `:filetype plugin on` | + filetype 別プラグインをロード                    |
| `:filetype indent on` | + filetype 別インデントをロード                    |
| `:set filetype={ft}` | filetype を手動設定                                |

### Treesitter（Neovim、core）

| コマンド          | 動作                                                |
|-------------------|-----------------------------------------------------|
| `:Inspect`        | カーソル位置のハイライトグループ（syntax + Treesitter）を表示（0.9+） |
| `:InspectTree`    | 現バッファの Treesitter パースツリーを表示（0.9+）  |
| `:EditQuery`      | Treesitter query のライブエディタ                   |

## 使い分け

- **`:syntax on` vs `:syntax enable`**: `on` はカスタムハイライトをデフォルトで上書き、`enable` は `:highlight` の上書きを保持。カスタマイズしているなら `enable`
- **`:filetype on` vs `:filetype plugin indent on`**: 前者は検出のみ、フル形式は filetype 別プラグイン（マッピング・略語）とインデントルールもロード。多くはフル形式が欲しい
- **`:colorscheme` vs `:highlight` 編集**: colorscheme はキュレートされたセット、`:highlight` は 1 グループずつ調整。クイック修正は `:highlight`、本格カスタマイズは colorscheme ファイル作成
- **内蔵構文 vs Treesitter（Neovim）**: 内蔵は regex — 高速・どこでも動く・時に脆い。Treesitter は本物のパーサ — 意味的・堅牢。**Treesitter ランタイムは Neovim 0.5 から core に同梱**（`vim.treesitter` API）、0.10 で `c`、`lua`、`vimscript`、`vimdoc`、`query`、`markdown` のパーサも core に同梱された。`:Inspect`（core、0.9+）でカーソル位置のハイライトグループを確認、他言語のパーサ/query 管理は `nvim-treesitter` プラグイン（`:TSInstall {lang}`）が一般的
- **`:set filetype=ft` vs `:setf ft`**: `:set` は常に適用、`:setf` は未設定時のみ — autocommand 内で二重適用を避けるのに有用

## 代表的なハイライトグループ

```
Comment, Constant, String, Number, Boolean,
Identifier, Function, Statement, Keyword, Operator,
Type, Special, Error, Todo,
Normal, NonText, LineNr, CursorLine, StatusLine,
Pmenu (popup menu), Search, IncSearch, MatchParen,
DiffAdd, DiffDelete, DiffChange
```

変更: `:highlight Comment guifg=#888 ctermfg=DarkGrey`

## 実例

```text
全部有効化:                  :syntax on  →  :filetype plugin indent on
テーマ選択:                  :colorscheme habamax   （内蔵ダークテーマ）
インストール済みテーマ一覧:  :colorscheme <Tab>
filetype を強制:             :set filetype=python   （拡張子が合わない時）
カーソル下のグループ調査:    :echo synIDattr(synID(line('.'),col('.'),1),'name')
コメントを明るく:            :highlight Comment guifg=#aaa

vimrc:
  syntax enable
  filetype plugin indent on
  colorscheme habamax
  set termguicolors           " ターミナルで 24-bit color
```

## 落とし穴

- ターミナル色は制限あり（8 / 16 / 256）。フルカラースキームには `'termguicolors'` 設定 + true color 対応ターミナル
- `'background'`（`light` / `dark`）が colorscheme の表示を制御。`:colorscheme` の**前**に設定で予測可能
- 一部 colorscheme は `'background'` を尊重しない。ドキュメント参照
- 長いファイルで構文がズレることがある（Vim はウィンドウしか見ない）。`:syntax sync fromstart` で修正 — 巨大ファイルでは遅い
- `:syntax on` 再実行でカスタム `:highlight` 設定は失われる。`:syntax enable` を使うか `ColorScheme` autocmd で定義

## See also

- 📖 Related: [settings]
- 📚 `:h syntax`, `:h :colorscheme`, `:h highlight-groups`
