---
id: search-navigation
category: search
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-1-10-search-basic
  - tier-3-03-search-extra
related_articles:
  - regex-patterns
  - motion-find-char
  - substitute
help_tags:
  - ":h /"
  - ":h star"
  - ":h gn"
---

# Search and navigate by pattern

Move through the buffer by pattern match. The most powerful motion family — searches double as jumps and as operator targets.

## Commands

| Key            | Action                                                       |
|----------------|--------------------------------------------------------------|
| `/{pat}<CR>`   | Search forward for `{pat}`                                   |
| `?{pat}<CR>`   | Search backward                                              |
| `/<CR>`        | Empty pattern repeats last search forward (same as `n` when last was `/`) |
| `?<CR>`        | Empty pattern repeats last search backward                   |
| `n`            | Next match (same direction as original search)               |
| `N`            | Previous match (opposite direction)                          |
| `*`            | Search forward for **word under cursor** (whole word)        |
| `#`            | Search backward for word under cursor                        |
| `g*`           | Like `*` but **partial match** (no `\<\>` anchors)           |
| `g#`           | Like `#` but partial                                         |
| `gd`           | Go to **first declaration in current function** (regex heuristic, falls back to line 1) |
| `gD`           | Go to **first occurrence in entire file** (from line 1)      |
| `gn`           | Visually select next match (operator-compatible)             |
| `gN`           | Visually select previous match                               |

## Choosing between

- **`/` vs `f`**: `/` is pattern-based, multi-line, regex-capable, requires `<CR>`. `f` is single-char, current-line, no `<CR>`. For visible single char on current line, `f` is faster.
- **`*` vs `/word`**: `*` is "search what's under cursor" — no typing required. `/word` needs you to type. Use `*` when the cursor is already on the term.
- **`*` vs `g*`**: `*` adds `\<word\>` anchors (whole-word match). `g*` matches `word` anywhere (substring). Use `g*` when you want partial matches like `foo` in `foobar`.
- **`gd` vs `<C-]>` (tags)**: `gd` is **in-file** definition lookup (no tags file). `<C-]>` uses tags (cross-file). Use `gd` for local variables, `<C-]>` for project-wide symbols.
- **`cgn` vs `:s/.../.../g`**: Both replace pattern occurrences. `cgn` lets you change interactively then `.` to repeat — review each match. `:s/...//g` is batch. Use `cgn` when you want to inspect, `:s` when you trust the pattern.
- **`n` vs `;`**: `n` repeats `/`/`?`. `;` repeats `f`/`t`. Independent histories.

## The search-edit loop (most-used Vim pattern)

```text
/foo<CR>      find first foo
cw bar<Esc>   change to bar
n             next foo
.             repeat the change
n             next foo
.             ...
```

Combined with `cgn`:

```text
/foo<CR>
cgn bar<Esc>     change-next-match to bar
.                next match + change
.                ...
```

## Search modifiers

### Suffix flags (after the closing `/`)

| Form        | Meaning                                                  |
|-------------|----------------------------------------------------------|
| `/{pat}/e`  | Place cursor at **end** of match                          |
| `/{pat}/s+1`| Cursor `+1` from match start                              |

### Pattern-internal case flags (anywhere inside the pattern)

| Form     | Meaning                                                     |
|----------|-------------------------------------------------------------|
| `\c`     | Force case-insensitive for this pattern (overrides `'ignorecase'`) |
| `\C`     | Force case-sensitive for this pattern                       |

## Examples

```text
Find class:           /class Foo<CR>
Repeat as edit:       cwBar<Esc>n.
Find under cursor:    *  →  *  →  *   (cycle all occurrences)
Definition lookup:    cursor on var  →  gd
Visual next-match:    /TODO<CR>  →  gn   (selects the TODO)
Change all in file:   /TODO<CR>  →  cgn done<Esc>  →  .  →  .
```

## Pitfalls

- Search history is **per-session** and persists via `viminfo`/`shada`. Press `<Up>` in the search prompt to recall.
- `*` adds whole-word anchors, so `*` on `foo` will **not** find `foobar`. Use `g*` to relax.
- `'incsearch'` (live preview) and `'hlsearch'` (highlight all matches) — Vim raw (`-u NONE`) has both off; Vim with `defaults.vim` (the modern default when no vimrc exists) has `'incsearch'` **on** and `'hlsearch'` **off**. Neovim has both **on** by default. For consistency on Vim: `:set incsearch hlsearch`.
- `'wrapscan'` is on by default in both — searches wrap from EOF to BOF (and vice versa). Set `:set nowrapscan` if you want searches to stop at file ends.
- `gd` is a **regex-based heuristic** (looks for `var name` patterns), not a semantic lookup. It can match the wrong "definition" in complex code.
- Always-on `n` always means "same direction as original" — `?foo<CR>n` goes **backward**. Use `N` to reverse, regardless of original direction.

## See also

- 🎯 Practice: [tier-1-10-search-basic], [tier-3-03-search-extra]
- 📖 Related: [regex-patterns], [motion-find-char], [substitute]
- 📚 `:h /`, `:h star`, `:h gn`, `:h search-commands`
