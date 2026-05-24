---
id: insert-entry
category: insert
status: drill-backed
related_drills:
  - tier-2-01-insert-entry
related_articles:
  - insert-mode-keys
  - change
  - grammar-of-vim
help_tags:
  - ":h insert"
  - ":h a"
  - ":h o"
---

# Entering insert mode

A dozen ways to switch from Normal to Insert. Each picks a starting position so you don't waste keystrokes positioning the cursor before typing.

## Commands

| Key       | Action                                                       |
|-----------|--------------------------------------------------------------|
| `i`       | Insert **before** cursor                                     |
| `a`       | Insert **after** cursor (append)                             |
| `I`       | Insert at first **non-blank** of line                        |
| `A`       | Insert at **end** of line                                    |
| `o`       | Open new line **below**, insert                              |
| `O`       | Open new line **above**, insert                              |
| `s`       | Substitute character — delete char then insert (`cl`)        |
| `S`       | Substitute line — delete line content then insert (`cc`)     |
| `gI`      | Insert at **column 1** (literal start of line, ignoring indent) |
| `c{motion}` | Change motion target then insert                           |
| `cc`      | Change whole line                                            |
| `C`       | Change to end of line                                        |

## Choosing between

- **`i` vs `a`**: `i` inserts **before** cursor, `a` inserts **after**. To start typing at end-of-word, `a` is one keystroke fewer than `i` after moving right.
- **`I` vs `0i`**: `I` jumps to first non-blank and enters insert. `0i` jumps to column 0. For indented code, `I` is almost always what you want.
- **`A` vs `$a`**: `A` is one stroke shorter than `$a` and does the same thing. Use `A` unconditionally.
- **`o` vs `O`**: `o` opens a line below, `O` above. With `'autoindent'`, both inherit the current indent — perfect for adding statements in indented blocks.
- **`s` vs `r`**: `s` deletes the char and enters insert mode (multi-char replacement). `r` replaces with one char and stays in normal mode. Use `r` for typos, `s` for changing one char into many.
- **`S` vs `cc`**: Identical. `S` is the one-key version. `cc` is the grammar-consistent form.
- **`C` vs `c$`**: Identical. `C` is the one-key version.
- **`gI` vs `I`**: Rarely needed. `gI` ignores indent and goes to absolute column 1. Use only when editing whitespace-meaningful formats.
- **`gi` (resume last insert)**: not covered here — see [marks-and-jumps] for `gi`, which re-enters Insert at the position where you last left it (`` `^ ``).

## Grammar

`i`, `a`, `I`, `A`, `o`, `O` are **insert commands** (operate as `{insert}{text}<Esc>`). The whole sequence including the typed text is replayable with `.`:

- `cwBar<Esc>` then `.` repeats "change word to Bar" wherever cursor lands
- `oconst x = 1;<Esc>` then `.` adds another `const x = 1;` line

## Examples

```text
Append semicolon to line:    A;<Esc>
Add a new line above:        O    let foo = 1;<Esc>
Replace word:                ciw  bar<Esc>
Start of indented line:      I    return<Esc>
Single char fix:             r    x       (replace one char with x)
One-into-many:               s    hello<Esc>   (delete one char, insert "hello")
Append after word:           ea   <text><Esc>
```

## Pitfalls

- After `<Esc>`, the cursor moves **left by one** from where you stopped. This is intentional (matches Normal mode position), but surprises newcomers.
- `s` and `cc` clear text but keep it in the unnamed register. Repeated paste (`p`) gets your last deletion.
- `o` and `O` add newlines respecting `'autoindent'`/`'smartindent'`/`'cindent'`. Disable to add raw lines (`:set noai`).
- `gI` is hardly ever needed, but worth knowing exists — beats wondering "why does `I` skip whitespace?".
- To open a literal empty line below the current one without inheriting indent, `Go<Esc>` works (or `:set noai` first then `o`).

## See also

- 🎯 Practice: [tier-2-01-insert-entry]
- 📖 Related: [insert-mode-keys], [change], [grammar-of-vim]
- 📚 `:h insert`, `:h a`, `:h o`, `:h gI`
