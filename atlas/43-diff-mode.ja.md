---
id: diff-mode
category: power
status: concept-only
related_drills: []
related_articles:
  - windows
  - external-commands
help_tags:
  - ":h diff"
  - ":h vimdiff"
---

# Diff モード — 並列比較

2 つ以上のファイルを視覚的に比較、差分ハイライトと hunk 別操作。プラグイン不要で同梱。

## コマンド一覧

### diff モードに入る

| コマンド          | 動作                                                |
|-------------------|-----------------------------------------------------|
| `vimdiff f1 f2`   | シェル: 2 つ以上のファイルを diff モードで起動       |
| `vim -d f1 f2`    | `vimdiff` と同じ                                     |
| `:diffsplit {file}` | `{file}` を diff に追加（split + diff）。`:diffsplit` 単独は**水平分割**（`:split` 経由）。垂直にしたいなら `:vertical diffsplit {file}` か `:set diffopt+=vertical`。`vimdiff` 起動時のみ既定で垂直 |
| `:diffthis`       | 現ウィンドウを diff 対象としてマーク                |
| `:diffoff`        | 現ウィンドウの diff を無効化                         |
| `:diffoff!`       | 全ウィンドウの diff を無効化                         |

### Hunk 間移動

| Key      | 動作                                                |
|----------|-----------------------------------------------------|
| `]c`     | 次の hunk（変更）                                   |
| `[c`     | 前の hunk                                           |

### Hunk への操作

| Key      | 動作                                                |
|----------|-----------------------------------------------------|
| `do`     | **Diff obtain** — 他ウィンドウから変更を取り込み    |
| `dp`     | **Diff put** — 自分の変更を他ウィンドウへ送出       |
| `:diffget [bufnr]` | 指定バッファから取得                            |
| `:diffput [bufnr]` | 指定バッファへ送出                              |
| `:diffupdate` `:diffu` | diff を再計算                                |

## 使い分け

- **`vimdiff` vs `git diff`**: `vimdiff` は対話的 — hunk 巡回、両側から変更適用。`git diff` はテキスト出力。解決には vimdiff、閲覧には git diff
- **`do`（obtain） vs `dp`（put）**: `do` は**他ウィンドウ**の版を現ウィンドウに取り込む、`dp` は自分のを他へ送る。覚え方: `do` = 内側に obtain、`dp` = 外側に put
- **`:diffsplit` vs `:diffthis`**: `:diffsplit f` はファイル追加 + 両方で diff 有効化、`:diffthis` は現ウィンドウのみ diff 有効化 — 既に split で開いているファイルに有用
- **3-way diff（マージツール） vs 2-way**: 3 ウィンドウ（`LOCAL` `BASE` `REMOTE`）だと各 hunk のソースが曖昧。`:diffget LOCAL` / `:diffget REMOTE` を明示
- **内蔵 diff vs プラグイン（`vim-fugitive`）**: 内蔵は普遍的。fugitive の `:Gdiffsplit` は git 統合（index/HEAD との 3-way マージ）

## 実例

```text
2 ファイルを比較:                 vimdiff file1 file2
現在と別ファイルを比較:           :vertical diffsplit other.c
右ウィンドウから変更取り込み:     [c  →  do
左ウィンドウへ変更送出:           ]c  →  dp
diff 停止:                        :diffoff!

Git マージ解決:
  $ git mergetool
  （Vim が 3-way diff を開く）
  中央（作業）バッファで:
    :diffget LO    " または :diffget LOCAL
    :diffget RE    " または :diffget REMOTE
    保存、:qa
```

## `'diffopt'` 設定

```vim
set diffopt+=algorithm:patience   " または histogram
set diffopt+=indent-heuristic
set diffopt+=vertical             " デフォルトを垂直分割に
```

`patience` `histogram` アルゴリズムはコードの diff が見やすい（無駄なシフトが減る）。

## 落とし穴

- `do` `dp` は**現 hunk**（カーソル位置）に作用 — カーソルが hunk 領域内にあることを確認、近傍だけではダメ
- 行の追加/削除で diff 番号が無効化 — Vim は自動 `:diffupdate` するが、大量編集後は手動 `:diffu` が必要なことも
- `:diffsplit` は新ウィンドウを開く — 既存ウィンドウには `:diffthis` を各ウィンドウで
- diff モード内の wrap はデフォルト無効。各ウィンドウで `:set wrap` で再有効
- diff モードでは foldcolumn がデフォルト 2 — 見づらいなら `:set foldcolumn=0`

## See also

- 📖 Related: [windows], [external-commands]
- 📚 `:h diff`, `:h vimdiff`, `:h 'diffopt'`, `:h ]c`
