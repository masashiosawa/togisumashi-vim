---
id: terminal-job
category: power
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - external-commands
  - windows
help_tags:
  - ":h terminal"
  - ":h terminal-job"
---

# Terminal-Job mode

Vim 8+ and Neovim ship with a built-in terminal emulator. Run a shell inside a Vim window — no need to suspend Vim or split into a separate terminal.

## Commands

### Open

| Command          | Action                                              |
|------------------|-----------------------------------------------------|
| `:terminal`      | **Vim**: open shell in horizontal split. **Neovim**: open shell in the **current window** (replaces it). Use `:split \| terminal` for a split in Neovim |
| `:vertical terminal` | Vim: open in vertical split. (Neovim: use `:vsplit \| terminal`) |
| `:terminal {cmd}` | Run `{cmd}` instead of shell                       |
| `:term`          | Shortcut for `:terminal`                            |

### Terminal-Job mode (running)

While the shell is active (Job mode):
- Keystrokes go to the **shell**, not Vim
- `<C-w>` is the only Vim-aware prefix

| Key             | Action                                              |
|-----------------|-----------------------------------------------------|
| `<C-w>N`        | Switch to **Terminal-Normal mode** (Vim controls)   |
| `<C-w>:`        | Run a Vim ex command without leaving terminal       |
| `<C-w>{hjkl}`   | Move to adjacent window                             |
| `<C-w>"{r}`     | Paste register `{r}` into terminal (**Vim only**; Neovim: `<C-\><C-N>"{r}pa`) |
| `i` (from Terminal-Normal) | Re-enter Terminal-Job mode               |

### Mappings

```vim
" Map <Esc> to exit terminal mode (Neovim)
tnoremap <Esc> <C-\><C-n>
```

Both `<C-w>N` and `<C-\><C-n>` exit Terminal-Job mode in Vim 8 and Neovim. The concept differs: **Vim** has a distinct **Terminal-Normal mode** with its own help (`:h Terminal-mode`); **Neovim** returns to ordinary Normal mode. Use `<C-\><C-n>` as a fallback when a TUI app inside the terminal (fzf, vim, etc.) intercepts `<C-w>`.

## Choosing between

- **`:terminal` vs `:!`**: `:terminal` is **persistent** — run a shell, work in it interactively, switch back to Vim. `:!` is one-shot — runs and returns to Vim. Use terminal for REPLs, watchers, ongoing work; `:!` for fire-and-forget.
- **`:terminal` vs tmux**: Tmux is OS-level, persistent across Vim restarts. `:terminal` is in-Vim. Many Vim users keep tmux for the multi-pane layer and `:terminal` for occasional inline shells.
- **Terminal-Job vs Terminal-Normal**: Job mode = your keystrokes are the shell's input. Normal mode = Vim controls (search/yank from output buffer). Switch with `<C-w>N`.
- **Vim 8 terminal vs Neovim terminal**: Both work, but key bindings and APIs differ. Neovim's is more polished and integrates with `nvim_open_term()` Lua API.

## Examples

```text
Open a shell:                  :terminal
Run a test watcher:            :terminal npm test --watch
Open in vertical split:        :vertical terminal
Run quick task:                :terminal pytest
Exit to Normal:                <C-w>N

In Terminal-Normal mode:
  / search<CR>      search terminal output
  yiw               yank a word
  :let @+=@"<CR>    copy to system clipboard

Re-enter Job mode:    i  (or a)
```

## Pitfalls

- Exiting Terminal-Job mode to Vim: `<C-w>N` or `<C-\><C-n>` work in both Vim 8 and Neovim. Many users remap `<Esc>` (e.g. `tnoremap <Esc> <C-\><C-n>`) but be careful — programs needing actual `<Esc>` (less, fzf, vim itself) will break.
- A terminal buffer survives the process exiting — content stays visible. Close with `:bd!`.
- Don't run interactive Vim inside `:terminal` — recursive setup is fragile. Use a separate tab/window for nested Vim.
- Scrollback length is controlled by **`'termwinscroll'` in Vim** and **`'scrollback'` in Neovim** — not `'termwinsize'` (which sets terminal window dimensions in Vim only).
- Pasting from system clipboard varies: `<C-w>"+` in Vim, `<C-\><C-N>"+pa` in Neovim. Some host terminals intercept either.

## See also

- 📖 Related: [external-commands], [windows]
- 📚 `:h terminal`, `:h terminal-job`, `:h CTRL-W_:`
