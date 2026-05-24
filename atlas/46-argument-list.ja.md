---
id: argument-list
category: environment
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - buffers
  - starting-vim
help_tags:
  - ":h argument-list"
  - ":h :args"
---

# Argument リスト

Vim 起動時に渡された（または明示設定した）ファイルリスト。バッファ一覧とは別物。`:argdo`（プロジェクト全体操作）の基盤。

## コマンド一覧

| コマンド            | 動作                                                |
|---------------------|-----------------------------------------------------|
| `:args`             | argument リスト表示                                  |
| `:args {files}`     | argument リスト設定（既存をクリア）                  |
| `:args **/*.py`     | glob パターンで設定                                  |
| `:argadd {file}`    | ファイル追加                                        |
| `:argdelete {file}` | ファイル削除                                        |
| `:next` `:n`        | arg リストの次のファイル                             |
| `:prev` `:N`        | 前のファイル                                         |
| `:first` `:rew`     | 最初のファイル                                       |
| `:last`             | 最後のファイル                                       |
| `:argdo {cmd}`      | arg リストの各ファイルで `{cmd}` 実行                |
| `:wnext`            | 現在を保存して次へ                                  |
| `:argument {n}`     | `n` 番目の argument を編集                           |

## 使い分け

- **argument リスト vs バッファ一覧**: arg list = Vim 起動時のファイル（または `:args` で設定）、buffer list = セッション中に開いた全ファイル。arg list は**意図的な部分集合** — 「これらのファイルに対して操作」に有用
- **`:argdo` vs `:bufdo`**: `:argdo` は arg list を巡回、`:bufdo` は **listed buffer のみ**を巡回（help・quickfix・terminal は `'buflisted'` off で対象外）。プロジェクト全体リファクタは args を明示設定 + `:argdo` でスコープを綺麗にできる
- **`:args **/*.py` vs `:bufdo`**: `:args` は glob で populate — 「Python ファイル全部を args にしてリファクタ」に有用。`:bufdo` は事前に開いてある必要
- **`:next` vs `:bn`**: `:next` は arg list、`:bn` は buffer list。別リスト

## 実例

```text
arg リスト確認:                 :args
選択ファイルでリファクタ:
  :args src/**/*.js
  :argdo %s/oldFn/newFn/ge | update

設定して巡回:
  :args **/*.py
  :next  →  編集  →  :wnext  →  編集  →  ...

現バッファを args に追加:        :argadd %
現位置表示:                      :args   （現在のものは [角括弧] で表示）

各 arg で ex コマンド実行:
  :args **/*.py
  :argdo %s/oldFn/newFn/ge | update    （置換 + 保存を各ファイルで）
```

## 落とし穴

- `:args **/*.x` は **glob** であって regex ではない。文法が違う
- `:argdo` はファイルごとのメッセージを表示する — 大量に流れて見落としやすい。抑制したいなら `:silent argdo ...`、各編集後に保存するなら `:argdo ... | update`。1 ファイルでエラーが出るとループ中断
- `:argdo` と `:bufdo` は反復中に **`Syntax` イベントのみ**を `'eventignore'` に追加する（高速化目的）— `BufRead`/`BufEnter`/`FileType` は走るので filetype 検出は機能するが、訪問するファイルごとに syntax highlight は付かない。`:windo`/`:tabdo` は doc 上で抑止保証なし
- arg list は `:mksession` で保存しない限り**セッション限定**。Vim 再起動で失う
- `:next` は現バッファに未保存変更があると進めない。`:wnext` か `:next!`
- args 設定は現リストを**クリア**する。`:args file.txt` で従来の引数を破棄。延長は `:argadd`

## See also

- 📖 Related: [buffers], [starting-vim]
- 📚 `:h argument-list`, `:h :args`, `:h :argdo`
