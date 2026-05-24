---
id: visual-mode
category: composition
status: drill-backed
related_drills:
  - tier-3-01-visual
related_articles:
  - text-objects
  - grammar-of-vim
help_tags:
  - ":h Visual"
  - ":h CTRL-V"
  - ":h gv"
---

# Visual mode — see-and-select editing

Select a range visually, then apply an operator. The "What You See Is What You Operate" alternative to operator-pending mode.

## Commands

### Enter Visual mode

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `v`      | Charwise visual (1-char granularity)                |
| `V`      | Linewise visual (whole lines)                       |
| `<C-v>`  | Blockwise visual (rectangular block)                |
| `gv`     | Reselect the last visual selection                  |

### While in Visual

| Key      | Action                                                  |
|----------|---------------------------------------------------------|
| `o`      | Move to the **diagonal other end** of the selection     |
| `O`      | (Block visual) move to the **other column on the same line** (horizontal corner only) |
| `v`/`V`/`<C-v>` | Switch to another visual mode                    |
| `<Esc>`  | Exit Visual                                             |

### Visual + operator

| Key after selection | Action                                  |
|---------------------|-----------------------------------------|
| `d`                 | Delete selection                        |
| `c`                 | Change (delete + Insert)                |
| `y`                 | Yank                                    |
| `>` `<`             | Indent / dedent                         |
| `=`                 | Re-indent                               |
| `~` `u` `U`         | Toggle / lower / uppercase              |
| `gq`                | Format                                  |
| `r{c}`              | Replace each char in selection with `{c}` |

### Block visual specials

| Key after `<C-v>` | Action                                        |
|-------------------|-----------------------------------------------|
| `I{text}<Esc>`    | Insert `{text}` at the **block's left edge** on each line **that extends into the block** (lines shorter than the block's left column are skipped) |
| `A{text}<Esc>`    | Append `{text}` at the **block's right edge** of each line. For lines shorter than the block's right column, **whitespace padding is inserted** to reach the column. Use `<C-v>$` to make the block extend to each line's actual end (then no padding) |
| `c{text}<Esc>`    | Replace each block line with `{text}`         |
| `<C-a>` `<C-x>`   | Increment / decrement numbers in selection (each row independently) — works in **any Visual mode**, not just block |
| `g<C-a>`          | Add `[count]*N` to each row's number (`[count]` defaults to 1) — turns a column of 0s into 1,2,3,... **Works in any Visual mode** (`v`/`V`/`<C-v>`); listed here because blockwise is the most common use |

## Choosing between

- **`v` vs `V` vs `<C-v>`**: `v` for arbitrary char ranges, `V` for whole lines (most common for code), `<C-v>` for rectangular regions (column edits, table data).
- **Visual + operator vs operator + motion**: Same result. Use **operator + motion** when range is known precisely (`d3w`). Use **Visual** when you want to see and adjust before committing.
- **`v` then `iw` vs `viw`**: Identical. The text-object form (`viw`) is grammatical; the two-step form is explicit. Either is fine.
- **`gv` vs reselect manually**: After exiting Visual and editing, `gv` brings back the last selection. Use when applying multiple operators to the same range.
- **`o` (other end)**: Lets you extend the selection from the opposite side. `vi{`'s selection picks one direction; press `o` to extend the other way.
- **Block `I` vs Normal `I`**: Block-visual `I` inserts at the **start of each selected line**, then exits Insert and propagates the inserted text. Normal `I` inserts on one line only.
- **`v` + text object vs `gn`**: Use text object (`viw`, `vi"`) when you know what to select. Use `gn` to select the next **search match** as a Visual range — pairs beautifully with `.`: `cgn{replacement}<Esc>` then `.` walks and edits each match.

## Examples

```text
Select 3 lines and indent:     Vjj>
Comment 5 lines:               <C-v>jjjj  →  I//<Esc>
Delete trailing whitespace on selected lines:
                               V}  →  :'<,'>s/\s\+$//
Select function body:          vi{   (with cursor inside)
Reselect after edit:           ...  →  gv  →  another op
Toggle case of selection:      V  →  ~
Generate column of numbers:    <C-v> over 10 blank lines  →  g<C-a>
Bracket alignment:             <C-v>  →  navigate  →  $A);<Esc>  (append to all)
```

## Pitfalls

- `<C-v>` may be mapped to clipboard paste in some terminals. Use `<C-q>` as fallback (or remap).
- Block-Visual `I`/`A` only takes effect after `<Esc>`. The change appears suddenly across all lines — looks broken mid-typing.
- `=` over a visual selection re-indents using `'equalprg'` → `'indentexpr'` → built-in C-like indent in that order. It still does something even without `'indentexpr'` (the built-in handles C/Lisp/Vim by default).
- Visual selections respect `'virtualedit'` only when set (`'virtualedit=block'` is common for block edits).
- `gv` is **per-buffer**. Switching buffers loses it. Use marks (`` `< `` `` `> ``) to bookmark the boundaries.

## See also

- 🎯 Practice: [tier-3-01-visual]
- 📖 Related: [text-objects], [grammar-of-vim]
- 📚 `:h Visual`, `:h CTRL-V`, `:h gv`, `:h v_b_I`
