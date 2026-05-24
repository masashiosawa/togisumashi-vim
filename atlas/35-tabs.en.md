---
id: tabs
category: environment
drillable: false
difficulty: intermediate
frequency: low
related_drills: []
related_articles:
  - windows
  - buffers
help_tags:
  - ":h tabpage"
  - ":h gt"
---

# Tabs — separate workspaces

A **tab page** in Vim holds its own window layout. **Tabs are NOT a file multiplexer** — they are workspaces. If you find yourself using one tab per file, you're using buffers wrong.

## Commands

### Create

| Command         | Action                                              |
|-----------------|-----------------------------------------------------|
| `:tabnew [{file}]` | Create new tab (optionally with file)            |
| `:tabe {file}`  | Same as `:tabedit`, opens file in new tab           |
| `:tab split`    | Open the current buffer in a new tab (original window stays — `:tab {cmd}` makes a window-opening `{cmd}` open in a new tab instead) |
| `:tab help`     | Open help in a new tab                              |

### Navigate

| Command         | Action                                              |
|-----------------|-----------------------------------------------------|
| `gt`            | Next tab                                            |
| `gT`            | Previous tab                                        |
| `{n}gt`         | Go to tab `n` (**1-indexed**)                       |
| `:tabnext` `:tabprev` | Same as `gt`/`gT`                             |
| `:tabfirst` `:tablast` | First / last tab                             |
| `:tabmove [{n}]` | Move current tab. **Mixed semantics**: `:tabmove 0` = first (special case); `:tabmove N` (N≥1) = **after** position N (1-indexed); `:tabmove $` = last; `:tabmove +1` / `-1` = relative; no arg = last |

### Close

| Command         | Action                                              |
|-----------------|-----------------------------------------------------|
| `:tabc` `:tabclose` | Close current tab                               |
| `:tabo` `:tabonly` | Close all other tabs                             |
| `:qa`           | Quit all                                            |

### Operate on all tabs

| Command         | Action                                              |
|-----------------|-----------------------------------------------------|
| `:tabdo {cmd}`  | Run `{cmd}` in each tab                             |

## Choosing between

- **Tab vs buffer vs window**: Tab = workspace (different layout/files for different tasks). Window = view of a buffer. Buffer = file content. To switch files, use buffers (`:b`) or windows. Use tabs to switch **contexts** (project area, doc reading vs coding).
- **`gt` vs `:bn`**: `gt` cycles tabs, `:bn` cycles buffers. Don't conflate — tabs are coarser.
- **`:tabe file` vs `:e file`**: `:tabe` opens in a new tab. `:e` replaces current buffer. Use `:tabe` when the new file deserves its own workspace.
- **`:tab split` vs `:tabnew`**: `:tabnew` opens an empty new tab. `:tab split` opens the **current buffer in a new tab** (the original window stays — it's `:split` with `:tab` modifier, just in a different tab page). Useful to view the same file in a separate workspace.
- **Browser-style multi-file tabs vs Vim tabs**: Most editors use tabs as a file list. Vim doesn't. If you're coming from VSCode/Sublime expecting tabs-as-files, **learn the buffer model instead** — it's more powerful.

## Examples

```text
Open file in new tab:         :tabe other.c
Open file in tab from cmd:    vim -p file1 file2 file3
Cycle tabs:                   gt → gt → gt
Jump to tab 3:                3gt
Move current tab to end:      :tabmove
Close current tab:            :tabc
Run macro in every tab:       :tabdo normal! @a
Open help in tab:             :tab help motion.txt
```

## Tab line

The tab line at the top shows tab numbers and short names. Configure with `'tabline'` and `'guitablabel'`. Default shows the basename of the current buffer in each tab.

## Web environment note

Web Vim emulations typically have no tab pages.

## Pitfalls

- Tabs don't reduce memory or simplify buffer management. They add a layer of state.
- `:tabc` closes the **entire current tab** (all its windows). Refused if any of those windows has unsaved changes and `'hidden'` is off — save first or use `:tabc!`.
- Switching tabs preserves window-local state (`'cursorline'`, splits) — useful but can surprise: each tab is its own arrangement.
- `:tabdo` runs in **each tab once** (in the current window of that tab). To run in every window of every tab, combine with `:windo`.
- Many plugins ignore tabs — they assume single-tab usage. Test before relying.
- **Indexing is mixed**: `{n}gt` is 1-indexed (`3gt` = third tab). `:tabmove` has a quirk — `:tabmove 0` is a **special case** meaning "first position", but `:tabmove N` for N ≥ 1 means "**after** position N" (so `:tabmove 2` lands the tab after the 2nd existing tab, ending up at position 3). Use `:tabmove $` / `+1` / `-1` to avoid the trap.

## See also

- 📖 Related: [windows], [buffers]
- 📚 `:h tabpage`, `:h gt`, `:h tab-page-intro`
