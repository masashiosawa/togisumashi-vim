---
id: case-numeric
category: edit
drillable: true
difficulty: intermediate
frequency: mid
related_drills:
  - tier-2-07-indent-case-num
related_articles:
  - change
  - visual-mode
help_tags:
  - ":h gu"
  - ":h gU"
  - ":h CTRL-A"
---

# Case conversion and numeric increment

Two unrelated but always-useful operations: convert case across a range, and increment/decrement numbers under the cursor.

## Case commands

| Key          | Action                                              |
|--------------|-----------------------------------------------------|
| `~`          | Toggle case of char under cursor (Normal)           |
| `g~{motion}` | Toggle case over motion (operator)                  |
| `g~~`        | Toggle case of whole line                           |
| `gu{motion}` | Lowercase over motion                               |
| `guu`        | Lowercase whole line                                |
| `gU{motion}` | Uppercase over motion                               |
| `gUU`        | Uppercase whole line                                |
| `{visual}u`  | Lowercase selection                                 |
| `{visual}U`  | Uppercase selection                                 |
| `{visual}~`  | Toggle case of selection                            |
| `g?{motion}` | Apply ROT13 over motion (kept for completeness)     |

## Numeric commands

| Key          | Action                                              |
|--------------|-----------------------------------------------------|
| `<C-a>`      | **Increment** number at or after cursor             |
| `<C-x>`      | **Decrement** number at or after cursor             |
| `{n}<C-a>`   | Add `n` to number                                   |
| `{n}<C-x>`   | Subtract `n` from number                            |
| `g<C-a>`     | (any Visual: `v`/`V`/`<C-v>`) Add `[count]` to each line's number sequentially (row N gets `N*[count]`) — turns a column of 0s into 1,2,3...; blockwise selection is the most common use but not required |
| `g<C-x>`     | (any Visual) Sequential decrement (same idea, subtracts) |

## Choosing between

- **`~` vs `g~iw`**: `~` toggles one char and advances. `g~iw` toggles a whole word and stays. For typos, `~`; for whole-word case fix, `g~iw`.
- **`gu` vs `gU` vs `~`**: `gu` forces lowercase, `gU` forces uppercase, `~` toggles. If you don't know the current case, `~`. If you want a specific result, `gu`/`gU`.
- **`<C-a>` vs hand-typing**: `<C-a>` finds the next number on the line and increments. Use to bump port numbers, version strings, list indices. With visual block + `g<C-a>` you generate numbered lists in seconds.
- **`<C-a>` on dates**: Vim has limited date recognition with `'nrformats'` — `<C-a>` on `2026-01-31` may not roll to `2026-02-01`. Use `:put =strftime(...)` for date math.
- **`<C-a>` interpretation of bases**: `'nrformats'` controls whether `0b10`, `0777`, `0x1a` are seen as binary/octal/hex. Practical defaults are **`bin,hex`** in both modern Vim (`--clean` / `defaults.vim` applied — which is how Vim starts when no vimrc is present) and Neovim, so `0777` is treated as **decimal**. The raw Vim default (`vim -u NONE`) is `bin,octal,hex`, treating `0777` as octal — but normal startups apply `defaults.vim`, so this default rarely reaches users. If you genuinely want octal interpretation, add `octal` explicitly.
- **`gUap` (paragraph) vs `gUip`**: `ap` includes the trailing blank line; `ip` doesn't. With case ops the difference is invisible (blank lines have no case), but operators behave the same way.

## Examples

```text
Lowercase whole word:       guiw
Uppercase a function name:  gUiw   (cursor on the name)
Toggle case of selection:   V  ~
Lowercase to end of file:   guG

Bump first number:          cursor on/before "1.2.3"  →  <C-a>  →  2.2.3
Bump patch number:          cursor on the "3"          →  <C-a>  →  1.2.4

Generate 1..10:
  :put =range(1,10)<CR>

Numbered list from zeros:
  10o0<Esc>          (insert 10 lines of "0")
  <C-v>9k            (visual-block-select the column of 0s)
  g<C-a>             →  becomes 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

## Pitfalls

- `<C-a>` and `<C-x>` operate on the **next** number on the line, **not** strictly the char under the cursor. If the cursor is before the number, Vim still finds it.
- For **decimals**, `<C-a>` treats a leading `-` as a sign by default (`-5` → `-4`). To make `-` literal (not part of the number), add `unsigned` to `'nrformats'`. For hex/octal/binary, `-` is **never** part of the number.
- In GNU screen, `<C-a>` is the **default prefix** — screen eats it before Vim sees it. Tmux's default prefix is `<C-b>`, but many users rebind tmux to `<C-a>` and hit the same problem. Either change the multiplexer prefix, or remap inside Vim (e.g. `nnoremap <Leader>+ <C-a>` — **don't use `<C-]>` as the remap target since that's the default tag-follow key**).
- `~` requires `'tildeop' = off` to work as 1-char toggle. With `'tildeop' = on`, `~` becomes an operator (`~w` toggles a word).
- Case operations on multi-byte characters depend on locale. Most CJK chars have no case to convert.

## See also

- 🎯 Practice: [tier-2-07-indent-case-num]
- 📖 Related: [change], [visual-mode]
- 📚 `:h gu`, `:h gU`, `:h CTRL-A`, `:h 'nrformats'`
