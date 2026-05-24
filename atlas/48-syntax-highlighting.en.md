---
id: syntax-highlighting
category: display
drillable: false
difficulty: intermediate
frequency: low
related_drills: []
related_articles:
  - settings
help_tags:
  - ":h syntax"
  - ":h :syntax"
  - ":h colorscheme"
---

# Syntax highlighting

Color code by language structure: keywords, strings, comments, types. Built-in for 600+ filetypes. The visual half of "Vim is a real editor".

## Commands

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `:syntax on`      | Enable syntax highlighting                          |
| `:syntax off`     | Disable                                             |
| `:syntax enable`  | Like `on` but preserves your `:highlight` settings  |
| `:syntax reset`   | Reset to default highlights                         |
| `:syntax sync fromstart` | Re-scan from file start (fixes drift)        |
| `:colorscheme {name}` | Load colorscheme `{name}`                       |
| `:colors`         | Same as `:colorscheme`                              |
| `:highlight {group} ...` | Modify a highlight group                     |
| `:filetype on`    | Detect and apply filetype                           |
| `:filetype plugin on` | + Load filetype-specific plugins                |
| `:filetype indent on` | + Load filetype-specific indent                 |
| `:set filetype={ft}` | Manually force filetype                         |

### Treesitter (Neovim, core)

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `:Inspect`        | Show highlight groups (syntax + Treesitter) under cursor (0.9+) |
| `:InspectTree`    | Open the Treesitter parse tree for the current buffer (0.9+) |
| `:EditQuery`      | Live editor for Treesitter queries                  |

## Choosing between

- **`:syntax on` vs `:syntax enable`**: `on` overrides your custom highlights with defaults. `enable` preserves your `:highlight` overrides. Use `enable` if you've customized.
- **`:filetype on` vs `:filetype plugin indent on`**: The first only detects. The full form also loads filetype-specific plugins (mappings, abbreviations) and indent rules. Most users want the full form.
- **`:colorscheme` vs editing `:highlight`**: A colorscheme is a curated set. `:highlight` lets you tweak one group at a time. Edit `:highlight` for quick fixes; create a colorscheme file for serious customization.
- **Built-in syntax vs Treesitter (Neovim)**: Built-in uses regex — fast, works everywhere, sometimes brittle. Treesitter uses real parsers — semantic, robust. **The Treesitter runtime has been in Neovim core since 0.5** (`vim.treesitter` API); 0.10 also bundles parsers for `c`, `lua`, `vimscript`, `vimdoc`, `query`, and `markdown`. `:Inspect` (core, 0.9+) shows highlight groups at the cursor; parser/query management for other languages is typically done via the `nvim-treesitter` plugin (`:TSInstall {lang}`).
- **`:set filetype=ft` vs `:setf ft`**: `:set` always applies. `:setf` only sets if not already set — useful in autocommands to avoid double-application.

## Common highlight groups

```
Comment, Constant, String, Number, Boolean,
Identifier, Function, Statement, Keyword, Operator,
Type, Special, Error, Todo,
Normal, NonText, LineNr, CursorLine, StatusLine,
Pmenu (popup menu), Search, IncSearch, MatchParen,
DiffAdd, DiffDelete, DiffChange
```

Modify with: `:highlight Comment guifg=#888 ctermfg=DarkGrey`

## Examples

```text
Enable everything:           :syntax on  →  :filetype plugin indent on
Pick a theme:                :colorscheme habamax   (built-in dark theme)
List installed themes:       :colorscheme <Tab>
Force a filetype:            :set filetype=python   (when extension doesn't match)
Inspect group at cursor:     :echo synIDattr(synID(line('.'),col('.'),1),'name')
Quick brighter comments:     :highlight Comment guifg=#aaa

Color in vimrc:
  syntax enable
  filetype plugin indent on
  colorscheme habamax
  set termguicolors           " 24-bit colors in terminal
```

## Pitfalls

- Terminal colors are limited (8 / 16 / 256). For full color schemes, set `'termguicolors'` and use a terminal that supports true color.
- `'background'` (`light` or `dark`) controls how colorschemes display. Set before `:colorscheme` for predictable results.
- Some colorschemes don't honor `'background'`. Read the docs.
- Syntax can drift in long files (Vim sees only a window). `:syntax sync fromstart` fixes — but slow on huge files.
- Custom `:highlight` settings are lost when re-running `:syntax on`. Use `:syntax enable` or define highlights via `ColorScheme` autocmd.

## See also

- 📖 Related: [settings]
- 📚 `:h syntax`, `:h :colorscheme`, `:h highlight-groups`
