---
id: motion-screen-scroll
category: motion
drillable: true
difficulty: beginner
frequency: high
related_drills:
  - tier-1-07-screen-pos
  - tier-1-08-scroll
related_articles:
  - motion-basic
  - motion-line-file
help_tags:
  - ":h H"
  - ":h CTRL-D"
  - ":h zz"
---

# Screen position and scrolling

Move the cursor within the current screen, or scroll the screen with the cursor. Critical for navigation without losing visual context.

## Commands

### Cursor within screen

| Key   | Action                                          |
|-------|-------------------------------------------------|
| `H`   | High — first line visible on screen (first non-blank) |
| `M`   | Middle — middle line on screen                  |
| `L`   | Low — last line visible on screen               |
| `{n}H`| Line `n` from the **top** of the screen (`5H` = 5th line on screen) |
| `{n}L`| Line `n` from the **bottom** of the screen      |

### Scroll screen, cursor stays

| Key      | Action                                         |
|----------|------------------------------------------------|
| `<C-e>`  | Scroll the **window** down one line in the buffer — text appears to move **up** on screen. Cursor stays on its buffer line until pushed off the visible area, then follows |
| `<C-y>`  | Scroll the **window** up one line in the buffer — text appears to move **down** on screen |

### Scroll cursor + screen together

| Key      | Action                                         |
|----------|------------------------------------------------|
| `<C-d>`  | Down half a screen                             |
| `<C-u>`  | Up half a screen                               |
| `<C-f>`  | Down full screen (page)                        |
| `<C-b>`  | Up full screen                                 |

### Reposition cursor in window

| Key   | Action                                              |
|-------|-----------------------------------------------------|
| `zz`  | Redraw with cursor's line in the middle of the window (cursor doesn't move) |
| `zt`  | Redraw with cursor's line at the top (cursor doesn't move; the window slides) |
| `zb`  | Redraw with cursor's line at the bottom (cursor doesn't move; the window slides) |
| `z.`  | Like `zz` but on first non-blank                    |
| `z<CR>` | Like `zt` but on first non-blank                  |
| `z-`  | Like `zb` but on first non-blank                    |

### Horizontal (for `nowrap`)

| Key   | Action                                  |
|-------|-----------------------------------------|
| `zh`  | Pan view to the left by 1 column (reveals text to the left of the view) |
| `zl`  | Pan view to the right by 1 column |
| `zH`  | Same direction as `zh`, by half a window width |
| `zL`  | Same direction as `zl`, by half a window width |

## Choosing between

- **`<C-d>` vs `<C-f>`**: Half-page vs full-page. `<C-d>` keeps half the previous screen visible — better for tracking context. `<C-f>` is faster for skim. Use `<C-d>`/`<C-u>` as the daily default.
- **`H`/`M`/`L` vs `<C-d>`**: `H`/`M`/`L` move within the **current screen** (no scrolling — context fully preserved). `<C-d>` scrolls. Use `H`/`L` for short hops that keep your map intact.
- **`zz` vs `zt` vs `zb`**: All keep the cursor where it is, but adjust the window. `zz` centers (balanced context). `zt` puts cursor at the top — most context **below** (use after a search to see what's coming). `zb` at bottom — most context **above** (use when navigating call chains backward).
- **`<C-e>`/`<C-y>` vs `<C-d>`/`<C-u>`**: `<C-e>` scrolls the window but the cursor stays on its line of text (until pushed off screen). `<C-d>` moves the cursor too. Use `<C-e>` when reading code but not editing.
- **`{n}H` vs `{n}G`**: `{n}H` is "n lines from the top of the **screen**". `{n}G` is "go to line n of the **file**". Different reference points.

## Grammar

Screen and scroll motions are mostly **not** operator-target (you can't `d<C-d>` meaningfully). `H` `M` `L` however are motions:

- `dH`  — delete from cursor up to first line on screen
- `yL`  — yank from cursor down to last line on screen
- `=H`  — auto-indent from cursor to top of screen

## Examples

```text
After a search jump:        n  →  zt   (put match at top, see what follows)
Reading code top-down:      H  →  read  →  L  →  read  →  <C-d>  (advance)
Center current line:        zz
Scroll without moving:      <C-e><C-e>  (drift down 2 lines, cursor follows if pushed)
```

## Pitfalls

- `<C-f>` skips a screen so quickly you can lose your bearings. Stick to `<C-d>` until full-page scrolling feels safe.
- `zz`/`zt`/`zb` don't move the cursor — they only adjust the window. If you confuse them with `H`/`M`/`L`, the screen lurches and nothing happens at the cursor.
- `zh`/`zl` only matter with `:set nowrap`. With wrap on (default), horizontal scrolling does nothing.
- Counts on `H`/`L` count from the **screen edge**, not from cursor — `5H` is "line 5 of the screen", not "5 lines above cursor".
- `<C-d>`/`<C-u>` with a count have a **side effect**: `[count]<C-d>` sets the `'scroll'` option to `[count]` for future `<C-d>`/`<C-u>` invocations in this window. Setting `:set scroll=10` directly is the clean way.
- `'scrolloff'` keeps the cursor away from the top/bottom of the window; if non-zero, **`H` / `L` / `zt` / `zb` are all clamped** by it — `H` lands `scrolloff` rows below the actual top, `zt` can't pin the cursor exactly on row 1, and so on.

## See also

- 🎯 Practice: [tier-1-07-screen-pos], [tier-1-08-scroll]
- 📖 Related: [motion-basic], [motion-line-file]
- 📚 `:h H`, `:h CTRL-D`, `:h zz`, `:h scrolling`
