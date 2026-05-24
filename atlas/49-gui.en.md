---
id: gui
category: display
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - settings
  - syntax-highlighting
help_tags:
  - ":h gui"
  - ":h gvim"
---

# GUI Vim / external Neovim GUIs

Two distinct categories: **(1) Vim's own GUI builds** (gvim/MacVim) where the GUI is part of the editor binary; **(2) Neovim has no built-in GUI** — instead, external clients (Neovide, Goneovim, firenvim) attach to a `nvim --embed` process over Neovim's UI protocol. Same engine, different architecture.

## Variants

| Variant     | Platform                                              |
|-------------|-------------------------------------------------------|
| **gvim**    | Vim with GUI — Linux/Windows (and macOS as a separate build) |
| **MacVim**  | macOS-native Vim with Cocoa UI                        |
| **Neovide** | Modern Neovim GUI (Rust, smooth cursor, ligatures)    |
| **Goneovim** | Qt-based Neovim GUI                                  |
| **firenvim** | Neovim in browser textarea                          |

## Commands

| Command             | Action                                              |
|---------------------|-----------------------------------------------------|
| `:gui`              | Start GUI from terminal Vim (**Vim only**; Neovim has no `:gui`) |
| `:set guifont=...`  | Set GUI font                                        |
| `:set guifont=*`    | Open font picker dialog (some GUIs)                 |
| `:set guioptions+=m` | Show menu bar (add: `m`)                           |
| `:set guioptions-=T` | Hide toolbar (remove: `T`)                         |
| `:menu`             | List menu definitions                               |
| `:menu ToolBar`     | List toolbar menu items                             |

## `'guioptions'` flags

| Flag | Meaning                                              |
|------|------------------------------------------------------|
| `m`  | Menu bar                                             |
| `T`  | Toolbar                                              |
| `r`  | Right scrollbar always                               |
| `R`  | Right scrollbar when split                           |
| `l`  | Left scrollbar always                                |
| `L`  | Left scrollbar when split                            |
| `b`  | Bottom scrollbar                                     |
| `a`  | Visual selection auto-yanks to system clipboard      |
| `c`  | Use console dialogs (text) instead of GUI popups     |
| `e`  | GUI tab pages                                        |

## Choosing between

- **Terminal Vim vs GUI Vim**: Terminal works everywhere, integrates with shell. GUI gives crisp fonts, ligature support, native dialogs. Most heavy users mix — GUI at desk, terminal over SSH.
- **gvim vs MacVim**: MacVim is macOS-native (better integration, retina). gvim is cross-platform (single config across OSes). On macOS, MacVim wins for daily use.
- **Vim GUI vs Neovim GUI**: Neovim has a stricter UI protocol — multiple GUIs (Neovide, Goneovim, etc.) can attach to one Neovim. Vim's GUI is monolithic.
- **`guifont` syntax**: Platform-dependent. macOS: `Monaco:h12`. Linux: `Monospace\ 12` (escape spaces). Windows: `Consolas:h11:cANSI`. Get it right for your platform.

## Examples

```text
Hide toolbar:                  :set guioptions-=T
Hide all scrollbars:           :set guioptions-=rRlLb
Auto-copy visual:              :set guioptions+=a
Set font:                      :set guifont=JetBrains\ Mono:h13
List fonts (Linux with fontconfig): fc-list | grep -i mono
List fonts (macOS):            system_profiler SPFontsDataType | grep -i mono

vimrc:
  if has('gui_running')
    set guifont=JetBrains\ Mono:h13
    set guioptions-=T
    set guioptions-=r
    colorscheme habamax
  endif
```

## Web environment note

Web Vim emulations are themselves the "GUI" — running in the browser. This article applies to standalone GUI Vim distributions only.

## Pitfalls

- `guifont` spaces must be escaped with `\`: `set guifont=Source\ Code\ Pro:h12`.
- Some GUI options (`a` for auto-yank to clipboard) clash with Vim's register model — disable them.
- gvim with `-f` (or `--nofork`) runs in foreground (useful for git commit messages, etc.). Neovim GUIs use their own flags (e.g. Neovide's `--no-fork`).
- Many GUIs read additional config files: `~/.gvimrc` (gvim), `~/.config/nvim/ginit.vim` (Neovide). Don't put GUI options in `~/.vimrc` — they error in terminal Vim.
- Ligature support varies and requires both **GUI support** and a **ligature-enabled font** (Fira Code, JetBrains Mono, etc.): Neovide draws ligatures from whatever font `guifont` selects; **MacVim has explicit `:set macligatures`** (off by default); gvim depends on build; terminal Vim depends on the host terminal emulator.

## See also

- 📖 Related: [settings], [syntax-highlighting]
- 📚 `:h gui`, `:h gvim`, `:h 'guifont'`, `:h 'guioptions'`
