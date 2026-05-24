---
id: spell-checking
category: power
drillable: false
difficulty: intermediate
frequency: low
related_drills: []
related_articles:
  - settings
help_tags:
  - ":h spell"
  - ":h z="
---

# スペルチェック

Vim は内蔵のスペルチェックを持つ（辞書・ナビ・個人語彙リスト）。ドキュメント・コミットメッセージ・散文に有用。

## コマンド一覧

### 有効化

```vim
:set spell           " オン
:set nospell         " オフ
:set spelllang=en    " 英語（デフォルト）
:set spelllang=en,cjk " 英語 + CJK 文字をスキップ（日中韓共通）
:set spellfile=~/.vim/spell/personal.utf-8.add
```

### ナビゲーション

| Key      | 動作                                                |
|----------|-----------------------------------------------------|
| `]s`     | 次のスペルミス / rare / 他リージョン語              |
| `[s`     | 前（`]s` と同範囲）                                  |
| `]S`     | 次の**確実なミスのみ**（rare/region は除外、`]s` より厳密） |
| `[S`     | 前（`]S` と同範囲）                                  |

### カーソル語に作用

| Key      | 動作                                                |
|----------|-----------------------------------------------------|
| `z=`     | 候補表示                                            |
| `{n}z=`  | プロンプトなしで候補 `n` を選択                      |
| `zg`     | **正**としてマーク（個人辞書に追加）                |
| `zG`     | このセッションのみ正                                |
| `zw`     | **誤**としてマーク（spellfile に `!` 付きで追加）    |
| `zW`     | このセッションのみ誤                                |
| `zug` `zuw` | zg / zw を取消                                   |

## 使い分け

- **`z=` vs 自動修正**: `z=` は番号付き候補リスト。番号を打って `<CR>`。自動置換はなし — Vim は毎回確認する
- **`zg` vs 辞書追加**: `zg` は個人 `spellfile` に追加。`'spellfile'` が空なら、`runtimepath` の先頭にある書込可能ディレクトリの `spell/<lang>.utf-8.add` を自動作成（典型的に Vim は `~/.vim/spell/en.utf-8.add`、Neovim は `~/.config/nvim/spell/en.utf-8.add`）。保守可能・バージョン管理可能
- **`spelllang=en` vs `en_us`**: `en` は全英語変種を受容、`en_us` / `en_gb` は厳密 — `colour` は `en_us` だと誤り。スタイルで選ぶ
- **多言語 `spelllang=en,de`**: Vim は各言語をチェックしてどれかで合致すれば許容。バイリンガル文書に良い。注意: Vim には**日本語スペルファイルは存在しない**（`.spl` がない）。日英混在文書では `spelllang=en,cjk` で CJK 範囲をスキップする

## 実例

```text
現バッファで有効化:           :setlocal spell
スペルミスを巡回:             ]s  z=  （選択）  ]s  z=  ...
"Neovim" を辞書追加:          単語上で: zg
最初の候補を採用:             1z=
バッファのみ無効化:           :setlocal nospell

filetype 別（ftplugin/markdown.vim 内）:
  setlocal spell spelllang=en
```

## 落とし穴

- Vim は各言語の**スペルファイル**を必要とする。英語は内蔵、他は初回使用時にダウンロード（許可制）。オフライン環境では手動インストール
- `'spell'` は**ウィンドウローカル**（バッファローカルではない）。同一バッファを別ウィンドウに開いても継承しない。バッファ単位の感覚で欲しいなら `BufEnter` autocmd で設定
- スペルミスは GUI では波線下線、ターミナルでは色付き文字。色が悪いなら `:hi SpellBad` を確認
- `z=` の候補は非ソート — 番号 `1` が最良とは限らない。リストを読む
- コード中心ファイル（プログラミング言語）は識別子をスペルミス判定する。コードでは無効化するか、構文技でコメント領域のみ `spell` にする

## See also

- 📖 Related: [settings]
- 📚 `:h spell`, `:h z=`, `:h 'spelllang'`, `:h spellfile`
