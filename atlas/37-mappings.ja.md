---
id: mappings
category: config
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - settings
  - abbreviations
help_tags:
  - ":h map.txt"
  - ":h :map"
  - ":h key-notation"
---

# マッピング — キーボードショートカット

キー列にコマンドを束ねる。Vim における「俺コマンド」全ての機構。**必ず `noremap` 系を使う** — 安全。

## コマンド一覧

### 定義

| コマンド       | 適用モード                                              |
|---------------|---------------------------------------------------------|
| `:map`        | Normal、Visual、Select、Operator-pending                |
| `:nmap`       | Normal のみ                                             |
| `:imap`       | Insert                                                  |
| `:vmap`       | Visual + Select                                         |
| `:xmap`       | Visual のみ                                             |
| `:smap`       | Select のみ                                             |
| `:omap`       | Operator-pending                                        |
| `:cmap`       | コマンドライン                                          |
| `:tmap`       | Terminal-Job                                            |
| `:map!`       | Insert + コマンドライン                                  |

**非再帰版**（推奨）: `map` を `noremap` に置換 — `:nnoremap` `:inoremap` 等。他のマッピングを再展開しないので無限ループを避けられる。

### 一覧 / 削除

| コマンド       | 動作                                                |
|---------------|-----------------------------------------------------|
| `:map`        | 全マッピング一覧                                    |
| `:nmap`       | Normal マッピング一覧                                |
| `:map {lhs}`  | `{lhs}` のマッピング表示                             |
| `:unmap {lhs}` | マッピング削除（モード別）                         |
| `:mapclear`   | 全マッピング削除（モード別）                         |

## 文法

```vim
:nnoremap <lhs> <rhs>
:nnoremap <Leader>w :w<CR>
:inoremap jk <Esc>
:vnoremap <C-c> "+y
```

### キー記法

| 記法           | 意味                                                |
|----------------|-----------------------------------------------------|
| `<CR>` `<Enter>` `<Return>` | Enter                              |
| `<Esc>`        | Escape                                              |
| `<Tab>`        | Tab                                                 |
| `<BS>`         | Backspace                                           |
| `<Space>`      | スペース                                            |
| `<C-x>`        | Ctrl+x                                              |
| `<S-x>` or `X` | Shift+x — **アルファベットキー**では `<S-a>` と `A` は同義扱い。大文字を直接書く方が安全 |
| `<A-x>` or `<M-x>` | Alt/Meta+x                                      |
| `<Leader>`     | カスタマイズ可能、デフォルト `\`                     |
| `<LocalLeader>`| バッファローカル leader                              |
| `<Plug>`       | プラグイン内部キー（衝突回避用）                     |

### Map-arguments（マップ引数）

`:map` 系コマンドの **`{lhs}` の前**に置く:

| 引数         | 効果                                                                |
|--------------|---------------------------------------------------------------------|
| `<silent>`   | cmdline に `{rhs}` をエコーしない（ユーザーマッピングは大抵欲しい） |
| `<expr>`     | `{rhs}` を Vim 式として評価し、その**文字列結果**をキー入力として送る |
| `<buffer>`   | 現バッファのみに適用（ftplugin / filetype ローカル）                |
| `<nowait>`   | より長い前置を待たず即マッチ（短い map が長い map の前置の時に `'timeoutlen'` の遅延を回避） |
| `<unique>`   | 既存マッピングがあればエラー（プラグインで上書き防止）              |
| `<script>`   | `{rhs}` は同じスクリプト内で定義されたマッピングのみ参照可（サンドボックス） |

```vim
nnoremap <silent> <Leader>/ :nohlsearch<CR>
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
nnoremap <buffer> q :bd<CR>
nnoremap <nowait> <Leader>x :Foo<CR>
```

### Leader

`<Leader>` は個人マッピングの設定可能なプレフィックス:

```vim
let mapleader = " "         " スペースを leader に
nnoremap <Leader>w :w<CR>   " スペース + w で保存
```

## 使い分け

- **`:map` vs `:noremap`**: **常に `:noremap`**。`:map` は他のマッピングを再展開 — ループ作成しやすくデバッグ困難。`:noremap` が安全で 99% の場面でこちら
- **`:nmap` vs `:map`**: `:nmap` は Normal のみで予測可能、`:map` は Normal + Visual + Operator-pending に適用 — Visual で予期しない動作の元
- **`:vmap` vs `:xmap`**: `:vmap` は Select モード（多くのプラグインがスニペットプレースホルダで使う）を含む、`:xmap` は Visual のみ。`:xmap` を優先（Select も明示的に欲しい時のみ `:vmap`）
- **マッピング内の `<C-c>` vs `<Esc>`**: `<C-c>` は「割り込み」として Normal に戻り、Vim のバージョンによっては `InsertLeave` や略語展開を飛ばすことがある。`<Esc>` が綺麗な脱出で autocmd の順序も予測可能
- **`<Leader>` vs ハードコードプレフィックス**: `<Leader>` はユーザーが上書き可能。プラグイン作成時は `<Plug>` で動作を定義し、ユーザーに `<Leader>` を `<Plug>` に束ねさせる
- **マッピング vs alias vs 関数**: 単発なら map、複雑なら `:command` か関数を書く、Insert/Cmdline のテキスト展開なら [abbreviations]

## 実例

```vim
" 高速保存
nnoremap <Leader>w :w<CR>

" 検索ハイライトクリア
nnoremap <Leader>/ :nohlsearch<CR>

" jk で Insert 脱出
inoremap jk <Esc>

" システムクリップにヤンク
vnoremap <Leader>y "+y

" 行を上下に移動
nnoremap <A-j> :m .+1<CR>==
nnoremap <A-k> :m .-2<CR>==

" relativenumber 切替
nnoremap <Leader>r :set relativenumber!<CR>

" vimrc を開く
nnoremap <Leader>ev :e $MYVIMRC<CR>
```

## 落とし穴

- `:noremap` でなく `:map` を使うと、`{rhs}` がマップ済みキーを含む時に無限再帰する可能性。常に `:noremap` から始める
- Insert モードマッピングは**タイムアウト**遅延あり — `jk` で escape する時、Vim は `jl`/`ji` 等の入力を待つ。`'timeoutlen'` で調整
- モード混同: `:imap` は Normal に影響せず、`:map` は cmdline に影響しない。明示的に
- `<Leader>` は**マッピング定義時点の `mapleader` の値**で展開され、その後固定される。後で `mapleader` を変えても既存マッピングは更新されない。vimrc の冒頭で `mapleader` を 1 回設定してから `<Leader>` 系マッピングを書く
- 組込キー（`<C-a>` 等）のマッピングは元の挙動を壊す。フォールバック保存（`nnoremap <Leader><C-a> <C-a>`）
- プラグインのマップはデフォルトで vimrc の**後**にロード。上書きには `~/.vim/after/plugin/...` か `:autocmd VimEnter`
- Vim と Neovim でデフォルトマッピングが違う: **Neovim 0.6+ は `Y` を `y$` にマップ済み**（Vim は `Y` ≡ `yy`）。行ヤンクの感覚で動かしたいなら Neovim 設定に `nnoremap Y yy` を追加

## See also

- 📖 Related: [settings], [abbreviations]
- 📚 `:h map.txt`, `:h :map`, `:h key-notation`, `:h <Leader>`
