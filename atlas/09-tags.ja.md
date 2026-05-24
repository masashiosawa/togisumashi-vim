---
id: tags
category: motion
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - marks-and-jumps
  - quickfix
help_tags:
  - ":h tags"
  - ":h CTRL-]"
  - ":h tagsrch.txt"
---

# タグ — シンボルベースのナビゲーション

事前ビルドした**タグファイル**（通常 `ctags` または `universal-ctags` で生成）を使い、関数・クラス定義へファイル横断でジャンプする。LSP より 20 年以上古く、パーサがある言語なら何にでも動く。

## コマンド一覧

| Key                 | 動作                                                            |
|---------------------|-----------------------------------------------------------------|
| `<C-]>`             | カーソル下の語の定義へジャンプ                                  |
| `g<C-]>`            | `:tjump` と同等（曖昧時にプロンプト）                           |
| `<C-t>`             | タグスタックを戻る                                              |
| `:tag {name}`       | タグ `{name}` へジャンプ                                        |
| `:tag /{pat}`       | パターンマッチする最初のタグへ                                  |
| `:tselect`          | 候補リストから選択                                              |
| `:tjump`            | `:tag` 同様、曖昧時に `:tselect`                                |
| `:tnext` `:tprev`   | タグ候補を順送り                                                |
| `:trewind` `:tlast` | 最初/最後のタグ候補                                             |
| `:tags`             | タグスタック表示                                                |
| `:ptag {name}`      | **プレビューウィンドウ**（split）でタグを開く                    |
| `:pclose`           | プレビューウィンドウを閉じる                                    |

## 使い分け

- **`<C-]>` vs `gd` vs `gD`**: `<C-]>` はタグファイル（プロジェクト全体・全ファイル索引）を使う。`gd` は**現在の関数内**で宣言らしき最初の出現を探す（`[[` で関数先頭を探し、無ければ 1 行目から）。`gD` は**ファイル全体**を 1 行目から検索。関数内のローカル変数は `gd`、ファイル全体は `gD`、別ファイルにあるシンボルは `<C-]>`
- **`<C-]>` vs LSP go-to-definition**: タグは言語非依存・高速・単純 — ただし再生成しないと古くなる。LSP は精密・意味理解・リアルタイム — ただし言語別サーバが必要。現代的構成では LSP、レガシー/多言語/即席なら今もタグ
- **`:tag` vs `:tjump`**: `:tag` は最初の一致に無言で飛ぶ、`:tjump` は曖昧時にプロンプト。最初の結果を信用できないなら `:tjump`（または `g<C-]>`）
- **`:tag` vs `:ptag`**: `:tag` は現バッファを置き換える、`:ptag` はプレビュー split を開く（現在位置を保持）。「位置を失わず覗く」なら `:ptag`
- **タグ vs `:grep`**: タグは索引検索（高速・定義のみ）、`:grep` は全ファイルテキスト検索（遅い・使用箇所と定義両方）。「どこから呼ばれている」には grep

## タグの仕組み

1. プロジェクトルートで `tags` を生成: `ctags -R .`
2. Vim は `'tags'` オプションで探す。**Vim 既定: `./tags,tags`**（上方向検索なし）、**Neovim 既定: `./tags;,tags`** — 末尾の `;` で親ディレクトリへ遡上検索するため、サブディレクトリからプロジェクトルートの `tags` が見つかる。`./TAGS,TAGS` は**既定に含まれない**（ETAGS 形式を使うなら `set tags+=./TAGS,TAGS`）
3. シンボル上で `<C-]>` を押す — `tags` にあるファイル/行へ Vim がジャンプ

フォーマットはプレーンテキスト:
```
funcName    src/foo.c    /^void funcName(...)/
```

## 実例

```text
ワークフロー:
  $ ctags -R .           # タグ生成
  $ vim src/main.c
  /usage_of_foo<CR>      # 呼出を検索
  <C-]>                  # 定義へジャンプ
  読む・編集             # ...
  <C-t>                  # 戻る

位置を保ったまま覗く:    :ptag funcName
候補から選ぶ:            :tselect funcName
パターン検索:            :tag /^my_prefix
```

## 落とし穴

- コード変更で `tags` ファイルは**古くなる**。再生成（手動 `ctags -R` または `autocmd BufWritePost`）
- `<C-]>` はカーソルがタグ単語**上**にある必要。句読点でマッチが壊れる
- タグ検索の大小区別は `'tagcase'` に従う（既定 `followic` = `'ignorecase'` に従う）。`'ignorecase'` の既定が off なので**結果として**大小区別ありになるだけで、直接の既定は `followic`
- 数千ファイルの monorepo では生成が遅い — `universal-ctags` + `--exclude` で軽くする
- LSP とタグは併存可能。多くのユーザは `<C-]>` を LSP に振り、タグはフォールバックとして残す

## See also

- 📖 Related: [marks-and-jumps], [quickfix]
- 📚 `:h tags`, `:h CTRL-]`, `:h tagsrch.txt`, `:h 'tags'`
