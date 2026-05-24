---
id: motion-find-char
category: motion
drillable: true
difficulty: intermediate
frequency: high
related_drills:
  - tier-1-06-find-char
related_articles:
  - search-navigation
  - motion-basic
help_tags:
  - ":h f"
  - ":h t"
  - ":h ;"
---

# Find character within line

Jump to a specific character on the **current line**. Fast, line-anchored, and composes with operators.

## Commands

| Key       | Action                                                  |
|-----------|---------------------------------------------------------|
| `f{c}`    | Forward to next `{c}` (lands ON; **inclusive** with operators)   |
| `F{c}`    | Backward to previous `{c}` (lands ON; **exclusive** with operators) |
| `t{c}`    | Forward TILL `{c}` (lands one before; **inclusive** with operators) |
| `T{c}`    | Backward till `{c}` (lands one after; **exclusive** with operators) |
| `;`       | Repeat last `f`/`F`/`t`/`T` in same direction           |
| `,`       | Repeat last `f`/`F`/`t`/`T` in **opposite** direction   |
| `{n}f{c}` | Jump to **n-th** occurrence                             |

## Choosing between

- **`f` vs `t`**: `f{c}` lands **on** `{c}`; `t{c}` lands **before** it. With operators, `f`/`t` (forward) are **inclusive** of the landing char (`df;` deletes through `;`; `dt;` deletes up to but not including `;`). The backward variants `F`/`T` are **exclusive** instead (`dF;` deletes back to but not including `;`).
- **`f` vs `/`**: `f` is single-char, current-line only, no `<CR>` needed. `/` is full pattern, multi-line, requires `<CR>` (or `<C-g>`/`<C-t>` to step). For a visible target on the current line, `f` is always faster.
- **`;` vs `n`**: `;` repeats `f`/`t`, `n` repeats `/`/`?`. They're independent — `;` doesn't repeat your last search.
- **`;` vs `.`**: `;` repeats the find. `.` repeats the last **edit**. Used together: `f.x;.;.` removes every period on the line.
- **`f` for spaces**: `f<Space>` jumps to next space. Often the fastest word-style hop in dense code (faster than `w` when punctuation is involved).

## Grammar

Find motions compose with operators:

- `df,`  — delete to and including next comma
- `ct"`  — change up to next double quote
- `yf)`  — yank from cursor to next `)` inclusive
- `vfx`  — visual select to next `x` inclusive

## Examples

```text
foo, bar, baz    f,     → foo|, bar, baz
foo, bar, baz    2f,    → foo, bar|, baz
foo, bar, baz    df,    → bar, baz
foo, bar, baz    dt,    → , bar, baz
foo, bar, baz    f, ;   → foo, bar|, baz   (`;` repeats forward)
foo|, bar, baz   f, ,   → foo,| bar, baz   (`,` reverses — only meaningful from a later position)
```

## Pitfalls

- Find is **case-sensitive** regardless of `ignorecase` (it's a motion, not a search).
- Find does **not cross line boundaries**. If the target isn't on the current line, find fails silently — use `/` instead.
- `;` and `,` re-use the last find's character — typing `fx` then later `;` jumps to the next `x`, not whatever else you searched for.

## See also

- 🎯 Practice: [tier-1-06-find-char]
- 📖 Related: [search-navigation], [motion-basic]
- 📚 `:h f`, `:h t`, `:h ;`, `:h ,`
