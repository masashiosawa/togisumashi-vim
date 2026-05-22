# togisumashi-vim

> **寿司打型 Vim ドリル — タイピングゲーム速度で Vim を極める**

[English](README.md) | [日本語](README.ja.md)

togisumashi-vim は Neovim 向けのスピードドリル練習アプリです。日本語タイピングゲーム「[寿司打](https://sushida.net/play.html)」にインスパイアされ、タイム計測と反復練習で Vim の操作を体に染み込ませます。Web アプリと（近日）Neovim プラグインで提供します。

## 特徴

- **3 レベルセッション** — 初級（モーション）/ 中級（編集コマンド）/ 上級（ミックス）
- **Guided & Skip モード** — Guided はレッスン順にコンセプトテキストを表示しながら進行。Skip は Tier 内からランダムに N 問を抽出
- **Practice & Test モード** — Practice ではヒントキーをオンデマンドで表示。Test ではヒントを非表示にしてライブタイマーを表示
- **2 カラムレイアウト** — 左に設定・コンセプト、右にターミナルコンソール。スクロール不要
- **進捗追跡** — localStorage で全試行を記録。セッション終了後に苦手ドリルを Focus オプションで再練習可能
- **英語・日本語の両言語対応** — first-class として同等に対応

## Web アプリ

👉 [vim.togisumashi.dev](https://vim.togisumashi.dev)

インストール不要。ブラウザを開き、左パネルでレベルとモードを選んで Start ボタンをクリックするだけ。

## Neovim プラグイン

> 開発中 — 完成次第、専用のミラーリポジトリから配布予定。
> このリポジトリをウォッチしてアップデートをお待ちください。

## ドリル一覧

| Tier | レベル | レッスン | ドリル数 |
|------|--------|---------|---------|
| 1 | 初級 | `hjkl` · 単語移動（`w b e`）· 行端移動（`0 $ ^ g_`）· ファイル内ジャンプ（`gg G {N}G`）· 行内検索（`f F t ; ,`） | ✅ 25 問 |
| 2 | 中級 | 削除（`dw dd D diw`）· ヤンク/ペースト（`yy p P ddp`）· 変更（`cw cc C ciw r`） | ✅ 15 問 |
| 3 | 上級 | — | 🚧 ロードマップ |

合計: **8 レッスン 40 ドリル**。新しいドリルを継続追加中。

## リポジトリ構成

```
togisumashi-vim/
├── web/            # Web アプリ（Vite + React + TypeScript + CodeMirror 6）
├── neovim-plugin/  # Neovim プラグイン — 開発中
├── drills/         # 共有ドリル定義（Markdown + YAML frontmatter）
├── docs/           # ドキュメント
├── scripts/        # ビルドスクリプト（ドリル JSON 生成）
├── README.md
├── README.ja.md
├── CONTRIBUTING.md
├── CONTRIBUTING.ja.md
├── LICENSE
└── SECURITY.md
```

## 技術スタック

| レイヤー | 採用技術 |
|---------|---------|
| Web フロント | Vite · React · TypeScript · CodeMirror 6 · `@replit/codemirror-vim` |
| i18n | Lingui v5 |
| ホスティング | Cloudflare Pages |
| ドリル定義 | Markdown + YAML frontmatter（Web とプラグインで共有） |

## コントリビュート

コントリビューションを歓迎します。開発環境のセットアップや PR の手順は [CONTRIBUTING.ja.md](CONTRIBUTING.ja.md) をご確認ください。
ドリルを追加するには [docs/drill-format.md](docs/drill-format.md) を参照してください。

## セキュリティ

脆弱性の報告は [GitHub Private Vulnerability Reporting](https://github.com/masashiosawa/togisumashi-vim/security/advisories/new) からお願いします。
詳細は [SECURITY.md](SECURITY.md) をご覧ください。

## ライセンス

[MIT](LICENSE) © 2026 Masashi Osawa
