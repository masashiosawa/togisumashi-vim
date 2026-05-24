---
id: argument-list
category: environment
status: concept-only
related_drills: []
related_articles:
  - buffers
  - starting-vim
help_tags:
  - ":h argument-list"
  - ":h :args"
---

# Argument list

A list of files Vim was launched with — or that you've explicitly set. Distinct from the buffer list. The argument list is the basis of `:argdo` (project-wide operations).

## Commands

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `:args`           | Show argument list                                  |
| `:args {files}`   | Set argument list (clears existing)                 |
| `:args **/*.py`   | Set with glob pattern                               |
| `:argadd {file}`  | Add file to list                                    |
| `:argdelete {file}` | Remove file from list                             |
| `:next` `:n`      | Edit next file in arg list                          |
| `:prev` `:N`      | Edit previous file                                  |
| `:first` `:rew`   | Edit first file                                     |
| `:last`           | Edit last file                                      |
| `:argdo {cmd}`    | Run `{cmd}` on each file in arg list                |
| `:wnext`          | Write current, edit next                            |
| `:argument {n}`   | Edit `n`-th argument                                |

## Choosing between

- **Argument list vs buffer list**: Arg list = files Vim was launched with (or `:args` set). Buffer list = every file you've opened in this session. Arg list is a **deliberate subset** — useful for "operate on these specific files".
- **`:argdo` vs `:bufdo`**: `:argdo` iterates the arg list. `:bufdo` iterates only **listed buffers** (help, quickfix, terminal are `nobuflisted` and skipped). For project-wide refactors, set args explicitly then `:argdo` for clean scope.
- **`:args **/*.py` vs `:bufdo`**: `:args` populates from a glob — useful for "set args to all Python files in project, then refactor". `:bufdo` requires you to first open them.
- **`:next` vs `:bn`**: `:next` moves through arg list, `:bn` through buffer list. Different lists.

## Examples

```text
View arg list:                  :args
Refactor across selected files:
  :args src/**/*.js
  :argdo %s/oldFn/newFn/ge | update

Set then iterate:
  :args **/*.py
  :next  →  edit  →  :wnext  →  edit  →  ...

Add to args from current buffer:  :argadd %
Show current position:            :args   (current shown in [brackets])

Apply ex command per arg:
  :args **/*.py
  :argdo %s/oldFn/newFn/ge | update    (rewrite + save each)
```

## Pitfalls

- `:args **/*.x` is a **glob**, not a regex. Different syntax.
- `:argdo` echoes per-file messages — they scroll fast and are easy to miss. Prefix with `:silent argdo ...` to suppress, or `:argdo ... | update` to save after each edit. Errors in one file abort the loop.
- `:argdo` and `:bufdo` add **only the `Syntax` event** to `'eventignore'` during iteration (for speed) — `BufRead`/`BufEnter`/`FileType` still fire, so filetype detection still runs but syntax highlighting won't kick in per visited file. `:windo` and `:tabdo` are not documented to suppress autocmds.
- The arg list is **session-only** unless you save it via `:mksession`. Reopening Vim loses it.
- `:next` refuses to advance if current buffer has unsaved changes. Use `:wnext` or `:next!`.
- Setting args **clears** the current list. `:args file.txt` discards previous arguments. Use `:argadd` to extend.

## See also

- 📖 Related: [buffers], [starting-vim]
- 📚 `:h argument-list`, `:h :args`, `:h :argdo`
