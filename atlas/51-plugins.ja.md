---
id: plugins
category: meta
status: concept-only
related_drills: []
related_articles:
  - mappings
  - help-system
help_tags:
  - ":h packages"
  - ":h plugin"
---

# プラグイン — Vim を拡張する

純正 Vim を知ったら、プラグインで力を倍化する。「Vim ユーザー」から「自分のワークフローに合った Vim ユーザー」への入口。

## プラグインマネージャ

| マネージャ      | 対象       | スタイル                                       |
|-----------------|------------|-----------------------------------------------|
| **vim-plug**    | Vim/Neovim | 単一ファイル・宣言的・インストール + 更新     |
| **packer.nvim** | Neovim     | Lua ベース、遅延読込対応                       |
| **lazy.nvim**   | Neovim     | モダン・高速・デフォルト遅延                   |
| **dein.vim**    | Vim/Neovim | Vim script（TOML 設定も可）・高速              |
| **ネイティブパッケージ** | Vim 8+/Neovim | 内蔵。Vim は `~/.vim/pack/.../start/`、Neovim は `$XDG_DATA_HOME/nvim/site/pack/.../start/`（典型的に `~/.local/share/nvim/site/pack/.../start/`）。`:set packpath?` で確認 |

## 必須プラグイン（普遍）

| プラグイン            | 追加機能                                                  |
|-----------------------|-----------------------------------------------------------|
| **vim-surround**      | `cs"'` で囲みクォート変更、`ds(` で囲み括弧削除、`ysiw)` で追加 |
| **vim-commentary**    | `gcc` で行コメント切替、`gcap` で段落                      |
| **vim-repeat**        | プラグイン操作を `.` 反復可能に                            |
| **targets.vim**       | より良いテキストオブジェクト: `dan)` 次のペア、`dil)` 直前の括弧 |
| **vim-easymotion** / **vim-sneak** / **flash.nvim** | 2 文字プレフィックスのクイックジャンプ |
| **vim-fugitive**      | Vim 内 git                                                |
| **fzf.vim** / **telescope.nvim** | ファイル・バッファ・行のファジー検索       |
| **vim-airline** / **lualine**     | ステータスライン                          |
| **NERDTree** / **nvim-tree** / **oil.nvim** | ファイルエクスプローラ              |
| **gitsigns.nvim**     | Git 変更行マーカー                                        |

## LSP と言語ツール（Neovim）

| ツール                | 役割                                                  |
|-----------------------|-------------------------------------------------------|
| **nvim-lspconfig**    | LSP サーバ設定                                        |
| **nvim-cmp**          | 補完エンジン                                          |
| **nvim-treesitter**   | Treesitter パーサ（構文 + クエリ）                     |
| **none-ls.nvim**      | formatter / linter を LSP として接続（`null-ls` は 2023 年にアーカイブ、`none-ls.nvim` が現役 fork） |

## 使い分け

- **vim-plug vs lazy.nvim**: 両方動く。vim-plug は古く単純・バージョン跨ぎ、lazy.nvim はモダン・遅延読込で起動高速・Neovim 専用。新規 Neovim ユーザは lazy.nvim、長年 Vim 派は vim-plug 継続が多い
- **vim-commentary vs nvim-comment**: ほぼ同 API。マネージャが扱いやすい方
- **NERDTree vs oil.nvim**: NERDTree はツリーサイドバー、oil.nvim はディレクトリをバッファ表示（名前編集でリネーム！）。パラダイムが違う、好みで
- **fzf vs telescope**: fzf は外部 `fzf` バイナリ使用で高速、telescope は Lua ネイティブで Neovim API 深統合。両者ファジー検索
- **Treesitter vs 内蔵構文**: Treesitter は正確（本物のパーサ）・言語別テキストオブジェクト、内蔵は普遍・無設定。パーサのある言語なら Neovim では Treesitter

## プラグインインストール（vim-plug 例）

```vim
call plug#begin('~/.vim/plugged')
  Plug 'tpope/vim-surround'
  Plug 'tpope/vim-commentary'
  Plug 'tpope/vim-repeat'
  Plug 'tpope/vim-fugitive'
  Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
  Plug 'junegunn/fzf.vim'
call plug#end()
```

Vim 内で:
```
:PlugInstall    " インストール
:PlugUpdate     " 更新
:PlugClean      " 不要削除
```

## スタータセット

最小だが効果的:

```
1. vim-surround       " 新 operator
2. vim-commentary     " コメント切替
3. vim-repeat         " 1 & 2 を `.` 対応
4. vim-fugitive       " git
5. fzf / telescope    " ファイル検索
```

ここから先は個人趣味。具体的な痛みが出てから足す。

## 落とし穴

- プラグインは多いほど良いとは限らない。各々が起動時間・衝突可能性・学習負荷を追加。年 1 回監査
- プラグインは内蔵 motion / operator を無音で上書き可能。`:map` で何が乗っ取られたか確認
- 遅延読込は起動高速化だが複雑性を増す。計測（`:profile`）なしで遅延化しない
- プラグインドキュメントは通常リポ内と、インストール後の `:help {plugin-name}`。ネイティブパッケージでは、`pack/*/start/` 配下のプラグインは起動時に **各 `doc/` の `tags` が自動生成**される（Vim がパッケージロード時に `:helptags` 相当を内部実行）。`pack/*/opt/` から `:packadd` で読み込むものは、tags が無い/古い場合に手動で `:helptags {dir}` が必要
- 多くのプラグインが Vim → Neovim に移行している。Pure Vim ユーザは非対応化を見る: 例 `nvim-cmp` は Neovim のみ

## See also

- 📖 Related: [mappings], [help-system]
- 📚 `:h packages`, `:h plugin`
- 外部: <https://vimawesome.com>
