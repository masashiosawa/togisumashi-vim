# togisumashi-vim

> **Sushida-style Vim drills — Master Vim in 2 hours**

[English](README.md) | [日本語](README.ja.md)

togisumashi-vim is a speed-drill trainer for Neovim, inspired by the classic Japanese typing game [Sushida](https://sushida.net/play.html). Build muscle memory for Vim motions through timed, repeatable drills — available as a web app and a Neovim plugin.

## Features

- **Tier 1–4 drills** — progressive difficulty from basic motions to advanced text objects
- **Shadow mode** — watch the ideal key sequence before attempting
- **Personal best tracking** — local (IndexedDB) with optional cloud sync (Sign in with GitHub)
- **Neovim-native** — practice without leaving your editor
- **Bilingual** — English and Japanese as first-class languages

## Web App

👉 [vim.togisumashi.dev](https://vim.togisumashi.dev)

No install required. Open the app, pick a drill, and start typing.

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

| Tier | Focus |
|------|-------|
| 1 | Basic motions — `hjkl`, word jumps (`w` `b` `e`) |
| 2 | Operators — `d` `c` `y` combined with motions |
| 3 | Text objects — `iw` `i"` `i(` `it` |
| 4 | Advanced — macros, marks, registers |

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
