# togisumashi-vim

> **Sushida-style Vim drills — Master Vim at typing-game speed**

[English](README.md) | [日本語](README.ja.md)

togisumashi-vim is a speed-drill trainer for Neovim, inspired by the classic Japanese typing game [Sushida](https://sushida.net/play.html). Build muscle memory for Vim motions through timed, repeatable drills — available as a web app and (soon) a Neovim plugin.

## Features

- **3-level sessions** — Beginner (motions) / Intermediate (edit commands) / Advanced (mixed)
- **Guided & Skip modes** — Guided follows lesson order and shows concept text; Skip randomly samples N drills from the tier
- **Practice & Test modes** — Practice reveals hint keys on demand; Test mode hides hints and shows a live timer
- **Two-panel layout** — settings and concept on the left, terminal console on the right; no scrolling required
- **Progress tracking** — localStorage records every attempt; session summary surfaces slow drills with a Focus option to re-drill them
- **Bilingual** — English and Japanese as first-class languages

## Web App

👉 [vim.togisumashi.dev](https://vim.togisumashi.dev)

No install required. Open the app, pick your level and mode in the left panel, and click Start.

## Neovim Plugin

> In development — will be distributed from a dedicated mirror repo once ready.
> Watch this repo for updates.

## Drill Coverage

| Tier | Level | Lessons | Drills |
|------|-------|---------|--------|
| 1 | Beginner | `hjkl` · word motion (`w b e`) · line jumps (`0 $ ^ g_`) · file jumps (`gg G {N}G`) · inline find (`f F t ; ,`) | ✅ 25 |
| 2 | Intermediate | delete (`dw dd D diw`) · yank/paste (`yy p P ddp`) · change (`cw cc C ciw r`) · undo/redo (`u Ctrl+r`) | ✅ 20 |
| 3 | Advanced | — | 🚧 roadmap |

Total: **45 drills across 9 lessons**. New drills ship continuously.

## Repository Structure

```
togisumashi-vim/
├── web/            # Web app (Vite + React + TypeScript + CodeMirror 6)
├── neovim-plugin/  # Neovim plugin — in development
├── drills/         # Shared drill definitions (Markdown + YAML frontmatter)
├── docs/           # Documentation
├── scripts/        # Build scripts (drill JSON generation)
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
| i18n | Lingui v5 |
| Hosting | Cloudflare Pages |
| Drills | Markdown + YAML frontmatter (shared across web and plugin) |

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and guidelines.
To add drills, see [docs/drill-format.md](docs/drill-format.md).

## Security

Please report security vulnerabilities via [GitHub Private Vulnerability Reporting](https://github.com/masashiosawa/togisumashi-vim/security/advisories/new).
See [SECURITY.md](SECURITY.md) for details.

## License

[MIT](LICENSE) © 2026 Masashi Osawa
