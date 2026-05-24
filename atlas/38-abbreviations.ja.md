---
id: abbreviations
category: config
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - mappings
  - insert-mode-keys
help_tags:
  - ":h abbreviations"
  - ":h :abbreviate"
---

# 略語 — テキスト展開

入力した略語が非単語文字を打った瞬間に展開される。タイポ修正・ボイラープレート展開・ドメイン特化短縮に使う。マッピングほど人気ではないが意味論的に別物。

## コマンド一覧

| コマンド             | 適用モード                     |
|---------------------|--------------------------------|
| `:abbreviate`       | Insert とコマンドライン両方     |
| `:iabbrev` `:iab`   | Insert モードのみ              |
| `:cabbrev` `:cab`   | コマンドラインのみ              |
| `:noreabbrev`       | 非再帰版（モード別に `:inoreabbrev` `:cnoreabbrev` もある） |
| `:unabbreviate`     | 略語削除                       |
| `:abclear`          | 全略語クリア                   |
| `:abbreviate`（引数なし） | 略語一覧                  |

## 文法

```vim
:iabbrev teh the
:iabbrev <expr> tdy strftime('%Y-%m-%d')
:cabbrev cdh cd %:h
```

展開は略語の後に**非単語文字**（スペース、句読点、`<CR>`、`<Esc>`）を打った時に発火する。

### 略語の 3 種類（`:h abbreviations`）

Vim は `{lhs}` の文字構成で分類する:

| 種類        | `{lhs}` の形                                 | トリガー条件                                        |
|-------------|----------------------------------------------|-----------------------------------------------------|
| **full-id** | 全文字が `'iskeyword'`（英数字・`_`）        | `{lhs}` の直前が非キーワードまたは行頭でなければ発火しない |
| **end-id**  | 末尾はキーワード文字、内部に非キーワードを含む | 直前の文字は何でも可                              |
| **non-id**  | 末尾が非キーワード文字                       | `{lhs}` の直前が非キーワードまたは行頭でなければ発火しない |

例: `iabbrev teh the` は full-id（単語の途中では発火しない）。`iabbrev <-- ←` は non-id。`iabbrev #i #include` は end-id。

## 使い分け

- **略語 vs マッピング**: 略語は**トリガー文字**で Insert/Cmdline モードのみ展開、マッピングはキー押下で即発火・指定モードで動作。**単語的テキスト展開**は略語、**動作**はマッピング
- **`:iab` vs スニペットプラグイン**: `:iab` は内蔵・単純・単行テキスト。スニペットプラグイン（UltiSnips、vim-snippets、LuaSnip）は複数行・タブストップ・動的内容を扱う。本格テンプレートはプラグイン
- **`:iab teh the` vs 自動修正**: 略語は登録した分しか直さない。スペルチェック（`:set spell`）は視覚的にタイポを示し手動修正
- **`:cab` vs alias**: `:cabbrev` は cmdline 入力中に書換 — 賢いが驚く。コマンド alias なら `:command -nargs=... MyCmd ...` を使う。
- **`:noreabbrev` vs `:abbreviate`**: マッピング同様、非再帰版が安全。チェーン展開が必要でない限り `:noreabbrev`

## 実例

```vim
" よくあるタイポ修正
iabbrev teh the
iabbrev recieve receive
iabbrev cancled canceled

" ボイラープレート
iabbrev ssig -- <CR>Sincerely,<CR>Your Name
iabbrev sig@ name@example.com

" 式で日付/時刻
iabbrev <expr> ddate strftime('%Y-%m-%d')

" コマンドライン短縮
cabbrev cdh cd %:h
cabbrev W w

" filetype ローカル（ftplugin/python.vim 内）
iabbrev <buffer> imp import
iabbrev <buffer> fn def
```

## 落とし穴

- 略語の発火は**非単語文字**。`teh<Esc>` は展開、`teher<Esc>` は展開しない（まだキーワード）。強制展開には Insert 中の `<C-]>`
- `:cabbrev W w` は古典 — だが cmdline で `W` を打つたびに展開。`:Walk` が `:walk` になる — 驚き要素。`:command! W w` を使う
- `:noremap` 系マッピング内では略語は展開されない。`:noreabbrev` は **`:abbreviate` の非再帰版**（その略語の置換テキストが**さらに別の略語**を発火させるのを防ぐもので、マッピングからの抑止とは別概念）。マッピングで強制展開したいなら rhs に `<C-]>` を埋める
- スニペットプラグインと衝突可 — スニペットトリガーと略語が同じキーワードを共有すると挙動不定。どちらかに統一
- 望まぬ展開が画面に残った状態で保存: トリガー文字の前に `<C-v>` で展開抑止（`teh<C-v> ` で `teh ` を残せる）

## See also

- 📖 Related: [mappings], [insert-mode-keys]
- 📚 `:h abbreviations`, `:h :abbreviate`, `:h abbrev`
