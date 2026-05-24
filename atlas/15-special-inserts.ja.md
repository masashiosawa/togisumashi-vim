---
id: special-inserts
category: insert
status: concept-only
related_drills: []
related_articles:
  - files
  - external-commands
  - digraphs
help_tags:
  - ":h :read"
  - ":h :read!"
---

# 特殊挿入 — バッファに外部内容を取り込む

Vim を抜けずに**外部**からバッファへ内容を挿入する: 他ファイル、シェルコマンドの出力、レジスタの値。

## コマンド一覧

| コマンド           | 動作                                                |
|--------------------|-----------------------------------------------------|
| `:r {file}`        | `{file}` を読んで現在行の下に挿入                   |
| `:r! {cmd}`        | `{cmd}` をシェルで実行し出力を下に挿入              |
| `:[line]r {file}`  | `[line]` の**後**に挿入。`:0r file` は 1 行目の前（ファイル先頭）、`:1r file` は 1 行目の後 |
| `:[line]r! {cmd}`  | `[line]` の後にコマンド出力を挿入                   |
| `<C-r>{r}` (Insert)| レジスタ `{r}` を挿入（[insert-mode-keys] 参照）    |
| `:put {r}`         | レジスタ `{r}` を下に put                           |
| `:put! {r}`        | レジスタ `{r}` を上に put                           |
| `:put ={expr}`     | `{expr}` の評価結果を put                           |

## 使い分け

- **`:r` vs `:e`**: `:r` は別ファイル内容を**現バッファに挿入**、`:e` はバッファを**別ファイルに切替**。マージするなら `:r`、フォーカス切替なら `:e`
- **`:r!` vs `:!`**: `:!` はシェル実行して結果をページャ表示、`:r!` は実行結果をバッファに挿入。出力をバッファ内容にしたいなら `:r!`
- **`:r!` vs `:[range]!`**: `:r!` は新規出力を挿入、`:[range]!{cmd}` は既存行を `{cmd}` で**フィルタ**（置換）。新規挿入なら `:r!`、その場変換なら `:.!`
- **`:put` vs `p`**: `:put` は ex 形式・range 対応・強制的に linewise ペースト。`p` は Normal モード・レジスタ種別（char/line/block）尊重。スクリプトや「種別関係なく linewise」が欲しい時は `:put`
- **`:put =expr` vs `<C-r>=`**: 両者とも Vim 式評価。`:put =` は Normal モードで新行に挿入、`<C-r>=` は Insert モードでインライン挿入

## 実例

```text
README を現ドキュメントに取り込む:
  :r README.md

現在日時を挿入:
  :r! date

ファイル一覧を挿入:
  :r! ls -la

ファイル先頭に挿入:
  :0r template.txt

連番 1..10 を挿入:
  :put =range(1,10)

現段落を sort でフィルタ:
  vap  →  :'<,'>!sort
  または Normal で: !ap （motion 範囲確定で cmdline が開く）→ sort<CR>

レジスタ a を現在行から linewise put:
  :put a
```

## 落とし穴

- `:r` はデフォルトで現在行の**後**に挿入。ファイル先頭に置きたいなら `:0r`
- `:r!` はシェル（`'shell'` で設定）で実行される。期待と違うシェルだと**無言で失敗**するので、おかしいと思ったら `:set shell?` を確認
- コマンド出力は末尾改行も含めて**生で**挿入される。除きたいなら `sed`/`awk` でポスト処理
- `:put` は**レジスタの種別に関係なく linewise**で動作する。インライン（charwise）で入れたいなら Insert モードで `<C-r>{r}`、または Normal で charwise yank したレジスタを `"{r}p`
- 重い `{cmd}` の `:r!` は Vim をブロック — デフォルトで非同期ではない。重い処理は `:terminal` か `:!` + バックグラウンドで

## See also

- 📖 Related: [files], [external-commands], [digraphs]
- 📚 `:h :read`, `:h :read!`, `:h :put`
