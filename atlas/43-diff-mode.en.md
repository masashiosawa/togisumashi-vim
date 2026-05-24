---
id: diff-mode
category: power
status: concept-only
related_drills: []
related_articles:
  - windows
  - external-commands
help_tags:
  - ":h diff"
  - ":h vimdiff"
---

# Diff mode — side-by-side comparison

Compare two or more files visually, with highlighted differences and per-hunk operations. Vim ships with this — no plugin needed.

## Commands

### Enter diff mode

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `vimdiff f1 f2`   | Shell: launch Vim in diff mode with 2+ files        |
| `vim -d f1 f2`    | Same as `vimdiff`                                   |
| `:diffsplit {file}` | Add `{file}` to diff. **Default is horizontal split** (uses `:split`). For vertical, use `:vertical diffsplit` or `:set diffopt+=vertical`. (`vimdiff` startup uses vertical by default; `:diffsplit` alone does not.) |
| `:vertical diffsplit {file}` | Vertical split                            |
| `:diffthis`       | Mark current window for diff                        |
| `:diffoff`        | Turn off diff for current window                    |
| `:diffoff!`       | Turn off diff for all windows                       |

### Navigate hunks

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `]c`     | Next hunk (change)                                  |
| `[c`     | Previous hunk                                       |

### Operate on hunks

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `do`     | **Diff obtain** — pull change from other window     |
| `dp`     | **Diff put** — push change to other window          |
| `:diffget [bufnr]` | Get from specified buffer                      |
| `:diffput [bufnr]` | Put to specified buffer                        |
| `:diffupdate` `:diffu` | Recompute diffs                            |

## Choosing between

- **`vimdiff` vs `git diff`**: `vimdiff` is interactive — navigate hunks, apply changes from either side. `git diff` is text output. Use vimdiff for resolution; git diff for reading.
- **`do` (obtain) vs `dp` (put)**: `do` brings the **other window's** version into your current window. `dp` sends yours to the other. Memorize: `do` = obtain inward, `dp` = put outward.
- **`:diffsplit` vs `:diffthis`**: `:diffsplit f` adds a file and enables diff for both. `:diffthis` just enables diff for current window — useful when you already have files open in splits.
- **3-way diff (merge tool) vs 2-way**: With three windows (`LOCAL`, `BASE`, `REMOTE`), each hunk's source is ambiguous. Use `:diffget LOCAL` / `:diffget REMOTE` explicitly.
- **Built-in diff vs plugins (`vim-fugitive`)**: Built-in is universal. Fugitive's `:Gdiffsplit` adds git integration (3-way merge with index/HEAD).

## Examples

```text
Compare two files:                vimdiff file1 file2
Compare current vs another:       :vertical diffsplit other.c
Pull change from right window:    [c  →  do
Push change to left:              ]c  →  dp
Stop diff:                        :diffoff!

Git merge resolution:
  $ git mergetool
  (Vim opens 3-way diff)
  In the middle (working) buffer:
    :diffget LO    " or :diffget LOCAL
    :diffget RE    " or :diffget REMOTE
    Save, :qa
```

## Setting `'diffopt'`

```vim
set diffopt+=algorithm:patience   " or histogram
set diffopt+=indent-heuristic
set diffopt+=vertical             " default to vertical split
```

`patience` and `histogram` algorithms produce nicer diffs for code (less spurious shifting).

## Pitfalls

- `do` and `dp` apply to the **current hunk** (under cursor) — make sure cursor is in the hunk area, not just nearby.
- Adding/removing lines invalidates diff numbering — Vim auto-`:diffupdate`s, but very large edits may need manual `:diffu`.
- `:diffsplit` opens a new window — for an existing window, use `:diffthis` on each window you want diffed.
- Wrapping inside diff mode is disabled by default. Re-enable with `:set wrap` in each window.
- Foldcolumn defaults to 2 in diff mode — looks busy. `:set foldcolumn=0` if it bothers you.

## See also

- 📖 Related: [windows], [external-commands]
- 📚 `:h diff`, `:h vimdiff`, `:h 'diffopt'`, `:h ]c`
