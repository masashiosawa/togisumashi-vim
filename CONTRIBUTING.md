# Contributing to togisumashi-vim

[English](CONTRIBUTING.md) | [日本語](CONTRIBUTING.ja.md)

Thank you for your interest in contributing! This document covers how to report issues, set up the development environment, and submit pull requests.

## Reporting Issues

- **Bug reports**: Open a [GitHub Issue](https://github.com/masashiosawa/togisumashi-vim/issues) with steps to reproduce, expected behavior, and actual behavior.
- **Feature requests**: Open an issue describing the use case before implementing. We discuss before coding.
- **Security vulnerabilities**: Use [GitHub Private Vulnerability Reporting](https://github.com/masashiosawa/togisumashi-vim/security/advisories/new) — do not file public issues for security bugs.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 24 LTS
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- Neovim 0.10+ — for plugin development only

### Getting Started

```bash
git clone https://github.com/masashiosawa/togisumashi-vim.git
cd togisumashi-vim
pnpm install
```

#### Web app

All commands run from the **repo root**:

```bash
pnpm dev        # start dev server
pnpm typecheck  # TypeScript check
pnpm lint       # Biome lint + format check
pnpm test       # Vitest unit tests
pnpm build      # production build
```

#### Neovim plugin

```bash
cd neovim-plugin
stylua .   # format
selene .   # lint
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. Never commit `.env.local` or `.dev.vars`.

## Pull Request Guidelines

1. **Open an issue first** for non-trivial changes so we can align before you invest time.
2. **Branch naming**: `<type>-<issue-number>-<short-slug>` (e.g., `feat-12-shadow-mode`).
   Types: `feat` / `fix` / `docs` / `refactor` / `style` / `perf` / `test` / `chore`.
3. **One PR per issue** as a rule.
4. **Include tests** for new functionality. Bug fixes should add a regression test.
5. **Keep commits focused**. Squash fixup commits before requesting review.
6. **Add `Closes #<issue>`** in the PR title (not just the body) to auto-close the linked issue on squash merge.
7. **Always target `main`** — never open a PR against a feature branch. If you are stacking changes, wait for the preceding PR to merge and rebase onto `main` before opening the next one. CI will fail if the base is not `main`.

### Commit Messages

```
feat: add shadow mode for tier-2 drills

Optional body explaining the motivation or non-obvious details.
```

- Subject line: 72 characters max, imperative mood
- No trailing period
- Body separated by a blank line

### Code Style

- **TypeScript / JavaScript**: [Biome](https://biomejs.dev/) — run `pnpm lint`
- **Lua**: [StyLua](https://github.com/JohnnyMorganz/StyLua) + [Selene](https://github.com/Kampfkarren/selene)
- CI will fail on lint errors — fix them locally before pushing.

## CI Checks

All PRs must pass:

| Check | Tool |
|-------|------|
| Type check | `tsc --noEmit` |
| Lint | Biome |
| Unit tests | Vitest |
| Build | Vite |
| Security scan | CodeQL |

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
