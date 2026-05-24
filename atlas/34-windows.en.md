---
id: windows
category: environment
drillable: false
difficulty: intermediate
frequency: mid
related_drills: []
related_articles:
  - buffers
  - tabs
help_tags:
  - ":h windows"
  - ":h CTRL-W"
  - ":h opening-window"
---

# Windows — split views

A **window** is a viewport into a buffer. Splitting lets you see multiple buffers (or the same buffer at different positions) side by side. The `<C-w>` prefix governs all window operations.

## Commands

### Create

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `:sp [{file}]`    | Horizontal split (current buffer or `{file}`)       |
| `:vsp [{file}]`   | Vertical split                                      |
| `:new`            | Horizontal split with new empty buffer              |
| `:vnew`           | Vertical split with empty buffer                    |
| `<C-w>s`          | Horizontal split (same as `:sp`)                    |
| `<C-w>v`          | Vertical split (same as `:vsp`)                     |
| `<C-w>n`          | New empty horizontal split                          |
| `<C-w>f`          | Open file under cursor in horizontal split          |
| `<C-w>F`          | Open file under cursor (+ line number) in h-split   |
| `<C-w>gf`         | Open file under cursor in a new tab                 |

### Navigate

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `<C-w>h/j/k/l`    | Move to window left / down / up / right             |
| `<C-w>w`          | Cycle to next window                                |
| `<C-w>W`          | Cycle backwards                                     |
| `<C-w>p`          | Previous (last accessed) window                     |
| `<C-w>t`          | Top-left window                                     |
| `<C-w>b`          | Bottom-right window                                 |

### Move / arrange

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `<C-w>H`          | Move current window to far left                     |
| `<C-w>J`          | Move to bottom                                      |
| `<C-w>K`          | Move to top                                         |
| `<C-w>L`          | Move to far right                                   |
| `<C-w>r` / `<C-w>R` | Rotate windows                                    |
| `<C-w>x`          | Exchange with next window                           |

### Resize

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `<C-w>+`          | Increase height                                     |
| `<C-w>-`          | Decrease height                                     |
| `<C-w>>`          | Increase width                                      |
| `<C-w><`          | Decrease width                                      |
| `<C-w>=`          | Equalize all windows                                |
| `<C-w>_`          | Maximize height                                     |
| `<C-w>|`          | Maximize width                                      |
| `{n}<C-w>_`       | Set height to `n` lines                             |
| `:resize {n}`     | Set height                                          |
| `:vertical resize {n}` | Set width                                      |

### Close

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `<C-w>c` or `:close` | Close current window                             |
| `<C-w>o` or `:only` | Close all OTHER windows                          |
| `<C-w>q` or `:quit` | Quit current window                              |

### Operate on every window

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `:windo {cmd}`    | Execute `{cmd}` in every window of the current tab page |

## Choosing between

- **`:sp` vs `:new`**: `:sp` splits showing the same buffer; `:new` creates a new empty buffer in the split. Use `:sp` to see the same file twice; `:new` for a scratchpad.
- **`<C-w>w` vs `<C-w>{hjkl}`**: `w` cycles in window order; `hjkl` navigates spatially. Use directional when you know where; `w` for "just go somewhere else".
- **`<C-w>c` vs `:bd`**: `<C-w>c` closes the **window** but keeps the buffer loaded. `:bd` closes the buffer (and any windows on it). Use `<C-w>c` to declutter, `:bd` to truly remove.
- **`<C-w>=` vs manual resize**: Always start with `<C-w>=` to balance, then fine-tune. Saves many `<C-w>>` keystrokes.
- **Windows vs tabs**: Windows for **comparing/editing in parallel** within one workspace. Tabs for **separate workspaces** (different feature, different layout). Don't use tabs to multiplex files — that's the buffer list's job.

## Examples

```text
Split horizontally:           :sp
Split with file:              :sp other.c
Vertical split with file:     :vsp config.json
Move window to left edge:     <C-w>H
Equalize sizes:               <C-w>=
Close all other windows:      <C-w>o
Vertically resize to 80:      :vertical resize 80
Open file in new split:       <C-w>f       (use <C-w>f or <C-w>F; plain gf opens in current window)
```

## Web environment note

Most web Vim emulations have a single window. Window splits don't apply.

## Pitfalls

- `<C-w>o` (close others) is **refused** when `'hidden'` is off and other windows hold unsaved buffers. Use `:only!` to force (which loses those unsaved changes). Confirm with `:wa` first if you want them saved.
- `<C-w>{HJKL}` moves the window in cardinal direction — easy to confuse with `<C-w>{hjkl}` (which navigates). Lowercase navigates, uppercase moves the window itself.
- Closing the last window with `<C-w>c` quits Vim. Use `<C-w>o` or `:bd` if you want the buffer gone but Vim staying.
- Window-local options (`'wrap'`, `'cursorline'`, etc.) are **inherited** when you `:split` (the new window copies them from the current one). To diverge, set them explicitly in the new window after splitting.
- `<C-w>` itself can be eaten by the terminal in some setups (tmux prefix conflict). Remap if needed.

## See also

- 📖 Related: [buffers], [tabs]
- 📚 `:h windows`, `:h CTRL-W`, `:h opening-window`, `:h window-resize`
