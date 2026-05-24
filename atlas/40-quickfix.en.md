---
id: quickfix
category: power
drillable: false
difficulty: advanced
frequency: mid
related_drills: []
related_articles:
  - external-commands
  - tags
help_tags:
  - ":h quickfix"
  - ":h :cnext"
  - ":h :grep"
---

# Quickfix and location lists

A list of file:line:col entries you can step through. The mechanism behind compile-error navigation, grep results, and "find all references" in any tool.

## Commands

### Populate

| Command          | Action                                              |
|------------------|-----------------------------------------------------|
| `:make`          | Run `'makeprg'`, populate quickfix with errors       |
| `:grep {pat}`    | Run `'grepprg'`, populate quickfix with matches      |
| `:vimgrep /{pat}/ {files}` | Vim's built-in grep                       |
| `:helpgrep {pat}` | Search help                                        |
| `:copen [{n}]`   | Open quickfix window (height `{n}`)                  |
| `:cclose`        | Close quickfix window                               |
| `:cwindow`       | Open if non-empty, close if empty                   |

### Navigate

| Command          | Action                                              |
|------------------|-----------------------------------------------------|
| `:cnext` `:cn`   | Next entry                                          |
| `:cprev` `:cp`   | Previous entry                                      |
| `:cfirst` (`:cfir`) | First entry                                      |
| `:clast` (`:cla`)   | Last entry                                       |
| `:cc {n}`        | Jump to entry `n`                                   |
| `:cnfile`        | Jump to **first** entry in next file                |
| `:cpfile`        | Jump to **last** entry in previous file             |
| `:cdo {cmd}`     | Run `{cmd}` on each quickfix entry                  |
| `:cfdo {cmd}`    | Run `{cmd}` on each **file** in the quickfix list   |

### Location list (window-local)

The location list is a per-window equivalent of quickfix. Commands replace `c` with `l`:

| Command          | Action                                              |
|------------------|-----------------------------------------------------|
| `:lopen`         | Open location list window                           |
| `:lnext` `:lne`  | Next entry                                          |
| `:lprev` `:lp`   | Previous entry                                      |
| `:lgrep`         | Like `:grep` but populate location list             |

## Choosing between

- **Quickfix vs location list**: Quickfix is **global** (one per Vim). Location list is **per-window** — split a window, you get a fresh location list. Use quickfix for compile errors (global); use location list for per-file searches.
- **`:grep` vs `:vimgrep`**: `:grep` uses external `'grepprg'` (typically `grep -n` or `rg`). `:vimgrep` uses Vim's built-in regex on files. `:grep` is faster (especially with `rg`); `:vimgrep` is portable (no external dep).
- **`:make` vs `:!`**: `:make` integrates output with quickfix — jump to errors via `:cnext`. `:!` just shows shell output. Always prefer `:make` for build/test.
- **`:cnext` vs LSP-flagged**: `:cnext` walks compile/grep results. LSP diagnostics live in Neovim's `vim.diagnostic` namespace by default — **not** automatically in the location list (use `vim.diagnostic.setloclist()` or `vim.diagnostic.goto_next()` to navigate). Each has its own navigation.
- **`:copen` vs `:cwindow`**: `:copen` always opens; `:cwindow` opens only if list is non-empty and closes if empty. Use `:cwindow` after `:make` to auto-show on errors only.

## Examples

```text
Compile and step through errors:
  :make
  :copen           " see all errors
  <CR>             " jump to error (in quickfix window)
  :cnext           " next error
  :cprev           " previous

Grep for TODOs:
  :grep TODO -r .
  :copen
  :cnext...

Vim-internal grep (no external tool):
  :vimgrep /TODO/ **/*.py
  :copen

Use rg as grepprg:
  set grepprg=rg\ --vimgrep
  :grep "func main"
```

## Format expected from `:make` and `:grep`

The output is parsed by `'errorformat'`. Default formats handle GCC, most linters, and grep-with-line-numbers. Custom tools may need:

```vim
set errorformat=%f:%l:%c:\ %m
```

`%f` = filename, `%l` = line, `%c` = column, `%m` = message.

## Pitfalls

- `:vimgrep` is **slow** on large codebases — it reads each file into Vim. Use `:grep` with `rg`/`ag` instead.
- `:grep` runs in a shell — with quotes/special chars, escape properly: `:grep "complex pattern" file`.
- The quickfix list has **history**: `:colder` / `:cnewer` walk previous lists. Easy to lose track.
- `:cnext` from anywhere in Vim jumps to the next entry. To stay in the quickfix window and just scroll, navigate the buffer normally.
- Some plugins overwrite quickfix without warning (linters, fuzzy finders). Save and restore via variable: `let g:saved_qf = getqflist()` then `call setqflist(g:saved_qf)`. Or use a location list for isolation.

## See also

- 📖 Related: [external-commands], [tags]
- 📚 `:h quickfix`, `:h :cnext`, `:h :grep`, `:h 'errorformat'`
