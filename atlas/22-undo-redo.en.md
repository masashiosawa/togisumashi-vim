---
id: undo-redo
category: edit
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-2-09-undo-redo
related_articles:
  - dot-repeat
help_tags:
  - ":h u"
  - ":h CTRL-R"
  - ":h undo-tree"
---

# Undo and redo

Vim's undo is a **tree**, not a linear stack. Every branch is recoverable. Plus a unique time-travel mode: `:earlier 5m`.

## Commands

| Key          | Action                                              |
|--------------|-----------------------------------------------------|
| `u`          | Undo last change                                    |
| `{n}u`       | Undo `n` changes                                    |
| `<C-r>`      | Redo (undo the undo)                                |
| `{n}<C-r>`   | Redo `n` steps                                      |
| `U`          | Undo all changes on **current line**                |
| `:earlier {n}` | Go to state `n` changes ago                        |
| `:earlier 5m` | Go to state 5 minutes ago                          |
| `:earlier 10s` | Go to state 10 seconds ago                        |
| `:later {n}` | Forward in time by `n` changes/time                 |
| `g-` `g+`    | Walk through full undo tree (older / newer)         |
| `:undolist`  | Show undo tree leaves                               |

## Choosing between

- **`u` vs `U`**: `u` undoes the last single change. `U` reverts all changes made on the current line since you arrived. Use `U` to roll back a botched line edit.
- **`u` vs `<C-r>`**: `u` goes backward, `<C-r>` forward in linear history.
- **`u`/`<C-r>` vs `g-`/`g+`**: Linear undo only walks the branch you're on. After undoing then making a new edit, the original future is "lost" linearly — but `g+` can resurrect it from the undo **tree**.
- **`<C-r>` vs `.`**: Different. `<C-r>` redoes the undone change. `.` re-applies the last edit as a fresh change (creates new undo state).
- **`:earlier 5m` vs `5u`**: `5u` undoes 5 edits. `:earlier 5m` rolls back **to the state 5 minutes ago**, regardless of how many edits happened. Use time-travel when "I want it like it was before lunch".
- **`u` vs reverting from git**: Vim's undo is per-session by default. Persistent undo (`'undofile'`) keeps it across sessions. For long-term history, git is more reliable.

## The undo tree

Each edit creates a new state. Undoing then making a different edit creates a **branch** — the original path is preserved.

```
State 0  →  State 1  →  State 2
                   ↓  (undo, then new edit)
                  State 3
```

Linear `u`/`<C-r>` walks the **current branch**. `g-` walks to State 2 even after diverging to State 3. `:undolist` shows the leaves.

## Examples

```text
Undo last edit:           u
Redo:                     <C-r>
Undo 3:                   3u
Revert botched line:      U
Time travel 5 min back:   :earlier 5m
Forward through changes:  :later 999     (advance 999 changes — for current branch only)

Save undo across sessions:
  :set undofile
  " Vim default 'undodir' is ".", which scatters .un~ files next to sources.
  " Pick one dir to keep things tidy:
  :set undodir=~/.vim/undo                              " Vim
  :set undodir=~/.local/state/nvim/undo//               " Neovim default already
  " (Neovim ships with this dir baked into 'undodir' by default)
```

## Pitfalls

- Each Insert session is **one undo unit** by default. `i hello world<Esc>` undoes the whole "hello world" in one `u`. To split, use `<C-g>u` in Insert mode at the breakpoint.
- `U` only undoes changes to the **current line** while you've been on it. Moving away resets the line-level history.
- `<C-r>` after typing new edits is **impossible** linearly — your old future is on a separate branch. To reach it, use `:undolist` to see leaf numbers and `:undo {N}` to jump straight to a leaf, or walk by time with `g-`/`g+`.
- Persistent undo (`'undofile'`) creates `.un~` files. Vim defaults `'undodir'` to `.` (next to each source file — messy); Neovim defaults to `~/.local/state/nvim/undo//`. Setting `'undodir'` to a single directory keeps things tidy on Vim.
- `g-`/`g+` walks the undo tree by **chronological order**, not by branch — that's how you can reach an "abandoned future" that linear `<C-r>` can't.
- `:earlier` and `:later` accept `{n}f` (file save count) too — `:earlier 1f` reverts to the last save.

## See also

- 🎯 Practice: [tier-2-09-undo-redo]
- 📖 Related: [dot-repeat]
- 📚 `:h u`, `:h CTRL-R`, `:h undo-tree`, `:h :earlier`
