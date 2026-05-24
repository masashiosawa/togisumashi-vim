---
id: motion-basic
category: motion
status: drill-backed
related_drills:
  - tier-1-01-hjkl
  - tier-1-02-line-edges
related_articles:
  - motion-word
  - motion-screen-scroll
  - count-modifier
help_tags:
  - ":h h"
  - ":h motion.txt"
---

# Basic cursor motions

The atomic unit of Vim navigation: move by one character, jump to line edges. Keep fingers on the home row — never reach for arrow keys.

## Commands

| Key   | Action                                              |
|-------|-----------------------------------------------------|
| `h`   | Left one character                                  |
| `j`   | Down one (logical) line                             |
| `k`   | Up one (logical) line                               |
| `l`   | Right one character                                 |
| `0`   | First column (column 0)                             |
| `^`   | First non-blank character                           |
| `$`   | End of line (last character)                        |
| `g_`  | Last non-blank character                            |
| `gj`  | Down one **screen** line (when wrapped)             |
| `gk`  | Up one screen line (when wrapped)                   |
| `g0`  | First column of screen line                         |
| `g$`  | End of screen line                                  |
| `+`   | First non-blank of next line                        |
| `-`   | First non-blank of previous line                    |
| `_`   | First non-blank of current line; with count `[count]_` jumps to first non-blank of the line `[count]-1` lines below (so `_` is the current line, `2_` the next, `3_` two lines below) |

## Choosing between

- **`0` vs `^`**: `0` jumps to column 0 (literal start, including leading whitespace). `^` jumps to the first non-blank. For indented code, `^` is correct 95% of the time.
- **`$` vs `g_`**: `$` includes trailing whitespace; `g_` lands on the last non-blank. Use `g_` when targeting content, `$` when targeting position.
- **`j`/`k` vs `gj`/`gk`**: `j`/`k` move by **logical** line (skip whole wrapped paragraphs in one bound). `gj`/`gk` move by **screen** line. Use `gj`/`gk` for wrapped prose, `j`/`k` for code.
- **`h` vs `<BS>`**: `<BS>` crosses line breaks; `h` stops at the line start.
- **`_` vs `^`**: Both land on first non-blank, but `_` accepts a count: `[count]_` jumps `[count]-1` lines down (so `_` is current line, `3_` is two lines below). `^` doesn't take a count.

## Grammar

All of the above are **motions**. Compose with operators (`d`, `c`, `y`, `>`) and counts to build edits:

- `5l`  — right 5 columns
- `d$`  — delete to end of line (same as `D`)
- `y0`  — yank to beginning of line
- `c^`  — change to first non-blank

`j` and `k` skip wrapped lines in one bound; `gj` / `gk` step one visual row at a time.

## Examples

```text
|const speed = 0;          →   5l  →   const|speed = 0;
const speed = 0;|          →   ^   →   |const speed = 0;
    return x;              →   ^   →       |return x;
    return x;              →   0   →   |    return x;
```

## Pitfalls

- `j` / `k` on a soft-wrapped paragraph skips an entire logical line; use `gj` / `gk` for visual movement.
- `$` includes the newline column in some `&virtualedit` modes — be aware when composing with `d$` vs `D`.
- `_` is **first non-blank of *current* line**, not previous. Easy to confuse with `^`.

## See also

- 🎯 Practice: [tier-1-01-hjkl], [tier-1-02-line-edges]
- 📖 Related: [motion-word], [motion-screen-scroll], [count-modifier]
- 📚 `:h h`, `:h motion.txt`, `:h left-right-motions`
