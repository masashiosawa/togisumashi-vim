---
id: settings
category: config
drillable: false
difficulty: intermediate
frequency: mid
related_drills: []
related_articles:
  - mappings
  - autocommands
help_tags:
  - ":h options"
  - ":h :set"
---

# Settings — `:set` and options

Vim has 350+ options controlling behavior. Master 30 of them and you've configured 95% of what you'll ever change.

## Commands

| Form              | Effect                                              |
|-------------------|-----------------------------------------------------|
| `:set {opt}`      | Enable boolean / show current value                 |
| `:set no{opt}`    | Disable boolean                                     |
| `:set {opt}!`     | Toggle boolean                                      |
| `:set {opt}?`     | Show current value                                  |
| `:set {opt}={val}` | Set string / number                                |
| `:set {opt}+={val}` | Add to a list option                              |
| `:set {opt}-={val}` | Remove from a list option                         |
| `:set {opt}&`     | Reset to default                                    |
| `:setlocal`       | Set option for current buffer/window only           |
| `:setglobal`      | Set the global value                                |
| `:set all`        | Show all options                                    |
| `:set`            | Show only changed options                           |
| `:options`        | Open option browser                                 |

## Essential options (in order of importance)

### Search

```vim
set hlsearch       " highlight all matches
set incsearch      " preview while typing
set ignorecase     " case-insensitive search
set smartcase      " ...unless pattern has uppercase
```

### Indentation

```vim
set expandtab      " tabs as spaces
set tabstop=2      " visual tab width
set shiftwidth=2   " indent step
set softtabstop=2  " what <Tab> inserts in insert mode
set autoindent     " inherit indent from previous line
set smartindent    " language-naive smart indent
```

### Display

```vim
set number         " line numbers
set relativenumber " relative line numbers
set cursorline     " highlight current line
set scrolloff=5    " keep 5 lines around cursor
set sidescrolloff=8
set wrap           " wrap long lines
set list           " show invisible chars
set listchars=tab:▸\ ,trail:·,nbsp:_
```

### File behavior

```vim
set hidden         " allow switching unsaved buffers (default on in Neovim)
set undofile       " persistent undo
set undodir=~/.vim/undo
set autoread       " reload changed files
set updatetime=300 " for CursorHold autocmd
```

### Encoding / format

```vim
set encoding=utf-8       " Vim: locale-dependent default — pin explicitly. Neovim is always UTF-8 (option deprecated)
set fileformats=unix,dos " preferred line endings when writing new files
```

Note: `'fileencoding'` is **buffer-local** — setting it in vimrc only affects the startup buffer. To pick an encoding for new files, use a `BufNewFile` autocmd or set it after opening.

### UI

```vim
set laststatus=2   " always show statusline
set showcmd        " show partial commands
set wildmenu       " enhanced cmdline completion
set wildmode=longest:full,full
set mouse=a        " enable mouse
```

## Choosing between

- **`:set` vs `:setlocal`**: `:set` sets both global and local (where applicable). `:setlocal` only the local. Use `:setlocal` in `autocmd` for per-filetype settings.
- **`expandtab` vs hard tabs**: Most projects use spaces (configured by `'shiftwidth'`). Set `expandtab` and forget. Hard-tabs only in projects like Linux kernel.
- **`number` vs `relativenumber`**: Absolute numbers tell you where you are; relative makes `5j`/`3k` obvious. Combine: `set number relativenumber` shows current as absolute and others as relative.
- **`smartcase` always with `ignorecase`**: `ignorecase` alone makes ALL search case-insensitive. `smartcase` on top makes it case-sensitive whenever pattern has uppercase. The combo is the right default.
- **`updatetime=300` vs default `4000`**: Lower for snappier `CursorHold` events (LSP hover etc.). Don't go below 100 — performance impact.
- **`mouse=a` vs no mouse**: Enable for click-to-position when you want it. Disable for purist setups. Most users keep it on.

## Where to put settings

```
~/.vimrc                    Vim global config
~/.vim/vimrc                Vim alternate config
~/.config/nvim/init.lua     Neovim Lua config
~/.config/nvim/init.vim     Neovim Vim-script config
~/.vim/ftplugin/{ft}.vim    Per-filetype settings (auto-loaded)
~/.vim/after/...            Override default plugin settings
```

## Examples

```text
Toggle line numbers:           :set number!
Show option value:             :set tabstop?
Set tab width to 4:            :set tabstop=4 shiftwidth=4
Add path:                      :set path+=src/**
Reset to default:              :set listchars&
Only for this buffer:          :setlocal wrap

Persistent undo + dir:
  set undofile
  set undodir=~/.vim/undo
```

## Pitfalls

- Setting in `:set` is **session-only**. Put it in `~/.vimrc` for persistence.
- A few legacy options need attention: `'compatible'` exists only in Vim, and **Vim already flips it to `nocompatible` automatically when a user vimrc is loaded** — explicit `set nocompatible` is redundant in most cases but harmless. `set encoding=utf-8` matters for Vim where the default depends on locale; Neovim is UTF-8 internally and the option is effectively deprecated.
- `'number'` and `'relativenumber'` interact — both can be on; without either, no numbers.
- `'shiftwidth=0'` means "fall back to `'tabstop'`". Counter-intuitive.
- Filetype-specific settings should go in `~/.vim/ftplugin/{ft}.vim`, not in `~/.vimrc` (they'd apply globally).

## See also

- 📖 Related: [mappings], [autocommands]
- 📚 `:h options`, `:h :set`, `:h option-summary`
