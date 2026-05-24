---
id: undo-redo
category: edit
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-2-09-undo-redo
related_articles:
  - dot-repeat
help_tags:
  - ":h u"
  - ":h CTRL-R"
  - ":h undo-tree"
---

# Undo / Redo

Vim の undo は線形スタックでなく**ツリー**。すべての枝は復元可能。さらに固有のタイムトラベル: `:earlier 5m`。

## コマンド一覧

| Key          | 動作                                                |
|--------------|-----------------------------------------------------|
| `u`          | 直前の変更を undo                                   |
| `{n}u`       | `n` 変更を undo                                     |
| `<C-r>`      | redo（undo の undo）                                |
| `{n}<C-r>`   | `n` ステップ redo                                   |
| `U`          | **現在行**の全変更を取消                            |
| `:earlier {n}` | `n` 変更前の状態へ                                 |
| `:earlier 5m` | 5 分前の状態へ                                     |
| `:earlier 10s` | 10 秒前の状態へ                                    |
| `:later {n}` | `n` 変更/時間進む                                   |
| `g-` `g+`    | undo ツリー全体を移動（古い / 新しい）              |
| `:undolist`  | undo ツリーの葉を表示                               |

## 使い分け

- **`u` vs `U`**: `u` は直前の単一変更を取消、`U` は現在行に来てからのすべての変更を取消。1 行の編集を丸ごと戻すなら `U`
- **`u` vs `<C-r>`**: `u` は後ろ向き、`<C-r>` は前向き（線形履歴）
- **`u`/`<C-r>` vs `g-`/`g+`**: 線形 undo は現在の枝のみ。undo 後に新規編集すると、本来の未来は線形では「失われる」 — `g+` で undo **ツリー**から復活可能
- **`<C-r>` vs `.`**: 別物。`<C-r>` は undo した変更を redo（同じ状態を復元）、`.` は最後の編集を**新規変更**として再適用（新しい undo state を作る）
- **`:earlier 5m` vs `5u`**: `5u` は 5 編集 undo、`:earlier 5m` は**5 分前の状態**にロールバック（編集回数に関係なく）。「昼休み前の状態に戻したい」にはタイムトラベル
- **`u` vs git 復元**: Vim の undo はデフォルトでセッション単位。永続化（`'undofile'`）でセッション跨ぎ可能。長期履歴は git の方が信頼できる

## Undo ツリー

各編集が新しい状態を作る。undo 後に違う編集をすると**枝**が生まれる — 元の経路は保持される。

```
State 0  →  State 1  →  State 2
                   ↓  （undo、新規編集）
                  State 3
```

線形 `u`/`<C-r>` は**現在の枝**を辿る。`g-` で枝分かれ前の State 2 へ。`:undolist` で葉を表示。

## 実例

```text
直前を undo:               u
redo:                      <C-r>
3 つ undo:                 3u
1 行を全部取消:            U
5 分前にタイムトラベル:    :earlier 5m
変更を前進:                :later 999     （999 変更分進む — 現在の枝のみ）

セッション跨ぎで undo を保存:
  :set undofile
  " Vim の 'undodir' 既定は "." で元ファイルの隣に .un~ が散らかる。
  " 1 ディレクトリに集めるなら:
  :set undodir=~/.vim/undo                              " Vim
  :set undodir=~/.local/state/nvim/undo//               " Neovim はこちらが既定
  " (Neovim はこのディレクトリが 'undodir' に既定で組込まれている)
```

## 落とし穴

- Insert モードの 1 セッションは**1 つの undo 単位**がデフォルト。`i hello world<Esc>` 全体を 1 回の `u` で取消。途中で区切りたいなら Insert 中に `<C-g>u`
- `U` は**現在行**に**来てから**の変更だけ undo。行を離れると行単位履歴はリセット
- 新規編集後の `<C-r>` は線形では不可能 — 旧未来は別枝になる。葉番号を確認するなら `:undolist`、特定の葉に直行するなら `:undo {N}`、時間順で辿るなら `g-`/`g+`
- 永続化 undo（`'undofile'`）は `.un~` を作る。Vim の `'undodir'` 既定は `.`（元ファイルの隣で散らかる）、Neovim は `~/.local/state/nvim/undo//` が既定。Vim では `'undodir'` を 1 箇所にしておくと綺麗
- `g-`/`g+` は **時間順**で undo ツリーを辿る（枝構造ではない）。だから線形 `<C-r>` で届かない「捨てた未来」にもこれで到達できる
- `:earlier`/`:later` は `{n}f`（ファイル保存数）も受ける — `:earlier 1f` で直前保存に戻る

## See also

- 🎯 Practice: [tier-2-09-undo-redo]
- 📖 Related: [dot-repeat]
- 📚 `:h u`, `:h CTRL-R`, `:h undo-tree`, `:h :earlier`
