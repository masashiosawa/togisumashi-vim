---
id: folding
category: power
status: concept-only
related_drills: []
related_articles:
  - settings
help_tags:
  - ":h folding"
  - ":h fold-commands"
---

# 折り畳み — セクションの折り畳みと展開

テキスト塊を隠して他に集中する。大規模ファイル（関数・セクション・深いネスト）のナビに有用。Vim には 6 種類の折畳方法がある。

## 折畳方法（`'foldmethod'`）

| 方法        | 折畳の定義方法                                         |
|-------------|--------------------------------------------------------|
| `manual`    | `zf` で明示的に作成                                    |
| `indent`    | インデントレベルで                                     |
| `expr`      | `'foldexpr'`（カスタム関数）で                          |
| `syntax`    | 構文ハイライトグループで                               |
| `diff`      | 差分（diff モードで使用）                              |
| `marker`    | リテラルマーカーで（デフォルト `{{{` と `}}}`）         |

設定: `:set foldmethod=indent`。

## コマンド一覧

### 開閉

| Key      | 動作                                                |
|----------|-----------------------------------------------------|
| `zo`     | カーソル下の fold を開く                            |
| `zO`     | カーソル下の全 fold を開く（再帰）                  |
| `zc`     | カーソル下の fold を閉じる                          |
| `zC`     | カーソル下の全 fold を閉じる（再帰）                |
| `za`     | カーソル下の fold を切替                            |
| `zA`     | 再帰切替                                            |
| `zR`     | 全 fold を開く（Reduce）                            |
| `zM`     | 全 fold を閉じる（More）                            |
| `zv`     | カーソルを見えるようにする最小限の fold を開く       |
| `zx`     | fold を再計算し `'foldlevel'` の状態にリセット、**最後に** `zv`（カーソル可視化）も適用 |
| `zX`     | `zx` と同じだが**最後の `zv` を行わない** — カーソル可視化なし |

### 移動

| Key      | 動作                                                |
|----------|-----------------------------------------------------|
| `zj`     | 次の fold へ下移動                                  |
| `zk`     | 前の fold へ上移動                                  |
| `[z`     | 現在の fold の先頭へ                                |
| `]z`     | 現在の fold の末尾へ                                |

### 作成 / 削除（`manual` および `marker` のみ）

`zf` `zd` `zD` `zE` はいずれも `'foldmethod'` が `manual` または `marker` の時のみ動作する（`indent`/`syntax`/`expr`/`diff` では fold が自動生成されるため直接削除できない — `'foldmethod'` を変えて手動管理する）。

| Key      | 動作                                                |
|----------|-----------------------------------------------------|
| `zf{motion}` | motion 範囲に fold 作成                          |
| `zfap`   | 段落周りに fold 作成                                |
| `zd`     | カーソル下の fold 削除                              |
| `zD`     | 行内の全 fold 削除                                  |
| `zE`     | 全 fold を消去                                      |

## 使い分け

- **`manual` vs `indent`**: `manual` は自分で fold を mark、`indent` はインデントレベルで自動 fold — Python や深インデントコードに最適。コードは `indent`、散文は `manual` から
- **`indent` vs `syntax`**: `indent` は filetype 非依存、`syntax` は言語定義使用 — より意味的（関数を fold、ただのインデントブロックでなく）。利用可能なら `syntax`、無ければ fallback
- **`marker` vs その他**: `marker` はファイルに醜い `{{{` `}}}` を埋め込む。明示的 fold 境界が欲しい共有 dotfile では有用。ソースコードでは避ける
- **`za` vs `zo`/`zc`**: `za` は切替 — 1 キーで両方向。`zo`/`zc` は明示的。頻繁な開閉には `za`
- **`zR` vs `zM`**: 反対。`zR` は全開、`zM` は全閉。覚え方: Reduce / More folding
- **`zv` vs `zo`**: `zv` はカーソルを表示する**最小限**の fold を開く、`zo` は直近の fold を開く。検索で閉じた fold に着地した直後は `zv`

## fold レベル系オプション

| オプション           | 役割                                                              |
|---------------------|-------------------------------------------------------------------|
| `'foldlevel'`       | 現在の fold が閉じる深さ。`0` で全閉じ、大きいほど開いた状態。`zR`/`zM` がこれを操作 |
| `'foldlevelstart'`  | バッファ読込時に適用される `'foldlevel'` の初期値。通常は vimrc で設定。実行中に変えても現バッファには影響せず、その後ロードされるバッファに効く |
| `'foldnestmax'`     | Vim が生成する fold の最大ネスト深さ（`indent`/`syntax` 用）       |
| `'foldcolumn'`      | fold 構造を示す側部カラム幅。Vim: `0`〜`12`（数値）。Neovim は `auto:N`（例 `auto:3`）も受け付け動的サイズ |
| `'foldenable'` (`'fen'`) | fold を描画するかの切替（`zi` で切替）                       |
| `'foldtext'`        | 閉じた fold に表示する 1 行サマリを生成する Vim 式                 |

「起動時に全部開く」典型パターン:

```vim
set foldmethod=indent
set foldlevelstart=99   " 読込時に全展開
set foldnestmax=10
```

## 実例

```text
インデントで fold:              :set foldmethod=indent
可視範囲を fold:                V}zf
全部開いて確認:                 zR
全閉じで俯瞰:                   zM
現 fold 切替:                   za
検索後に文脈表示:               n  zv

vimrc — 標準的な fold 設定:
  set foldmethod=indent
  set foldlevelstart=99   " 起動時に全展開
  set foldnestmax=10
```

## Web 環境について

Web Vim エミュレーションの多くは fold を描画しない。CodeMirror は Vim モデルとは別に fold を扱う。

## 落とし穴

- 遅い `'foldexpr'` を伴う `'foldmethod=expr'` は編集が遅延する。`:profile` で測定
- `'foldmethod=syntax'` は大規模ファイルで遅い — 構文を評価する必要あり。巨大ファイルは `indent` か `manual`
- `zE`（全消去）は「全展開」では**ない** — fold 定義を削除する。展開は `zR`。なお `zE` も `'foldmethod'=manual` または `marker` でのみ動作（`zf`/`zd`/`zD` と同じ制約）
- 多くのプラグインが保存時に再 fold（`zR` 後に保存 → fold が戻る）。`set foldlevelstart=99` でデフォルト展開
- fold はテキストを隠すが無視はしない — `:%s` は fold 行にも作用。`:s/.../.../g` は慎重に

## See also

- 📖 Related: [settings]
- 📚 `:h folding`, `:h fold-commands`, `:h fold-methods`
