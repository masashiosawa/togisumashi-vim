---
id: grammar-of-vim
category: meta
drillable: false
difficulty: intermediate
frequency: high
related_drills:
  - tier-2-03-delete
  - tier-2-04-change
  - tier-2-05-yank-paste
  - tier-2-06-text-objects
related_articles:
  - text-objects
  - dot-repeat
  - count-modifier
help_tags:
  - ":h operator"
  - ":h text-objects"
  - ":h motion.txt"
---

# The grammar of Vim

Vim is not a list of commands — it is a **language**. Memorize the grammar and you can derive any edit, even ones no tutorial showed you.

## The four parts of speech

```
[count] [operator] [count] {motion | text-object}
   2        d        i          w
```

| Part         | What it is                              | Examples                          |
|--------------|-----------------------------------------|-----------------------------------|
| **Count**    | How many times                          | `3`, `5`, `10`                    |
| **Operator** | What action to take                     | `d` `c` `y` `>` `<` `=` `gu` `gU` |
| **Motion**   | Where to go (start..cursor or cursor..end) | `w` `e` `b` `$` `0` `gg` `G`      |
| **Text object** | A bounded region (no direction)       | `iw` `aw` `i"` `a(` `it`          |

A complete sentence is **operator + motion** or **operator + text object**. Counts modify either or both.

## Choosing between

- **Motion vs text object**: Use **motions** for *from-here-to-there* (e.g., `dw` deletes from cursor to next word start — leading half stays if cursor is mid-word). Use **text objects** for *bounded region regardless of cursor position* (e.g., `daw` deletes the whole word even from the middle).
- **Operator + motion vs Visual + operator**: Result is identical. Choose operator-pending when the target is precise and known (`d3w`). Choose Visual when you want to **see** the selection before committing (`v3wd`).
- **`{op}{op}` doubled vs explicit motion**: `dd` ≡ `d_`, `cc` ≡ `c_`, `yy` ≡ `y_`, `S` ≡ `cc`, `D` ≡ `d$`, `C` ≡ `c$`, `Y` ≡ `yy` (vanilla) or `y$` (Neovim 0.6+). Doubled form is faster for line-wise ops — prefer it.
- **`c{motion}` vs `s` vs `r`**: `c{motion}` deletes and enters insert. `s` ≡ `cl` (substitute one char). `r` replaces one char without entering insert. Use `r` for single-character fixes, `s` for one-char-into-many, `c{motion}` for everything else.

## Composition table

|        | `w` (next word) | `$` (end of line) | `iw` (inner word) | `i"` (inside quotes) |
|--------|-----------------|-------------------|-------------------|-----------------------|
| `d`    | `dw`            | `d$`              | `diw`             | `di"`                 |
| `c`    | `cw`            | `c$`              | `ciw`             | `ci"`                 |
| `y`    | `yw`            | `y$`              | `yiw`             | `yi"`                 |
| `>`    | `>w` (rare)     | `>$` (rare)       | —                 | —                     |
| `gu`   | `guw`           | `gu$`             | `guiw`            | `gui"`                |

Add count: `2dw` (delete 2 words), `d2w` (same — count can sit on operator or motion).

**Note: `cw` ≡ `ce` quirk (conditional).** When the cursor is on a **non-blank**, `cw` and `cW` act like `ce` and `cE` (`:h cw` Special case) — the trailing whitespace stays. On whitespace, `cw` keeps the standard `w` semantics. `dw` is unaffected. To delete the trailing space too, use `caw`.

## Why this matters

- You never have to memorize `daw`, `diw`, `caw`, `ciw` separately — they're all just `{op}{tobj}`.
- New operator (`gu` lowercase) and new text object (`it` HTML tag) immediately combine: `guit` lowercases the contents of an HTML tag without you ever having "learned" it.
- The `.` command replays the **whole sentence** — count, operator, motion, and any insert text included.

## Doubled-letter shortcut

`{op}{op}` means "apply to the whole line":

| Shortcut | Equivalent     |
|----------|----------------|
| `dd`     | `d_` (delete line) |
| `cc`     | `c_` (change line) |
| `yy`     | `y_` (yank line)   |
| `>>`     | `>_` (indent line) |

## Pitfalls

- `Y` is **not** `yy`. Vanilla Vim defines `Y` ≡ `yy` (whole line), but many vimrc remap `Y` to `y$` for consistency with `D` and `C`.
- Counts compound: `2d3w` deletes 6 words (2 × 3), not 23.
- Some "operators" don't fit cleanly — `r` (replace) takes a single character, not a motion. `s` is `cl`.

## See also

- 🎯 Practice: [tier-2-03-delete], [tier-2-04-change], [tier-2-06-text-objects]
- 📖 Related: [text-objects], [dot-repeat], [count-modifier]
- 📚 `:h operator`, `:h text-objects`, `:h motion.txt`
