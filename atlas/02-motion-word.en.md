---
id: motion-word
category: motion
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-1-03-word-motion
related_articles:
  - motion-basic
  - text-objects
  - grammar-of-vim
help_tags:
  - ":h word-motions"
  - ":h word"
  - ":h WORD"
---

# Word motions

Jump by word at a time. Vim defines two flavors: **word** (letters/digits/underscore, broken by punctuation) and **WORD** (anything non-whitespace).

## Commands

| Key   | Action                                                |
|-------|-------------------------------------------------------|
| `w`   | Next **word** start                                   |
| `W`   | Next **WORD** start                                   |
| `e`   | Forward to **word** end                               |
| `E`   | Forward to **WORD** end                               |
| `b`   | Previous **word** start (back)                        |
| `B`   | Previous **WORD** start                               |
| `ge`  | Backward to **word** end (previous word's end)        |
| `gE`  | Backward to **WORD** end                              |

## Choosing between

- **`w` vs `W`**: `w` stops at punctuation (`foo.bar.baz` is 5 words). `W` only stops at whitespace (`foo.bar.baz` is 1 WORD). Use `W` for paths, URLs, identifiers with dots.
- **`w` vs `e`**: `w` lands on the **start** of the next word; `e` lands on the **end** of the current/next word. With operators, `e` often feels more natural (`ce` changes to the end of the word, leaving punctuation intact).
- **`b` vs `ge`**: `b` goes backward to previous **word start**; `ge` goes backward to previous **word end**. Use `ge` when fixing the end of the word behind you.
- **`dw` vs `daw` vs `diw`**: `dw` deletes from cursor to next word start (mid-word leaves the leading half). `daw` deletes the whole word **plus** an adjacent space. `diw` deletes only the word, leaving spaces.
- **`cw` quirk (conditional)**: when the cursor is on a **non-blank**, `cw` behaves like `ce` (the trailing space stays). On whitespace, `cw` keeps standard `w` semantics. To replace word + space, use `caw`.

## Grammar

Word motions compose with all operators:

- `dw` `cw` `yw` — common idiom for "edit until next word"
- `2w` `3W` — count multiplies
- `vw` — visual select to next word start

## Examples

```text
foo.|bar.baz       w  → foo.bar|.baz       (next word: bar)
foo.|bar.baz       W  → foo.bar.baz|       (W stops only at whitespace)
foo bar |baz       e  → foo bar baz|
foo bar |baz       b  → foo |bar baz
foo bar |baz       ge → foo bar| baz
foo bar | baz      dw → foo bar |baz       (cursor on whitespace: dw eats whitespace)
foo bar | baz      daw→ foo bar|           (deletes the next word + adjacent space)
```

## Pitfalls

- `cw` ≠ `dw` + `i`. When the cursor is on a non-blank, `cw` is treated as `ce` (trailing space stays); on whitespace it follows `w`. If you need the space gone, use `caw`.
- `w` on the last word of a line wraps to the next line's first word. Use `e` if you want to stop at line end before crossing.
- Capital variants ignore punctuation entirely — useful, but `W` can skip far when lines have heavy punctuation.

## See also

- 🎯 Practice: [tier-1-03-word-motion]
- 📖 Related: [motion-basic], [text-objects], [grammar-of-vim]
- 📚 `:h word-motions`, `:h word`, `:h WORD`
