---
id: count-modifier
category: meta
drillable: false
difficulty: beginner
frequency: high
related_drills:
  - tier-1-11-count-modifier
related_articles:
  - grammar-of-vim
  - motion-basic
help_tags:
  - ":h count"
---

# Count — the universal multiplier

A leading number multiplies the next command. The fourth pillar of Vim grammar (alongside operator, motion, text object). Mastering count placement turns 10 keystrokes into 3.

## What count modifies

| Context                   | Effect                                            |
|---------------------------|---------------------------------------------------|
| `{n}{motion}`             | Repeat motion `n` times                           |
| `{n}{operator}{motion}`   | Apply operator over `n × motion`                  |
| `{operator}{n}{motion}`   | Same as above — count can go either place         |
| `{n}{insert-cmd}{text}<Esc>` | Insert `text` `n` times                        |
| `{n}.`                    | Repeat last change `n` times                      |
| `{n}@a`                   | Run macro `a` `n` times                           |
| `{n}<C-a>` / `{n}<C-x>`   | Add / subtract `n` from number                    |
| `{n}G`                    | Go to line `n`                                    |
| `{n}gt`                   | Go to tab `n`                                     |
| `{n}|`                    | Go to column `n`                                  |

## Count semantics

- `5j` — move down 5 lines (motion × 5)
- `5dw` — delete 5 words (operator on 5-word range)
- `d5w` — delete 5 words (same, count is on motion)
- `5d w` — **not illegal**: `<Space>` is a right-move motion, so this is `5dl` (delete 5 chars to the right). Probably not what you wanted
- `2d3w` — delete `2 × 3 = 6` words (counts multiply)
- `3iabc<Esc>` — insert `abcabcabc` (count on insert command)
- `5.` — apply last change 5 times

## Choosing between

- **`5dw` vs `d5w`**: Identical. Vim accepts count on either operator or motion. Choose by typing flow.
- **`3iabc<Esc>` vs `iabc<Esc>2.`**: Both produce `abcabcabc`. The count form is one-shot; `.` form lets you adjust. Use count when the repetition is **known up front**.
- **`5G` vs `:5`**: `{n}G` jumps to line `n`, same as `:n`. `{n}G` is faster (no `<CR>`), but ex form is needed inside scripts.
- **`5yy` vs `V4jy`**: `5yy` yanks 5 lines starting current. `V4jy` is visual, more steps but lets you adjust.
- **Count for navigation vs `gg`/`G`**: `{n}G` for known line numbers, `gg`/`G` for ends, `<C-d>`/`<C-u>` for "scroll by half a screen". Don't count when there's a named jump.

## Examples

```text
Delete 3 words:          3dw      or  d3w
Indent 5 lines:          5>>      (>>5j indents only 1 line, then moves down 5)
Yank 10 lines:           10yy
Insert "-" 40 times:     40i-<Esc>      → produces a 40-dash separator
Increment by 5:          5<C-a>
Run macro 100 times:     100@a
Jump to line 250:        250G
Repeat last edit 7 times: 7.

Generate column of 10 numbers:
  10i0<Esc>              → 10 zeros in current spot
  Then visual block + g<C-a> to make 1..10
```

## Pitfalls

- Count multiplication: `2d3w` deletes `6 words`, not `23 words`. Easy to misread if you're typing fast.
- A leading `0` is **not a count** — `0` is the "line start" motion. `01dw` is confusing; use `1dw` or just `dw`.
- Counts on Insert commands repeat the **typed text**, not the act of entering Insert. `3iabc<Esc>` types `abcabcabc`. To enter Insert 3 times… that doesn't really make sense.
- `5dd` deletes 5 lines starting at cursor and **going down**. Typing `dd5` is not a single command: `dd` runs first (delete one line), then `5` starts a fresh count waiting for the next command. Count must precede the operator or motion.
- Counts inside macros are **part of the macro** — `5dw` recorded into a macro will always delete exactly 5 words on replay.

## See also

- 🎯 Practice: [tier-1-11-count-modifier]
- 📖 Related: [grammar-of-vim], [motion-basic]
- 📚 `:h count`, `:h Visual-prefix`
