---
id: digraphs
category: insert
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - insert-mode-keys
  - special-inserts
help_tags:
  - ":h digraphs"
  - ":h i_CTRL-K"
---

# Digraph — 特殊文字の入力

キーボードに無い文字（`é` `→` `™` `©` `…`）を入力する。Vim は 2 文字コードと結果文字の対応表を持っており、組合せで挿入する。

## コマンド一覧

| Key                    | 動作                                                |
|------------------------|-----------------------------------------------------|
| `<C-k>{a}{b}`          | `{a}{b}` の digraph を挿入（Insert / コマンドライン）|
| `:digraphs`            | 全 digraph を表示                                   |
| `:dig {a}{b} {decimal}` | カスタム digraph 定義                              |

## 代表的な digraph

| 種類       | 文字 | キー入力          |
|------------|------|-------------------|
| アキュート | é    | `<C-k>e'`         |
| グレーブ   | è    | `<C-k>e!`         |
| ウムラウト | ö    | `<C-k>o:`         |
| チルダ     | ñ    | `<C-k>n?`         |
| エスツェット | ß    | `<C-k>ss`         |
| セディーユ | ç    | `<C-k>c,`         |
| 円         | ¥    | `<C-k>Ye`         |
| ポンド     | £    | `<C-k>Pd`         |
| ユーロ     | €    | `<C-k>Eu`         |
| 著作権     | ©    | `<C-k>Co`         |
| 商標       | ™    | `<C-k>TM`         |
| 三点リーダ | …    | `<C-k>,.`         |
| Em dash    | —    | `<C-k>-M`         |
| 右矢印     | →    | `<C-k>->`         |
| 左矢印     | ←    | `<C-k><-`         |
| 上矢印     | ↑    | `<C-k>-!`         |
| 下矢印     | ↓    | `<C-k>-v`         |
| 笑顔        | ☺    | `<C-k>0u`         |
| ハート（♡白） | ♡   | `<C-k>cH`         |
| チェック    | ✓    | `<C-k>OK`         |

## 使い分け

- **Digraph vs Unicode コードポイント**: `<C-v>u00e9` で `é` を 16 進指定（4 桁）挿入。Digraph (`<C-k>e'`) の方が短く覚えやすい。番号は知ってるが digraph を知らない場合、または digraph が無い文字にはコードポイントを使う
- **Digraph vs IME**: OS の IME が速い（アクセント記号や CJK）ならそちらが優先。IME が無い、または単発の非キー文字だけが必要な時は digraph
- **Digraph vs ペースト**: 単発なら別所からコピーが簡単。散文での記号繰返しなら digraph が思考コスト低

## 実例

```text
"café" と打つ:    ca<C-k>e'    →  café
右矢印:           <C-k>->      →  →
パイ記号:         <C-k>p*      →  π
一覧:             :digraphs    （`:dig` でも）
カスタム定義:     :dig sn 9731  （以降 <C-k>sn で ☃ U+2603 雪だるま挿入）
```

## 落とし穴

- 多くの digraph は**両順序**で登録されている（`e'` も `'e` も `é`）ため、どちらの打鍵順でも動く。Vim が自動で逆順を試すわけではなく、テーブルに両方が登録されているだけ。
- Unicode digraph（`Eu`、`0u`、`cH`、`,.`、`->` 等）は **`'encoding'`=utf-8** が前提（最近の Vim は既定 utf-8、Neovim は常に utf-8）。`latin1` 環境では Latin-1 範囲のみ動く
- **♥（BLACK HEART SUIT, U+2665）に対応する組込 digraph は存在しない**。定義があるのは ♡（`cH`、白ハート）と ♢（`cD`、白ダイヤ）のみ。♥ が欲しいなら `<C-v>u2665`（コードポイント挿入）を使う
- Insert モードの `<C-k>` は 2 文字目入力まで何も表示しない — 失敗したと思って中断しがちだが、2 つ打つだけ
- ターミナルによっては表示できない字形がある。罫線や珍記号は欠落ボックスとして表示されることも
- `:digraphs` は長くページ送りされる。`:dig` の中で `/arrow` で検索すると速い
- 一部プラグインは `<C-k>` をスニペット補完に振っている。digraph が効かない時は `:imap <C-k>` で確認

## See also

- 📖 Related: [insert-mode-keys], [special-inserts]
- 📚 `:h digraphs`, `:h i_CTRL-K`, `:h digraph-table`
