---
id: change
category: edit
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-2-04-change
related_articles:
  - delete
  - insert-entry
  - grammar-of-vim
help_tags:
  - ":h c"
  - ":h r"
  - ":h R"
---

# Change — delete and enter Insert

Replace text in one motion: delete the target, drop into Insert mode at the deletion point. The bread and butter of code editing.

## Commands

| Key       | Action                                                  |
|-----------|---------------------------------------------------------|
| `c{motion}` | Change over motion (delete + Insert)                  |
| `cc`      | Change whole line                                       |
| `C`       | Change to end of line (`c$`)                            |
| `s`       | Substitute char — like `cl`                             |
| `S`       | Substitute line — like `cc`                             |
| `r{c}`    | Replace one char with `{c}`, stay in Normal             |
| `R`       | Enter **Replace mode** (overwrite typing)               |
| `gr{c}`   | Virtual Replace (1 char) — preserves tab widths             |
| `gR`      | Virtual Replace mode — overwrite as you type, preserving layout |
| `~`       | Toggle case of char under cursor                        |
| `{n}~`    | Toggle case of `n` chars                                |

## Choosing between

- **`c` vs `d` + `i`**: `c{motion}` is one fewer keystroke and replays correctly with `.`. Use `c` whenever the next action is typing.
- **`s` vs `cl`**: Identical. `s` is shorter.
- **`S` vs `cc`**: Identical. `S` is one keystroke, `cc` follows the grammar.
- **`C` vs `c$`**: Identical. `C` is faster.
- **`r` vs `s`**: `r` replaces one char and stays in Normal — perfect for typos. `s` deletes one char and enters Insert (replace with multi-char). Use `r` when output length stays 1.
- **`r` vs `R`**: `r` replaces one char then back to Normal. `R` enters Replace mode (overwrite as you type). Use `R` for fixed-width edits (ASCII art, columns).
- **`~` vs `gU` / `gu`**: `~` toggles one char's case. `gu{motion}` / `gU{motion}` lowercase/uppercase a range. Use `~` for typos, `g~iw` for whole word, `gUiw` to force uppercase.
- **`ciw` vs `cw`**: `cw` changes from cursor to next word start (mid-word leaves the start half). `ciw` changes the whole word regardless of cursor position. Almost always use `ciw`.

## Grammar

`c` is an operator — composes with everything:

- `cw` / `cW` (quirk: behave as `ce` / `cE` when the cursor is on a non-blank). With a count (`c2w`), the special case still applies — only the last word's trailing whitespace is preserved. `dw` is unaffected.
- `ciw`, `caw`, `ci"`, `ci(`, `ci{`, `cit`, `cip`
- `c/foo<CR>` (change to next "foo")
- `c2w`, `c$`, `cG`

After completion, `<Esc>` returns to Normal and the entire change (text and all) is replayable with `.`.

## Examples

```text
Replace word at cursor:    ciw newword <Esc>
Fix typo:                  r b           (replace one char with b)
Change to end of line:     C  // new comment<Esc>
Change in quotes:          ci"  hello<Esc>
Change in HTML tag:        cit  content<Esc>
Toggle case of word:       g~iw
All uppercase a word:      gUiw
Repeat last change:        .
```

## Pitfalls

- When the cursor is on a non-blank, `cw` / `cW` are treated as `ce` / `cE` (trailing space stays); on whitespace they follow `w` / `W` semantics. To delete the trailing space too, use `caw` / `caW`. `dw` / `dW` are **not** affected by this special case.
- `R` (Replace mode) shows `-- REPLACE --` in the status. It overwrites characters as you type; pressing `<Esc>` exits like Insert.
- `~` advances the cursor by 1. `g~iw` does **not** advance — operator form, returns to start.
- `r<Esc>` cancels the `r` (no replacement happens). To insert a literal `<Esc>` character use `r<C-v><Esc>`.
- `c{motion}` deletes the motion range and enters Insert. With `cc` (linewise), the line is blanked and `'autoindent'` will reinsert leading whitespace when you start typing; `'cindent'`/`'smartindent'`/`'indentexpr'` may re-indent on the fly.

## See also

- 🎯 Practice: [tier-2-04-change]
- 📖 Related: [delete], [insert-entry], [grammar-of-vim]
- 📚 `:h c`, `:h r`, `:h R`, `:h ~`
