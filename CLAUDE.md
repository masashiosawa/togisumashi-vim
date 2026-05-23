# togisumashi-vim — Project CLAUDE.md

## Language

**All GitHub-facing text must be in English.** This overrides the global CLAUDE.md rule of Japanese commits.

- Git commit messages: English
- GitHub Issue titles and bodies: English
- GitHub PR titles and bodies: English
- Code comments and identifiers: English

Reason: togisumashi-vim is a globally targeted public OSS project.

## Commit format

Follow the global prefix convention (`feat / fix / docs / refactor / style / perf / test / chore`), but write the message in English:

```
feat: add drill runner with idle/running/success phases
```

## Merge strategy

Squash merge only. 1 branch = 1 Issue = 1 commit on main.

**Issue auto-close requires `Closes #XX` in the PR title or the squash commit message.**
The PR body `Closes #XX` is NOT carried into the squash commit and will not auto-close the Issue.
Always include `(closes #XX)` in the PR title when creating PRs.

## Pre-commit checklist

Run these before every `git commit`:

```sh
pnpm --filter web lint:fix   # auto-fix import order and formatting
pnpm typecheck               # TypeScript clean
pnpm test                    # all tests pass
```

`pnpm lint:fix` rewrites files in place. Stage the changes it makes before committing.  
If lint errors remain after `--fix`, resolve them manually before committing.

## Domain

Production: `https://vim.togisumashi.dev` (Cloudflare Pages)
