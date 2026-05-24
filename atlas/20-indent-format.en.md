---
id: indent-format
category: edit
status: drill-backed
related_drills:
  - tier-2-07-indent-case-num
related_articles:
  - settings
  - external-commands
help_tags:
  - ":h >"
  - ":h ="
  - ":h gq"
---

# Indent and format

Adjust horizontal layout: shift lines left/right, auto-indent code, format prose.

## Commands

### Indent shift

| Key          | Action                                                  |
|--------------|---------------------------------------------------------|
| `>{motion}`  | Indent over motion by one `shiftwidth`                  |
| `<{motion}`  | Dedent over motion                                      |
| `>>`         | Indent current line                                     |
| `<<`         | Dedent current line                                     |
| `{visual}>`  | Indent visual selection                                 |
| `{visual}<`  | Dedent visual selection                                 |
| `{n}>>`      | Indent `n` lines                                        |
| `:[range]>` `:[range]<` | Ex form (with optional `{count}`: `:.>5`)    |

### Auto-indent

| Key          | Action                                                  |
|--------------|---------------------------------------------------------|
| `={motion}`  | Re-indent over motion                                   |
| `==`         | Re-indent current line                                  |
| `{visual}=`  | Re-indent visual selection                              |
| `gg=G`       | Re-indent entire file (idiomatic incantation)           |

### Format

| Key          | Action                                                  |
|--------------|---------------------------------------------------------|
| `gq{motion}` | Format over motion (uses `'formatexpr'`/`'formatprg'`)  |
| `gqq` `gqgq` | Format current line                                     |
| `gqap`       | Format current paragraph                                |
| `gw{motion}` | Format without moving cursor                            |
| `:[range]center [width]` | Center lines (width: explicit arg → `'textwidth'` → 80) |
| `:[range]left [width]`   | Left-align (same width resolution)         |
| `:[range]right [width]`  | Right-align (same width resolution)        |
| `:retab`     | Convert tabs↔spaces based on `'expandtab'`              |

## Choosing between

- **`>>` vs `==`**: `>>` shifts by `shiftwidth` blindly. `==` re-indents using language rules (via `'indentexpr'`). Use `==` for "format this correctly", `>>` to add a level manually.
- **`>>` vs `:.>`**: Identical. `:.>` is the ex form, useful inside scripts and `:g/.../>`.
- **`gg=G` vs an external formatter**: `gg=G` uses Vim's built-in indenters — fast but rule-based. Real formatters (`prettier`, `black`, `gofmt`) understand syntax. Use external for production code via `:!gofmt %` or LSP format-on-save.
- **`gq` vs `gw`**: Both format. `gq` moves cursor to end of formatted text; `gw` keeps cursor where it was. Use `gw` to format without losing place.
- **`gq` vs LSP format**: `gq` is local (Vim's logic or `'formatprg'`). LSP format calls the language server. LSP is semantic; `gq` is text-based — fine for prose, less ideal for code.
- **`{visual}=` vs `gg=G`**: Selection vs whole file. For large refactors, `gg=G` is one shot. For touched-only code, visual select first.
- **`:retab` vs `:set expandtab` + `gg=G`**: `:retab` converts existing tabs based on current `'expandtab'` setting. `gg=G` re-indents. Use `:retab` to flip tab-style; use `gg=G` after to clean up.

## Examples

```text
Indent function body 1 level:     V}>
Dedent a misplaced block:         V}<
Re-indent file:                   gg=G
Format current paragraph:         gqap
Format with line length 60:       :set textwidth=60  →  gqip
Indent every line containing TODO: :g/TODO/>
Tabs to spaces:                   :set expandtab  →  :retab
Center heading line:              :.center
```

## Pitfalls

- `>>` uses `'shiftwidth'`, not `'tabstop'`. With `'shiftwidth'=0` it falls back to `'tabstop'`.
- `'expandtab'` controls whether `<Tab>` inserts tabs or spaces. **`:retab`** rebuilds whitespace based on `'tabstop'`, converting tabs to spaces (or vice versa) depending on `'expandtab'`. The **`!`** in **`:retab!`** doesn't reverse direction — it **expands the scope** to include all whitespace, not just tabs. Direction is always decided by `'expandtab'`.
- `gg=G` uses `'equalprg'` if set (runs an external formatter), then `'indentexpr'`, then the built-in C-like indent. The built-in handles many languages with no `'indentexpr'`, so `=` is rarely a no-op.
- `gq` formats by `'textwidth'`. If `'textwidth'=0`, nothing wraps. Set explicitly for prose.
- `:center`/`:left`/`:right` default to `'textwidth'`; if `'textwidth'=0`, they fall back to **80** (not "nothing happens").

## See also

- 🎯 Practice: [tier-2-07-indent-case-num]
- 📖 Related: [settings], [external-commands]
- 📚 `:h >`, `:h =`, `:h gq`, `:h 'shiftwidth'`, `:h 'expandtab'`
