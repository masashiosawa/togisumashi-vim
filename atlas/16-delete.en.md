---
id: delete
category: edit
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-2-03-delete
related_articles:
  - yank-paste
  - change
  - text-objects
help_tags:
  - ":h d"
  - ":h x"
  - ":h J"
---

# Delete

Remove text. Deleted content goes to the **unnamed register** (`""`) by default. Multi-line deletes (or deletes containing a newline), and any delete using `%`/`(`/`)`/`` ` ``/`/`/`?`/`n`/`N`/`{`/`}` motions (size-independent), enter the numbered-register history `"1`–`"9`. Sub-line deletes (no newline) go to the **small-delete register** `"-` instead.

## Commands

| Key      | Action                                                  |
|----------|---------------------------------------------------------|
| `x`      | Delete char under cursor                                |
| `X`      | Delete char before cursor                               |
| `{n}x`   | Delete `n` chars forward                                |
| `d{motion}` | Delete from cursor over motion                       |
| `dd`     | Delete whole line (linewise)                            |
| `D`      | Delete from cursor to end of line (`d$`)                |
| `:[range]d [reg]` | Delete range into register (e.g., `:1,10d a`)  |
| `J`      | Join current line with next (one space)                 |
| `gJ`     | Join without inserting space                            |
| `:[range]j` | Ex form of join                                      |

## Choosing between

- **`x` vs `dl`**: Identical. `x` is one keystroke shorter; prefer it.
- **`X` vs `dh`**: Identical. `X` is shorter.
- **`dw` vs `daw` vs `diw`**: `dw` deletes from cursor to next word start (may leave half-word). `daw` deletes whole word + adjacent space. `diw` deletes word only, keeps spaces. Use `daw` when the word should disappear cleanly.
- **`D` vs `d$`**: Identical. `D` is faster.
- **`dd` vs `V d`**: Identical. `dd` is faster; reach for visual line only if you need to extend selection first.
- **`J` vs `gJ`**: `J` inserts a space between joined lines (smart for prose/code). `gJ` joins raw. Use `gJ` for joining lines that already have spacing, or that shouldn't have space (URL fragments).
- **`d` vs `"_d`**: Default `d` overwrites the unnamed register. `"_d` deletes to the **black hole** — preserves whatever was in `""`. Use `"_d` when you yanked something you want to paste afterward.
- **`d` vs `c`**: Both delete. `d` ends in Normal; `c` enters Insert. If you'll immediately retype, use `c` — one fewer keystroke.

## Grammar

`d` is an operator. Compose with any motion or text object:

- `d3w` `d/foo<CR>` `dt;` `daw` `di(` `dap` `dG` `d%`

The doubled form `dd` is linewise; explicit `d_` also works but is rare.

## Examples

```text
Delete word under cursor:            daw
Delete to end of line:               D
Delete to next semicolon (exclusive): dt;
Delete to next semicolon (inclusive): df;
Delete a function body:              di{
Delete paragraph:                    dap
Delete and yank-preserve:            "_d{motion}
Join 3 lines:                        3J
```

## Pitfalls

- Default `d` clobbers the unnamed register. Yank something, delete, then `p` and you get the deletion, not the yank. Use `"_d` or paste from `"0` (yank register).
- `D` is **not** `dd`. `D` is line-suffix; `dd` is whole line.
- `dd` on the last line of a file deletes that line; the previous line becomes the new last line. The buffer doesn't "end mid-line". The on-disk trailing newline is controlled by `'fixendofline'` / `'endofline'` at save time.
- `J` with `'joinspaces'` adds **two** spaces after sentence-ending punctuation. Default: **Vim on, Neovim off**. `:set nojoinspaces` for one-space behavior on Vim.
- `x` on multi-byte chars (CJK, emoji) deletes one **character**, not one byte.

## See also

- 🎯 Practice: [tier-2-03-delete]
- 📖 Related: [yank-paste], [change], [text-objects]
- 📚 `:h d`, `:h x`, `:h J`, `:h registers`
