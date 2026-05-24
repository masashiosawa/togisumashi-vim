---
id: yank-paste
category: edit
status: drill-backed
related_drills:
  - tier-2-05-yank-paste
related_articles:
  - registers
  - delete
  - change
help_tags:
  - ":h y"
  - ":h p"
  - ":h gp"
---

# Yank and paste

Copy text into a register, paste it elsewhere. Vim's "copy" is called **yank** — but the mental model is the same.

## Commands

### Yank (copy)

| Key      | Action                                                  |
|----------|---------------------------------------------------------|
| `y{motion}` | Yank over motion                                     |
| `yy`     | Yank whole line                                         |
| `Y`      | Yank whole line (vanilla) — many vimrc remap to `y$`    |
| `:[range]y [reg]` | Yank range into register                       |

### Paste

| Key      | Action                                                  |
|----------|---------------------------------------------------------|
| `p`      | Paste **after** cursor (linewise: below line)           |
| `P`      | Paste **before** cursor (linewise: above line)          |
| `gp`     | Paste, leave cursor **after** pasted text               |
| `gP`     | Paste before, leave cursor after                        |
| `]p`     | Paste **after** with auto-indent matching surrounding code |
| `[p`     | Paste **before** with auto-indent                       |
| `]P`     | Same as `[p` (auto-indent paste before) — variant       |
| `[P`     | Same as `[p`                                            |
| `{n}p`   | Paste `n` copies                                        |
| `"{r}p`  | Paste from register `{r}`                               |
| `:[line]put [reg]` | Linewise put register after `[line]`          |

## Choosing between

- **`yy` vs `Y`**: In Vim, `Y` ≡ `yy` (whole line). **Neovim defaults `Y` to `y$`** (yank to end-of-line) for symmetry with `D` and `C`. Check your vimrc / Vim version.
- **`p` vs `P`**: `p` after cursor, `P` before. For linewise yanks: `p` puts below, `P` above.
- **`p` vs `gp`**: After paste, `p` leaves cursor at end of pasted text. `gp` leaves cursor **one past** — useful when you'll keep pasting forward.
- **`p` vs `]p`**: `p` pastes raw (preserves indentation as-yanked). `]p` re-indents the pasted lines to match surrounding code. Use `]p` when moving code between contexts.
- **`yy` then `p` vs `:copy`**: `yyp` duplicates the current line. `:copy .` (or `:t .`) does the same. `yyp` is faster; `:co` shines with ranges (`:5,10co.` copies lines 5-10 after current).
- **Default `""` vs system `"+`/`"*`**: `p` pastes from unnamed register (which can be overwritten by deletes). `"+` targets the system clipboard register — on X11/Wayland it's the **CLIPBOARD** selection (Ctrl+C/V); on macOS/Windows it's the system pasteboard (`"*` is aliased to `"+`). `"*` on X11/Wayland is the **PRIMARY** selection (middle-click paste) — a separate selection from `"+`. Requires `+clipboard` in Vim, or a configured provider in Neovim (`pbcopy` on macOS, `wl-copy`/`xclip` on Linux). Set `'clipboard'=unnamedplus` to make `""` use `"+` automatically.

## Examples

```text
Duplicate line:               yyp
Copy 5 lines, paste at end:   5yy  →  G  →  p
Yank to system clipboard:     "+yy
Paste from system clipboard:  "+p
Move a function:              da{  →  G  →  p     (delete around, paste after)
Insert template in code:      ]p   instead of p, to re-indent
Paste 3 copies:               3p
```

## Pitfalls

- The unnamed register is **clobbered by deletes** (including `c`, `s`, `x`). Yank something, then a `dw` later, and your yank is gone. Use `"0p` (yank register) or yank into a named register `"ay`. **Caveat**: `"0` is only updated by **unmodified** yanks (`yy`, `yiw`). A named yank like `"ay` writes to `"a` but leaves `"0` untouched, so `"0p` won't recover it — use `"ap` instead.
- `p` after `yy` on the last line puts the new line **below**, becoming the new last line. Display can lag if the line is below the scroll-off margin — `<C-l>` or `zz` redraws.
- `Y` is the most common surprise — vanilla Vim has it as `yy`, but tutorials assume `y$`. Standardize on one or the other.
- `]p` adjusts the pasted indent to match the current line's indent — independent of `'autoindent'`/`'smartindent'`. Distinct from `p` even with those off.
- Pasting linewise content with `P` inside a line creates a new line above; pasting charwise content does inline insertion. Mode of paste matches mode of yank.

## See also

- 🎯 Practice: [tier-2-05-yank-paste]
- 📖 Related: [registers], [delete], [change]
- 📚 `:h y`, `:h p`, `:h gp`, `:h ]p`, `:h clipboard`
