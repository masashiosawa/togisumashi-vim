---
id: plugins
category: meta
status: concept-only
related_drills: []
related_articles:
  - mappings
  - help-system
help_tags:
  - ":h packages"
  - ":h plugin"
---

# Plugins — extending Vim

Once you know vanilla Vim, plugins multiply your power. This is the gateway from "Vim user" to "Vim user with the workflow that fits you".

## Plugin managers

| Manager     | For        | Style                                        |
|-------------|------------|----------------------------------------------|
| **vim-plug** | Vim/Neovim | Single-file, declarative, install + update   |
| **packer.nvim** | Neovim   | Lua-based, lazy-loading support              |
| **lazy.nvim** | Neovim    | Modern, fast, lazy by default                |
| **dein.vim** | Vim/Neovim | Vim script (TOML config optional), fast      |
| **Native packages** | Vim 8+/Neovim | Built-in; Vim uses `~/.vim/pack/.../start/`, Neovim uses `$XDG_DATA_HOME/nvim/site/pack/.../start/` (typically `~/.local/share/nvim/site/pack/.../start/`) — see `:set packpath?` |

## Essential plugins (universal)

| Plugin                | What it adds                                              |
|-----------------------|-----------------------------------------------------------|
| **vim-surround**      | `cs"'` change surrounding quotes; `ds(` delete surrounding parens; `ysiw)` add |
| **vim-commentary**    | `gcc` toggle line comment; `gcap` toggle paragraph        |
| **vim-repeat**        | Make plugin operations `.`-repeatable                     |
| **targets.vim**       | Better text objects: `dan)` next pair, `dil)` last paren  |
| **vim-easymotion** / **vim-sneak** / **flash.nvim** | Quick jumps with 2-char prefix |
| **vim-fugitive**      | Git from inside Vim                                       |
| **fzf.vim** / **telescope.nvim** | Fuzzy finder for files, buffers, lines     |
| **vim-airline** / **lualine**     | Statusline                                |
| **NERDTree** / **nvim-tree** / **oil.nvim** | File explorer                       |
| **gitsigns.nvim**     | Git-modified line markers                                 |

## LSP and language tooling (Neovim)

| Tool                  | Role                                                |
|-----------------------|-----------------------------------------------------|
| **nvim-lspconfig**    | LSP server configuration                            |
| **nvim-cmp**          | Completion engine                                   |
| **nvim-treesitter**   | Treesitter parsers (syntax + queries)               |
| **none-ls.nvim**      | Connect formatters / linters as LSP (`null-ls` was archived in 2023; `none-ls.nvim` is the active fork) |

## Choosing between

- **vim-plug vs lazy.nvim**: Both work. vim-plug is older, simpler, cross-version. lazy.nvim is modern, faster startup with lazy loading, Neovim-only. New Neovim users default to lazy.nvim; long-time Vim users often stay with vim-plug.
- **vim-commentary vs nvim-comment**: Identical surface API. Use whichever your manager makes easy.
- **NERDTree vs oil.nvim**: NERDTree is a tree sidebar. oil.nvim shows directory as a buffer (edit names to rename!). Different paradigms; pick what fits your mental model.
- **fzf vs telescope**: fzf uses external `fzf` binary, very fast. Telescope is Lua-native, deeply integrated with Neovim APIs. Both fuzzy-find.
- **Treesitter vs built-in syntax**: Treesitter is more accurate (real parser), supports text objects per-language. Built-in is universal and zero-config. Use Treesitter on Neovim for languages with parsers.

## Plugin installation (vim-plug example)

```vim
call plug#begin('~/.vim/plugged')
  Plug 'tpope/vim-surround'
  Plug 'tpope/vim-commentary'
  Plug 'tpope/vim-repeat'
  Plug 'tpope/vim-fugitive'
  Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
  Plug 'junegunn/fzf.vim'
call plug#end()
```

Then in Vim:
```
:PlugInstall    " install
:PlugUpdate     " update
:PlugClean      " remove unused
```

## Choosing your starter set

Minimal but transformative:

```
1. vim-surround       " new operators
2. vim-commentary     " quick comment toggle
3. vim-repeat         " make 1 & 2 dot-repeatable
4. vim-fugitive       " git
5. fzf / telescope    " file finder
```

After that, plugins are personal taste. Add only when you have a specific pain.

## Pitfalls

- More plugins ≠ better. Each adds startup time, conflict potential, and learning load. Audit annually.
- Plugins can override built-in motions or operators silently. Read `:map` to see what's been hijacked.
- Lazy loading helps startup but adds complexity. Don't lazy-load without measuring (`:profile`).
- Plugin docs are usually inside the plugin's repo and `:help {plugin-name}` after install. For native packages, plugins under `pack/*/start/` get their `doc/tags` **auto-generated at startup** (Vim runs `:helptags` on each `doc/` dir during package loading). Plugins added via `:packadd` from `pack/*/opt/` need a manual `:helptags {dir}` if the tags file is missing or stale.
- Many plugins moved Vim → Neovim over the years. Pure-Vim users see deprecation: e.g., `nvim-cmp` is Neovim-only.

## See also

- 📖 Related: [mappings], [help-system]
- 📚 `:h packages`, `:h plugin`
- External: <https://vimawesome.com>
