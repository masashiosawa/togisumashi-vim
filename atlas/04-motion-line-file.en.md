---
id: motion-line-file
category: motion
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-1-04-file-jump
related_articles:
  - marks-and-jumps
  - motion-screen-scroll
help_tags:
  - ":h gg"
  - ":h G"
  - ":h N%"
---

# Line and file jumps

Move across the buffer by line number or relative position. The cornerstone of "go to that thing I saw".

## Commands

| Key       | Action                                                  |
|-----------|---------------------------------------------------------|
| `gg`      | First line of file                                      |
| `G`       | Last line of file                                       |
| `{n}G`    | Line `{n}` (e.g., `42G`)                                |
| `{n}gg`   | Same as `{n}G`                                          |
| `:{n}`    | Same as `{n}G` (ex command form)                        |
| `{n}%`    | Jump `{n}` percent of the way through the file          |
| `+`       | First non-blank of next line                            |
| `-`       | First non-blank of previous line                        |
| `{n}_`    | First non-blank `[count]-1` lines below (`_` is current line, `3_` is two lines below) |

## Choosing between

- **`gg`/`G` vs `:1`/`:$`**: Identical effect. `gg`/`G` is faster (no `<CR>`). Use ex form when you're building a range like `:1,42d`.
- **`{n}G` vs `:{n}`**: Same destination. `{n}G` is faster for keyboard flow; `:{n}` is what compiler/linter messages give you to paste.
- **`{n}G` vs `{n}%`**: `{n}G` jumps to literal line `{n}`. `{n}%` jumps to percentage of file (e.g., `50%` is the middle). Use `%` when you don't know line count but want "roughly halfway".
- **`+`/`-` vs `j^`/`k^`**: `+` is exactly `j^` (next line, first non-blank). One keystroke shorter; use when threading through indented code.
- **`{n}G` vs `m{a}` + `'{a}`**: `{n}G` for known line numbers. Marks for "I'll come back here" — you don't need to remember the number.

## Grammar

Line jumps are motions, so they compose with operators:

- `dG`   — delete from cursor to end of file
- `d{n}G` — delete from cursor to line `n`
- `yG`   — yank to end of file
- `ggdG` — delete entire file

## Examples

```text
Open file at line 42:           vim file +42    or    :42 / 42G
Delete lines 10–20:             :10,20d
Yank to end:                    y G
"Roughly middle of huge file":  50%
Jump cursor then return:        G  (then)  ''  back to where you were
```

## Pitfalls

- `gg` and `G` both land on the **first non-blank** by default (because `'startofline'` is on). Use `gg0`/`G0` for column 0, or set `:set nostartofline` to preserve the cursor column on jumps.
- `{n}%` is **percent**, not line number — `100%` is the last line, not line 100. The count must be **1–100**; values outside are rejected. To jump to line 100 use `100G`.
- Plain `G` (no count) goes to the last line. There's no "go to line 0" via motion — `:0` works for ex commands needing a 0 anchor (e.g., `:0r file` reads file **before** line 1).

## See also

- 🎯 Practice: [tier-1-04-file-jump]
- 📖 Related: [marks-and-jumps], [motion-screen-scroll]
- 📚 `:h gg`, `:h G`, `:h N%`, `:h :range`
