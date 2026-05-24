# togisumashi-vim へのコントリビュート

[English](CONTRIBUTING.md) | [日本語](CONTRIBUTING.ja.md)

コントリビューションに興味を持っていただきありがとうございます。Issue 報告、開発環境のセットアップ、PR の手順をまとめています。

## Issue の報告

- **バグ報告**: [GitHub Issue](https://github.com/masashiosawa/togisumashi-vim/issues) に再現手順・期待動作・実際の動作を記載して開いてください。
- **機能リクエスト**: 実装前にまず Issue でユースケースを説明してください。コードを書く前に方向性を議論します。
- **セキュリティ脆弱性**: [GitHub Private Vulnerability Reporting](https://github.com/masashiosawa/togisumashi-vim/security/advisories/new) を使用してください。公開 Issue にはセキュリティ問題を書かないでください。

## 開発環境のセットアップ

### 必要なもの

- [Node.js](https://nodejs.org/) 24 LTS
- [pnpm](https://pnpm.io/)（`npm install -g pnpm`）
- Neovim 0.10+（プラグイン開発時のみ）

### セットアップ手順

```bash
git clone https://github.com/masashiosawa/togisumashi-vim.git
cd togisumashi-vim
pnpm install
```

#### Web アプリ

すべてのコマンドを**リポジトリルート**から実行します:

```bash
pnpm dev            # 開発サーバ起動（事前に drills + atlas を再生成）
pnpm typecheck      # TypeScript チェック
pnpm lint           # Biome lint + フォーマットチェック
pnpm test           # Vitest ユニットテスト
pnpm build          # プロダクションビルド（build:content を含む）
pnpm build:content  # drills.json + atlas.json をソースから再生成
pnpm build:atlas    # atlas.json のみ再生成
```

`web/public/drills.json` と `web/public/atlas.json` は生成物（gitignore 対象）です。`pnpm dev` / `pnpm build` と CI のデプロイ時に自動で再生成されます。

#### Neovim プラグイン

```bash
cd neovim-plugin
stylua .   # フォーマット
selene .   # lint
```

### 環境変数

`.env.example` を `.env.local` にコピーして値を設定してください。`.env.local` や `.dev.vars` は絶対にコミットしないでください。

### コンテンツ執筆

- **ドリル** — YAML frontmatter スキーマ、`template` / `random` の kind、goal type の詳細は [docs/drill-format.md](docs/drill-format.md) を参照してください。
- **Atlas 記事** — frontmatter スキーマ（`id`, `category`, `status`, `related_drills`, `related_articles`, `help_tags`）、編集規約（類似コマンドが競合する記事は "Choosing between" セクション必須、Vim と Neovim の既定値の差異を明記、信頼できる `:h` タグを引用）、記事構造テンプレートは [atlas/README.md](atlas/README.md) を参照してください。

## PR の手順

1. 大きな変更は**先に Issue を立ててから**実装してください。着手前に方向性を合わせます。
2. **ブランチ名**: `<type>-<issue番号>-<slug>` 形式（例: `feat-12-shadow-mode`）。
   Types: `feat` / `fix` / `docs` / `refactor` / `style` / `perf` / `test` / `chore`
3. **1 ブランチ = 1 Issue** を原則とします。
4. 新機能にはテストを追加してください。バグ修正にはリグレッションテストを追加してください。
5. コミットはまとまりよく保ってください。レビュー依頼前に fixup コミットをまとめてください。
6. **`Closes #<番号>`** は PR タイトルに記載してください（本文だけでは squash merge 時に自動クローズされません）。
7. **base ブランチは必ず `main`** にしてください。feature ブランチを base にした PR は CI が失敗します。スタック型 PR の場合は、先行 PR のマージ後に `main` へ rebase してから次の PR を開いてください。

### コミットメッセージ

```
feat: add shadow mode for tier-2 drills

動機や非自明な詳細を書く任意の本文（英語推奨）。
```

- 件名行: 英語・72 文字以内、体言止めまたは動詞の連用形
- 末尾にピリオド不要
- 本文は空行で区切る

### コードスタイル

- **TypeScript / JavaScript**: [Biome](https://biomejs.dev/) — `pnpm lint` で確認
- **Lua**: [StyLua](https://github.com/JohnnyMorganz/StyLua) + [Selene](https://github.com/Kampfkarren/selene)
- CI でリントエラーが出ると失敗します。プッシュ前にローカルで修正してください。

## CI チェック

すべての PR は以下をパスする必要があります:

| チェック | ツール |
|---------|--------|
| 型チェック | `tsc --noEmit` |
| Lint | Biome |
| ユニットテスト | Vitest |
| ビルド | Vite |
| セキュリティスキャン | CodeQL |

## ライセンス

コントリビューションは [MIT ライセンス](LICENSE) のもとで提供されることに同意したものとみなします。
