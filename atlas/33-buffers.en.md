---
id: buffers
category: environment
drillable: false
difficulty: intermediate
frequency: mid
related_drills: []
related_articles:
  - files
  - windows
  - tabs
help_tags:
  - ":h buffers"
  - ":h :buffer"
  - ":h CTRL-^"
---

# Buffers — in-memory files

A **buffer** is a file's in-memory representation. Opening 5 files means 5 buffers — independent of how many windows show them. Mastering buffer navigation lets you keep many files "active" without juggling tabs or splits.

## Commands

### List / select

| Command         | Action                                              |
|-----------------|-----------------------------------------------------|
| `:ls` `:files`  | List all buffers                                    |
| `:buffers`      | Same as `:ls`                                       |
| `:b {n}`        | Switch to buffer `n` (number from `:ls`)            |
| `:b {name}`     | Switch to buffer matching `{name}` (partial OK)     |
| `:bn` `:bnext`  | Next buffer                                         |
| `:bp` `:bprev`  | Previous buffer                                     |
| `:bf` `:bl`     | First / last buffer                                 |
| `<C-^>` or `<C-6>` | Toggle between current and alternate buffer      |

### Delete / unload

| Command         | Action                                              |
|-----------------|-----------------------------------------------------|
| `:bd`           | Buffer delete (close, but file stays on disk)       |
| `:bd!`          | Force delete (discard changes)                      |
| `:bd {n,m,...}` | Delete multiple buffers                             |
| `:bw`           | Buffer wipeout (deeper unload — removes from `:ls`) |
| `:bufdo {cmd}`  | Run `{cmd}` on every buffer                         |
| `:%bd`          | Delete ALL buffers                                  |

### Buffer flags in `:ls`

```
 1 %a   "foo.c"      line 1
 2 #h   "bar.c"      line 23
 3      "baz.c"      line 5
```

| Flag | Meaning                                                    |
|------|------------------------------------------------------------|
| `%`  | Current buffer                                             |
| `#`  | Alternate buffer (target of `<C-^>`)                       |
| `a`  | Active (loaded, visible)                                   |
| `h`  | Hidden (loaded but not visible)                            |
| `-`  | `'modifiable'` off — buffer editing disabled               |
| `=`  | Read-only                                                  |
| `+`  | Modified                                                   |
| `x`  | Errors loading                                             |

## Choosing between

- **Buffer vs window vs tab**: A **buffer** is the content. A **window** is a view of a buffer. A **tab** is a collection of windows. Multiple windows can show the same buffer; one buffer can be hidden (no window).
- **`:b {n}` vs `:b {name}`**: Number is precise but requires looking at `:ls`. Name accepts partial matches and `<Tab>`-completes. Use name unless ambiguous.
- **`<C-^>` vs `:bn`**: `<C-^>` toggles between **current and last** buffer (alternate). `:bn` walks numerically. `<C-^>` is the fastest "go back".
- **`:bd` vs `:bw`**: `:bd` removes the buffer from active state but keeps it loadable. `:bw` fully wipes memory. Use `:bd` normally; `:bw` if you really want it gone.
- **Buffer list vs argument list**: Buffer list = all opened files in session. Argument list = files Vim was launched with (modifiable via `:args`). They overlap but aren't the same.
- **`:bufdo` vs `:argdo`**: `:bufdo` iterates over **listed buffers only** (unlisted: help, quickfix, terminal — skipped). `:argdo` only on the argument list. Use `:argdo` for project-wide refactors when you set args explicitly. Both add only the `Syntax` event to `'eventignore'` during iteration (so syntax highlighting won't kick in per visited file).

## Examples

```text
List buffers:                 :ls
Switch by name:               :b foo<Tab>     →  picks first matching
Alternate file toggle:        <C-^>
Close current buffer:         :bd
Save all:                     :wa
Substitute across all buffers: :bufdo %s/foo/bar/g | update
Apply macro to each buffer:   :bufdo normal! @a
```

## Web environment note

Web Vim emulations typically don't have multiple buffers — only the single visible editor. This article is for real Vim/Neovim.

## Pitfalls

- `:bd` does **not delete the file from disk** — only the in-memory buffer. The file stays. To delete the file, use `:!rm %` first.
- When the last window for a buffer closes, the buffer becomes "hidden" (with `'hidden'` set) or wiped (without). Set `:set hidden` to keep buffers around.
- `:bn` cycles through **listed** buffers only — unlisted buffers (help, quickfix, terminal output, etc.) are always skipped (the `!` on `:bn` means abandon a modified buffer, not "include unlisted"). Use `:ls!` to see all buffers including unlisted, and `:b {n}` with the explicit number to jump to one.
- Switching buffers with unsaved changes is refused unless `'hidden'` is on. Vim defaults `'hidden'` to off; **Neovim has `'hidden'` on by default**, so most Neovim users hit this less.
- `:ls` numbers are not stable — they're just enumeration order. After `:bd 3` the remaining buffers keep their old numbers; new buffers get higher numbers.

## See also

- 📖 Related: [files], [windows], [tabs]
- 📚 `:h buffers`, `:h :buffer`, `:h CTRL-^`, `:h 'hidden'`
