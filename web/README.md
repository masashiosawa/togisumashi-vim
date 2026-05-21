# togisumashi-vim — web

Web app for [togisumashi-vim](https://github.com/masashiosawa/togisumashi-vim).  
Deployed at **[vim.togisumashi.dev](https://vim.togisumashi.dev)**.

## Stack

| | |
|---|---|
| Framework | Vite 8 + React 19 + TypeScript |
| Vim engine | CodeMirror 6 + `@replit/codemirror-vim` |
| i18n | lingui v5 (en / ja, URL-path based) |
| Lint / Format | Biome |
| Tests | Vitest |
| Deploy | Cloudflare Pages (via GitHub Actions) |

## Development

Run from the **repo root**:

```bash
pnpm install      # install all workspaces
pnpm dev          # start dev server → http://localhost:3000
pnpm typecheck    # TypeScript check
pnpm lint         # Biome lint + format check
pnpm build        # production build (lingui compile → tsc → vite build)
pnpm test         # Vitest unit tests
```

### i18n workflow

```bash
pnpm --filter web lingui:extract   # extract strings from source → .po files
# edit src/locales/ja/messages.po
pnpm --filter web lingui:compile   # compile .po → messages.ts (auto-run in build)
```

### Environment variables

Copy `.env.example` to `.dev.vars` for local Cloudflare Workers emulation.  
Never commit `.dev.vars` or `.env.local`.
