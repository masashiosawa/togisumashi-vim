---
id: terminal-job
category: power
status: concept-only
related_drills: []
related_articles:
  - external-commands
  - windows
help_tags:
  - ":h terminal"
  - ":h terminal-job"
---

# Terminal-Job モード

Vim 8+ と Neovim は内蔵ターミナルエミュレータを同梱。Vim ウィンドウ内でシェルを実行 — Vim をサスペンドしたり別ターミナルを開いたりする必要がない。

## コマンド一覧

### 開く

| コマンド          | 動作                                                |
|-------------------|-----------------------------------------------------|
| `:terminal`       | **Vim**: 水平分割でシェル起動。**Neovim**: 現ウィンドウを terminal で**置換**。Neovim で分割したいなら `:split \| terminal` |
| `:vertical terminal` | Vim: 垂直分割。（Neovim: `:vsplit \| terminal` を使う）   |
| `:terminal {cmd}` | シェル代わりに `{cmd}` を実行                        |
| `:term`           | `:terminal` の短縮                                  |

### Terminal-Job モード（実行中）

シェルが動作中（Job モード）:
- キー入力は**シェル**に行く（Vim ではない）
- `<C-w>` だけが Vim 認識プレフィックス

| Key             | 動作                                                  |
|-----------------|-------------------------------------------------------|
| `<C-w>N`        | **Terminal-Normal モード**へ（Vim 制御）              |
| `<C-w>:`        | terminal を離れず Vim ex コマンド実行                 |
| `<C-w>{hjkl}`   | 隣接ウィンドウへ                                      |
| `<C-w>"{r}`     | レジスタ `{r}` を terminal にペースト（**Vim 限定**。Neovim は `<C-\><C-N>"{r}pa`） |
| `i`（Terminal-Normal から） | Terminal-Job モードに戻る                  |

### マッピング

```vim
" <Esc> で terminal モード脱出（Neovim）
tnoremap <Esc> <C-\><C-n>
```

`<C-w>N` と `<C-\><C-n>` は Vim 8 と Neovim 両方で Terminal-Job を抜ける。ただし概念が違う: **Vim** は独立した **Terminal-Normal モード**（`:h Terminal-mode`）へ移行、**Neovim** は通常の Normal モードへ戻る。terminal 内の TUI アプリ（fzf、vim 等）が `<C-w>` を横取りする時は `<C-\><C-n>` をフォールバックとして使う。

## 使い分け

- **`:terminal` vs `:!`**: `:terminal` は**永続** — シェル起動、対話作業、Vim へ戻る。`:!` は単発 — 実行して戻る。REPL・watcher・継続作業には terminal、撃ち放しなら `:!`
- **`:terminal` vs tmux**: tmux は OS レベル・Vim 再起動越え永続。`:terminal` は Vim 内。多くは tmux を多 pane 層に、`:terminal` を偶発的インラインシェルに使う
- **Terminal-Job vs Terminal-Normal**: Job モード = キー入力がシェル入力、Normal モード = Vim 制御（出力バッファを検索/ヤンク）。`<C-w>N` で切替
- **Vim 8 terminal vs Neovim terminal**: 両者動くがキーバインドと API が違う。Neovim の方が洗練されていて `nvim_open_term()` Lua API と統合

## 実例

```text
シェルを開く:                  :terminal
テスト watcher 起動:           :terminal npm test --watch
垂直分割で開く:                :vertical terminal
クイックタスク:                :terminal pytest
Normal へ脱出:                 <C-w>N

Terminal-Normal モードで:
  / search<CR>      terminal 出力を検索
  yiw               単語ヤンク
  :let @+=@"<CR>    システムクリップへコピー

Job モードに戻る:    i  （または a）
```

## 落とし穴

- Terminal-Job を抜けて Vim へ: `<C-w>N` または `<C-\><C-n>` は Vim 8 / Neovim 両方で動く。`<Esc>` を remap する人も多い（`tnoremap <Esc> <C-\><C-n>`）が慎重に — `<Esc>` を実際に必要とするプログラム（less、fzf、Vim 自身）が壊れる
- terminal バッファはプロセス終了後も生存 — 内容は見えたまま。`:bd!` で閉じる
- `:terminal` 内で対話的 Vim を実行しない — 入れ子は脆い。別タブ/ウィンドウで使う
- スクロールバックの長さは **Vim では `'termwinscroll'`、Neovim では `'scrollback'`** で制御する（`'termwinsize'` は terminal ウィンドウの寸法で Vim 専用、別物）
- システムクリップからのペーストは Vim では `<C-w>"+`、Neovim では `<C-\><C-N>"+pa`。ホスト terminal が横取りする場合あり

## See also

- 📖 Related: [external-commands], [windows]
- 📚 `:h terminal`, `:h terminal-job`, `:h CTRL-W_:`
