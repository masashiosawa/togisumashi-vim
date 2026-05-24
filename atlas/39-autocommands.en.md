---
id: autocommands
category: config
drillable: false
difficulty: master
frequency: low
related_drills: []
related_articles:
  - settings
  - mappings
help_tags:
  - ":h autocmd"
  - ":h :autocmd"
  - ":h autocmd-events"
---

# Autocommands — event-driven config

Run a command **automatically** when something happens: opening a file, saving, entering a buffer, leaving Insert mode. The backbone of filetype-specific behavior and editor automation.

## Commands

| Command            | Action                                              |
|--------------------|-----------------------------------------------------|
| `:autocmd {event} {pattern} {cmd}` | Register autocmd                    |
| `:autocmd ... ++once {cmd}` | Register a one-shot autocmd (Vim 8.1+)      |
| `:autocmd ... ++nested {cmd}` | Allow nested autocmd firing from inside  |
| `:autocmd!` (no args) | Remove all autocmds for current group           |
| `:autocmd! {event} {pattern}` | Remove matching autocmds                 |
| `:autocmd` (no args) | List all autocmds                                |
| `:augroup {name}` ... `:augroup END` | Group autocmds                   |
| `:doautocmd {event}` | Manually trigger event                           |

## Common events

| Event              | When fired                                          |
|--------------------|-----------------------------------------------------|
| `BufRead` / `BufReadPost` (same event) | After reading a file        |
| `BufReadPre`       | **Before** reading a file                           |
| `BufWrite` / `BufWritePre` (same event) | **Before** writing buffer  |
| `BufWritePost`     | **After** writing buffer                            |
| `BufNewFile`       | Creating a new file                                 |
| `BufEnter` `BufLeave` | Entering / leaving a buffer                      |
| `BufWinEnter`      | Buffer appears in a window                          |
| `FileType`         | Setting `'filetype'`                                |
| `InsertEnter` `InsertLeave` | Entering / leaving Insert mode             |
| `TextChanged` `TextChangedI` | Text changed (Normal / Insert)            |
| `CursorHold` `CursorHoldI` | Cursor still for `'updatetime'` ms           |
| `CursorMoved` `CursorMovedI` | Cursor moved                              |
| `WinEnter` `WinLeave` | Window focus change                              |
| `VimEnter` `VimLeave` | Vim startup / shutdown                           |
| `ColorScheme`      | After loading a colorscheme                         |

## Pattern syntax

| Pattern        | Matches                                            |
|----------------|----------------------------------------------------|
| `*`            | All files                                           |
| `*.py`         | Files ending in `.py`                               |
| `*.{c,h}`      | Files ending in `.c` or `.h`                        |
| `python`       | Filetype "python" (with `FileType` event)           |
| `<buffer>`     | Current buffer only                                 |

## Choosing between

- **Autocommand vs always-on setting**: If a setting applies only sometimes (per filetype, per project), use `autocmd FileType` or `autocmd BufRead path/*`. Otherwise put it in `~/.vimrc` directly.
- **`autocmd FileType` vs `ftplugin/`**: Same effect. `ftplugin/{ft}.vim` is the **conventional** place — Vim auto-runs it for matching filetype. Use `ftplugin/` for filetype-specific config; use `autocmd FileType` in vimrc for one-offs.
- **`autocmd BufWritePre` vs `:!` on save**: `autocmd` runs in-Vim, integrated with undo. `:!` shells out. Prefer autocmd when possible (e.g., for trim trailing whitespace).
- **`InsertLeave` vs `<C-c>`**: `<C-c>` skips `InsertLeave` autocmds. For format-on-leave to work, use `<Esc>` not `<C-c>`.
- **Augroup vs no augroup**: Without `augroup`, every vimrc reload **appends** another autocmd — duplicates accumulate. Wrap in `augroup` + `autocmd!` (clear) at the top.

## Examples

```vim
" Strip trailing whitespace on save (all files)
augroup TrimWhitespace
  autocmd!
  autocmd BufWritePre * %s/\s\+$//e
augroup END

" Set Python indent
augroup PythonIndent
  autocmd!
  autocmd FileType python setlocal shiftwidth=4 expandtab
augroup END

" Highlight on yank (Neovim)
augroup HighlightYank
  autocmd!
  autocmd TextYankPost * silent! lua vim.highlight.on_yank()
augroup END

" Auto-reload changed files
autocmd FocusGained,BufEnter * checktime

" Restore cursor position
autocmd BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$") | exe "normal! g`\"" | endif

" Save unnamed file template
autocmd BufNewFile *.py 0r ~/.vim/templates/python.py
```

## Pitfalls

- Forgetting `autocmd!` inside an `augroup` accumulates duplicate handlers on every vimrc reload — performance degrades silently.
- `BufRead` runs once per file read; `BufEnter` runs every time you re-enter the buffer. Choose the one matching your intent.
- Patterns are glob-style, not regex. `*.{py,pyi}` works (brace expansion); `.*\.py` doesn't.
- `FileType` event fires only after Vim has determined the filetype — for an event before, use `BufReadPre`.
- `autocmd ... InsertLeave * call FormatOnLeave()` may run on **every** Insert exit, including trivial ones. Filter with conditionals (`b:changedtick` diff, etc.) or move to `BufWritePre`.
- To **temporarily suppress** autocmds, use `:noautocmd {cmd}` for a single command, or `set eventignore=all` (restore with `set eventignore=`) for a block. Specific events: `set eventignore=BufRead,FileType`. Note: `:argdo` and `:bufdo` internally add **only the `Syntax` event** to `'eventignore'` during iteration (for speed) — `BufRead`/`BufEnter`/`FileType`/etc still fire. `:windo` and `:tabdo` are not documented to suppress anything.

## See also

- 📖 Related: [settings], [mappings]
- 📚 `:h autocmd`, `:h autocmd-events`, `:h augroup`
