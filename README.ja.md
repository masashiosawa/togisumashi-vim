# togisumashi-vim

> **寿司打型 Vim ドリル — Vim を 2 時間で極める**

[English](README.md) | [日本語](README.ja.md)

togisumashi-vim は Neovim 向けのスピードドリル練習アプリです。日本語タイピングゲーム「[寿司打](https://sushida.net/play.html)」にインスパイアされ、タイム計測と反復練習で Vim の操作を体に染み込ませます。Web アプリと Neovim プラグインの両形式で提供します。

## 特徴

- **Tier 1〜4 のドリル** — 基本移動から高度なテキストオブジェクトまで段階的な難易度
- **シャドウモード** — 模範解答のキー操作を見てから自分で挑戦
- **自己ベスト記録** — ローカル保存（IndexedDB）＋任意でクラウド同期（GitHub サインイン）
- **Neovim ネイティブ** — エディタを離れずに練習できる
- **英語・日本語の両言語対応** — first-class として同等に対応

## Web アプリ

👉 [vim.togisumashi.dev](https://vim.togisumashi.dev)

インストール不要。ブラウザを開いてドリルを選ぶだけで練習を始められます。

## Neovim プラグイン

> プラグインは monorepo で開発し、専用のミラーリポジトリから配布しています。

[lazy.nvim](https://github.com/folke/lazy.nvim) でインストール:

```lua
{
  "masashiosawa/togisumashi-vim-nvim",
  cmd = "Togisumashi",
  opts = {},
}
```

`:Togisumashi` でドリルセッションを開始します。Neovim 0.10+ が必要です。

## ドリル Tier 一覧

| Tier | 内容 |
|------|------|
| 1 | 基本移動 — `hjkl`、単語ジャンプ（`w` `b` `e`） |
| 2 | オペレータ — `d` `c` `y` とモーションの組み合わせ |
| 3 | テキストオブジェクト — `iw` `i"` `i(` `it` |
| 4 | 上級 — マクロ、マーク、レジスタ |

## リポジトリ構成

```
togisumashi-vim/
├── web/            # Web アプリ（Vite + React + TypeScript + CodeMirror 6）
├── neovim-plugin/  # Neovim プラグイン（Lua、Neovim 0.10+）
├── drills/         # 共有ドリル定義（Markdown + YAML frontmatter）
├── docs/           # ドキュメント（英語・日本語）
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
| Web API | Hono on Cloudflare Workers |
| データベース | Cloudflare D1（SQLite）· Drizzle ORM |
| ホスティング | Cloudflare Pages |
| プラグイン | Lua · Neovim 0.10+ |
| ドリル定義 | Markdown + YAML frontmatter（Web とプラグインで共有） |

## コントリビュート

コントリビューションを歓迎します。開発環境のセットアップや PR の手順は [CONTRIBUTING.ja.md](CONTRIBUTING.ja.md) をご確認ください。

## セキュリティ

脆弱性の報告は [GitHub Private Vulnerability Reporting](https://github.com/masashiosawa/togisumashi-vim/security/advisories/new) からお願いします。
詳細は [SECURITY.md](SECURITY.md) をご覧ください。

## ライセンス

[MIT](LICENSE) © 2026 Masashi Osawa
