---
id: marks-and-jumps
category: motion
drillable: true
difficulty: intermediate
frequency: mid
related_drills:
  - tier-3-04-marks-jumps
related_articles:
  - tags
  - motion-line-file
help_tags:
  - ":h mark-motions"
  - ":h jumplist"
  - ":h changelist"
---

# Marks and jump history

Save positions and return to them. Walk back through cursor history. The cornerstone of "I was just there a second ago".

## Commands

### Setting marks

| Key            | Action                                                  |
|----------------|---------------------------------------------------------|
| `m{a-z}`       | Set **local** mark `{a-z}` (current buffer only)        |
| `m{A-Z}`       | Set **global** mark `{A-Z}` (file path remembered)      |

### Jumping to marks

| Key            | Action                                                  |
|----------------|---------------------------------------------------------|
| `` `{a-z} ``   | Jump to **exact position** (line + column) of mark      |
| `'{a-z}`       | Jump to first non-blank of mark's **line**              |
| `` `{A-Z} ``   | Jump to global mark (opens file if needed)              |

### Special marks

| Mark      | Meaning                                              |
|-----------|------------------------------------------------------|
| `` ` ` `` | Position before the last jump (or `''`)              |
| `` `" ``  | Position when last exiting the file                  |
| `` `[ `` `` `] `` | Start / end of last yanked or changed text   |
| `` `< `` `` `> `` | Start / end of last visual selection          |
| `` `. ``  | Position of last change in current buffer            |
| `` `^ ``  | Position of last insertion                           |
| `` `0 ``     | Cursor position when Vim last exited                |
| `` `1 ``–`` `9 `` | Cursor positions from previous Vim sessions (older the higher the number) |

### Jump and change lists

| Key      | Action                                                  |
|----------|---------------------------------------------------------|
| `<C-o>`  | Walk **backward** through jumplist                      |
| `<C-i>`  | Walk **forward** through jumplist (same as `<Tab>`)     |
| `g;`     | Walk **backward** through changelist                    |
| `g,`     | Walk **forward** through changelist                     |
| `gi`     | Go to last insert position **and** enter insert mode    |
| `:marks` | List all marks                                          |
| `:jumps` | List jumplist                                           |
| `:changes` | List changelist                                       |

## Choosing between

- **`` `{a} `` vs `'{a}`**: Backtick goes to **exact column**, single-quote goes to **line start (first non-blank)**. Backtick for surgical, single-quote for "show me that line".
- **Lowercase `m{a}` vs uppercase `m{A}`**: Lowercase = local to current buffer (lost when you switch files). Uppercase = global, remembered across sessions in `~/.viminfo`. Use uppercase when bookmarking across projects.
- **`<C-o>` vs `''`**: `''` is shorthand for "back to where I just jumped from" (the most recent jump). `<C-o>` walks history step by step.
- **`<C-o>` vs `g;`**: `<C-o>` walks the **jumplist** (places you searched/jumped to). `g;` walks the **changelist** (places you edited). Different histories — pick the one matching how you reached the place.
- **`gi` vs `` `^ ``**: Both go to the last insertion. `gi` also enters insert mode in one keystroke. Use `gi` when you want to resume typing where you stopped.
- **Marks vs `:tag` (tags file)**: Marks are personal bookmarks you set explicitly. Tags are language-symbol jumps based on a generated index. Use marks for "remember this place", tags for "go to definition".

## What counts as a "jump"

Vim adds an entry to the jumplist on these motions (not exhaustive):

- `G`, `{n}G`, `gg`
- `/`, `?`, `n`, `N`
- `*`, `#`, `gd`
- `H`, `M`, `L`
- `(`, `)`, `{`, `}`
- `%`
- Buffer/window changes

Single-step motions (`h`, `j`, `k`, `l`, `w`, `e`) do **not** add to the jumplist.

## Examples

```text
mark + return:         mA  ...  later in another file  ...  `A  → back
edit + come back:      ...edit here...  →  switch files  →  gi  → cursor here, insert mode
read code:             gd → look at def → <C-o> → back to use site
last visual:           gv   reselect last visual
```

## Pitfalls

- The `viminfo` file (`shada` in Neovim) is what persists global marks across sessions. Disable it (`:set viminfo=`) and you lose `m{A-Z}` permanence.
- `'{a}` always lands on first non-blank — column information of the mark is silently discarded. Use backtick.
- `<C-i>` and `<Tab>` are the **same character** in terminals. Mapping `<Tab>` may steal `<C-i>` from the jumplist.
- The jumplist is **per-window**, not per-buffer. Splitting a window gives you a fresh jumplist there.

## See also

- 🎯 Practice: [tier-3-04-marks-jumps]
- 📖 Related: [tags], [motion-line-file]
- 📚 `:h mark-motions`, `:h jumplist`, `:h changelist`
