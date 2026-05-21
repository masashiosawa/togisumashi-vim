# togisumashi-vim

> **Sushida-style Vim drills — Master Vim in 2 hours**

[English](README.md) | [日本語](README.ja.md)

togisumashi-vim is a speed-drill trainer for Neovim, inspired by the classic Japanese typing game [Sushida](https://sushida.net/play.html). Build muscle memory for Vim motions through timed, repeatable drills — available as a web app and a Neovim plugin.

## Features

- **3-level sessions** — Beginner (motions) / Intermediate (edit commands) / Advanced (mixed)
- **Guided & Skip modes** — Guided follows lesson order and shows concept text; Skip randomly samples N drills from the tier
- **Practice & Test modes** — Practice reveals hint keys on demand; Test mode hides hints and shows a live timer
- **Two-panel layout** — settings and concept on the left, terminal console on the right; no scrolling required
- **Progress tracking** — localStorage records every attempt; session summary surfaces slow drills with a Focus option to re-drill them
- **Neovim-native** — practice without leaving your editor (plugin in development)
- **Bilingual** — English and Japanese as first-class languages

## Web App

👉 [vim.togisumashi.dev](https://vim.togisumashi.dev)

No install required. Open the app, pick your level and mode in the left panel, and click Start in the terminal.

## Neovim Plugin

> The plugin is distributed from a dedicated mirror repo while development stays in this monorepo.

Install via [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
{
  "masashiosawa/togisumashi-vim-nvim",
  cmd = "Togisumashi",
  opts = {},
}
```

Run `:Togisumashi` to start a drill session. Requires Neovim 0.10+.

## Drill Tiers

| Tier | Focus | Status |
|------|-------|--------|
| 1 | Basic motions — `hjkl`, line edges (`0` `$`) | ✅ 5 drills |
| 2 | Delete operators — `dw` `dd` `D` `diw` `2dw` | ✅ 5 drills |
| 3 | Text objects — `iw` `i"` `i(` `it` | 🚧 roadmap |
| 4 | Advanced — macros, marks, registers | 🚧 roadmap |

## Repository Structure

```
togisumashi-vim/
├── web/            # Web app (Vite + React + TypeScript + CodeMirror 6)
├── neovim-plugin/  # Neovim plugin (Lua, Neovim 0.10+)
├── drills/         # Shared drill definitions (Markdown + YAML frontmatter)
├── docs/           # Documentation (English + Japanese)
├── README.md
├── README.ja.md
├── CONTRIBUTING.md
├── CONTRIBUTING.ja.md
├── LICENSE
└── SECURITY.md
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Web frontend | Vite · React · TypeScript · CodeMirror 6 · `@replit/codemirror-vim` |
| Web API | Hono on Cloudflare Workers |
| Database | Cloudflare D1 (SQLite) · Drizzle ORM |
| Hosting | Cloudflare Pages |
| Plugin | Lua · Neovim 0.10+ |
| Drills | Markdown + YAML frontmatter (shared across web and plugin) |

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and guidelines.

## Security

Please report security vulnerabilities via [GitHub Private Vulnerability Reporting](https://github.com/masashiosawa/togisumashi-vim/security/advisories/new).
See [SECURITY.md](SECURITY.md) for details.

## License

[MIT](LICENSE) © 2026 Masashi Osawa
