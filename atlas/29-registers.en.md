---
id: registers
category: repeat
drillable: true
difficulty: intermediate
frequency: mid
related_drills:
  - tier-3-05-registers
related_articles:
  - yank-paste
  - macros
  - insert-mode-keys
help_tags:
  - ":h registers"
  - ":h quote"
---

# Registers — Vim's clipboard system

Vim has **about 50 registers across 10 types** for storing text and macros. Knowing the architecture is the difference between cursing the unnamed register and weaponizing it.

## Register types

| Register     | RW | Purpose                                                       |
|--------------|----|---------------------------------------------------------------|
| `""`         | RW | **Unnamed** — last yank or delete (default for `p`, `y`, `d`) |
| `"0`         | RW | **Yank** — updated by unmodified `y` (`yy`, `yw`, etc.). With a named target (`"ay`), the named register gets the text; `"0` is NOT updated. NOT updated by `d`/`c`/`x` |
| `"1`–`"9`    | RW | **Delete/change history** — for deletes/changes that span more than one line OR contain a newline, AND for deletes using `%`, `(`, `)`, `` ` ``, `/`, `?`, `n`, `N`, `{`, `}` motions (size-independent) |
| `"-`         | RW | **Small delete** — for deletes/changes within a single line (no newline) when no register specified |
| `"a`–`"z`    | RW | **Named** — explicit, persistent within session               |
| `"A`–`"Z`    | RW | **Append** — uppercase appends to lowercase register          |
| `"_`         | RW | **Black hole** — discards content (no save)                   |
| `"+`         | RW | System clipboard (X11/Wayland CLIPBOARD selection; macOS/Windows pasteboard). Requires `+clipboard` in Vim, or a provider in Neovim |
| `"*`         | RW | X11 PRIMARY selection (middle-click); aliased to `"+` on macOS/Windows |
| `"~`         | RO | Last drop (drag-and-drop into Vim) — read-only. GTK GUI Vim only; not available in Neovim |
| `"/`         | RW | Last search pattern (writable via `:let @/`)                   |
| `"#`         | RW | **Alternate** buffer name (alternate-buffer register)          |
| `":`         | RO | Last ex command (read-only — use `<C-r>:`)                    |
| `".`         | RO | Last inserted text (read-only)                                |
| `"%`         | RO | Current filename (read-only)                                  |
| `"=`         | RW | **Expression register** — evaluated at read time. Writable via `:let @= = 'expr'` |

## Using registers

| Syntax       | Meaning                                              |
|--------------|------------------------------------------------------|
| `"{r}y`      | Yank into register `{r}`                             |
| `"{r}d`      | Delete into register `{r}`                           |
| `"{r}p`      | Paste from register `{r}`                            |
| `:reg`       | Show all registers (or `:reg a b c` for specific)    |
| `:let @{r}='...'` | Set register `{r}` programmatically             |
| `<C-r>{r}`   | Paste in Insert/command-line                         |
| `<C-r>={expr}<CR>` | Insert expression result                       |

## Choosing between

- **`""` vs `"0`**: `""` is overwritten by **any** yank or delete (`d`, `c`, `s`, `x`, `y`). `"0` is updated **only by unmodified yanks** (`yy`, `yiw`, `y$`); a named yank (`"ay`) writes to `"a` and leaves `"0` untouched. `"0` is never touched by deletes. After yanking then deleting, `"0p` recovers the yank, `p` pastes the most recent delete.
- **`"1`–`"9` vs `"-`**: Deletes/changes that span more than one line (or contain a newline), **or** that use `%`, `(`, `)`, `` ` ``, `/`, `?`, `n`, `N`, `{`, `}` motions, go into `"1` (then shift `"1`→`"2` on each new one) regardless of size. Sub-line deletes/changes (single line, no newline) go into `"-` instead. Specifying a register explicitly (`"ad`) writes to `"a` but the same `"1`/`"-` rules still apply for the history copy.
- **`"0` vs `"+`/`"*`**: `"0` is Vim-internal. `"+` taps the OS clipboard. To share with browser/other apps, use `"+y`/`"+p` (or `:set clipboard=unnamedplus` to make `""` automatically use the system clipboard).
- **`"+` vs `"*`**: On X11, `"*` is the primary selection (middle-click), `"+` is the GUI clipboard. On macOS/Windows, both target the system clipboard.
- **`"a` vs `"A`**: Lowercase **overwrites**, uppercase **appends**. Use `"Ay` to keep collecting snippets into one register.
- **`"_d` vs `d`**: `"_d` deletes to the black hole — preserves whatever was in `""`. Critical when you yanked something to paste-replace.
- **`"=` (expression) vs `<C-r>=`**: `"=` for normal-mode paste of expression result (`"=1+1<CR>p` pastes `2`). `<C-r>=` for in-line paste while in Insert/command-line.

## Examples

```text
View all registers:                    :reg
View specific registers:               :reg a 0 "

Yank into named, paste later:          "ayy  ...  "ap

Yank without disturbing default:       "_d (when only deleting)
                                       "0p (paste the last yank specifically)

Append to register a:                  "Ayy   (then "Ay again to accumulate)

Paste system clipboard:                "+p
Yank to system clipboard:              "+yy

Paste filename in command:             :e <C-r>%

Insert math result:                    <C-r>=10*10<CR>

Recall last search:                    "/p  (puts the search pattern as text)
```

## Pitfalls

- The unnamed register is **destructive** — every delete overwrites it. Habit: use `"_d` when you don't want the deletion saved, or paste from `"0` for last yank.
- `"+y` requires Vim built with `+clipboard`. Check `:echo has('clipboard')`. Lightweight builds may lack it.
- `:reg a` shows the content; `"ay` writes to it. Don't confuse the colon and quote variants.
- `"A` (append) only adds **at the end**. To prepend, you'd need to `:let @a = '...' . @a`.
- Read-only registers: `":` `".` `"%` `"~` — paste from them but cannot `y`/`d` into them. `"/` is writable via `:let @/` (and updated by every search). `"#` is also writable (alternate-buffer, not in the RO group).
- `"+y` requires `+clipboard` in Vim, or a configured clipboard provider in Neovim (`pbcopy` on macOS, `wl-copy`/`xclip` on Linux). Check `:echo has('clipboard')` or `:checkhealth` in Neovim.
- `<C-r>"` in Insert pastes the unnamed register, but the cursor stays — different feel from `p` (Normal moves cursor to end of paste).

## See also

- 🎯 Practice: [tier-3-05-registers]
- 📖 Related: [yank-paste], [macros], [insert-mode-keys]
- 📚 `:h registers`, `:h quote`, `:h quote0`, `:h "_`
