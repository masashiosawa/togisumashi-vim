# Atlas — Reading Reference

Atlas is the **reading reference** companion to the drill curriculum. Each article covers one Vim/Neovim topic with command tables, usage comparisons, examples, and pitfalls. Articles are linked to drills (where applicable) so users can flip between practice and theory.

Both the web app and the Neovim plugin will read from this directory.

## File layout

```
atlas/
├── README.md                              ← this file
├── 01-motion-basic.{en,ja}.md             ← one article in two languages
├── 02-motion-word.{en,ja}.md
└── ... (51 articles × 2 languages = 102 files)
```

The two-digit prefix is a stable presentation order. Categories: motion (01–11), insert/edit (12–21), grammar/compose (22–28), files/buffers/windows (29–35), config (36–39), power (40–44), environment (45–47), display (48–49), meta (50–51).

## Frontmatter schema

```yaml
---
id: <string>              # Unique slug, matches the file stem (without .en/.ja)
category: <string>        # motion | search | insert | edit | composition | repeat | meta | environment | config | power | display
status: drill-backed | concept-only | meta
related_drills: [<drill-id>, ...]
related_articles: [<article-id>, ...]
help_tags: [":h ..."]     # Authoritative help references
---
```

## Article structure

```markdown
# {Title}

{1–2 line summary}

## Commands
| Key | Action |
|-----|--------|

## Choosing between        ← required: how to pick between similar commands
- **A vs B**: ...

## Grammar / Positioning   ← optional, for motion / operator articles

## Examples
```text
...
```

## Pitfalls
- ...

## See also
- 🎯 Practice: [drill-id]
- 📖 Related: [article-id], ...
- 📚 :h ...
```

## Editorial standards

Every article should:

1. **Be terse**. Tables over prose. Examples over explanations.
2. **Include a "Choosing between" section** when similar commands compete (e.g. `0` vs `^`, `dw` vs `daw`).
3. **Distinguish Vim vs Neovim** for any default value, feature, or keymap that differs.
4. **Cite authoritative `:h` tags** in `help_tags` frontmatter and `See also`.
5. **Be reviewed against primary sources** (vimhelp.org, Neovim doc, empirical `:set xxx?` verification).

### Fact verification

Article statements about defaults, mechanisms, and version differences are cross-checked against (a) the primary `:h` documentation, (b) `vim_diff.txt` for Neovim differences, and (c) live `:set xxx?` verification on the latest Vim 9 and Neovim releases. The internal fact-sheet workflow used for this verification is intentionally kept out of the public repo to preserve the auditing record's terseness.

## Build

Articles are bundled into a single JSON for the web app:

```sh
pnpm build:atlas
# → web/public/atlas.json
```

The Neovim plugin reads `atlas/` directly via plain Markdown.
